import * as Mousetrap from "mousetrap";
import SockJSClient from "sockjs-client";
import { computeVirtJSObject, isPaperclipFile } from "paperclip-utils";
import * as Url from "url";
import { fork, put, take, takeEvery, select, call } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import {
  ActionType,
  ErrorBannerClicked,
  engineErrored,
  globalEscapeKeyPressed,
  globalBackspaceKeyPressed,
  globalMetaKeyDown,
  globalZKeyDown,
  globalYKeyDown,
  globalMetaKeyUp,
  Action,
  engineDelegateChanged,
  fileOpened,
  currentFileInitialized,
  pcVirtObjectEdited,
  CanvasMouseUp,
  pasted,
  globalBackspaceKeySent,
  globalSaveKeyPress,
  globalHKeyDown,
  locationChanged,
  LocationChanged,
  clientConnected
} from "../actions";
import { Renderer } from "paperclip-web-renderer";
import { AppState, getNodeInfoAtPoint, getSelectedFrames } from "../state";
import { getVirtTarget } from "paperclip-utils";
import { handleCanvas } from "./canvas";
import { PCMutationActionKind } from "paperclip-source-writer/lib/mutations";
import { utimes } from "fs";

declare const vscode;
declare const TARGET_URI;
declare const PROTOCOL;

export default function* mainSaga() {
  console.log("OKOKOKO");
  yield fork(handleRenderer);
  yield takeEvery(ActionType.CANVAS_MOUSE_UP, handleCanvasMouseUp);
  yield takeEvery(ActionType.ERROR_BANNER_CLICKED, handleErrorBannerClicked);
  yield fork(handleKeyCommands);
  yield fork(handleDocumentEvents);
  yield fork(handleCanvas);
  yield fork(handleClipboard);
  yield fork(handleInit);
}

const parent = typeof vscode != "undefined" ? vscode : window;

const getTargetUrl = () => {
  if (typeof TARGET_URI !== "undefined") {
    return TARGET_URI;
  }

  const parts = Url.parse(location.href, true);
  return parts.query.open;
};

function handleSock(onMessage, onClient) {
  if (!/^http/.test(location.protocol)) {
    return;
  }
  const client = new SockJSClient(
    location.protocol + "//" + location.host + "/rt"
  );

  client.onopen = () => {
    // const url = getTargetUrl();
    // if (url) {
    //   // client.send(JSON.stringify({ type: "OPEN", uri: url }));
    // }

    onClient({
      send: message => client.send(JSON.stringify(message))
    });
  };

  client.onmessage = message => {
    onMessage(JSON.parse(message.data));
  };

  return () => {
    client.close();
  };
}

function* handleRenderer() {
  let _client: any;

  const chan = eventChannel(emit => {
    const onMessage = ({ type, payload }) => {
      switch (type) {
        case "ENGINE_EVENT": {
          const engineEvent = payload;
          if (engineEvent.kind === "Error") {
            return emit(engineErrored(engineEvent));
          }

          emit(engineDelegateChanged(engineEvent));
          break;
        }
        case "INIT": {
          emit(currentFileInitialized(payload));
          break;
        }
        case "ERROR": {
          emit(engineErrored(payload));
          break;
        }

        // handle as regular action
        default: {
          emit({ type, payload });
          break;
        }
      }
    };

    handleSock(onMessage, client => {
      _client = client;
      emit(clientConnected(null));
    });
    return () => {};
  });

  const maybeSendMessage = message => {
    _client && _client.send(message);
  };

  yield fork(function*() {
    while (1) {
      const action = yield take(chan);
      yield put(action);
    }
  });
  yield takeEvery(["FOCUS"], function() {
    window.focus();
  });

  yield takeEvery(
    [
      ActionType.LOCATION_CHANGED,
      ActionType.CLIENT_CONNECTED,
      ActionType.FS_ITEM_CLICKED
    ],
    function*(action: LocationChanged) {
      const state: AppState = yield select();
      console.log(state.currentFileUri);
      maybeSendMessage(fileOpened({ uri: state.currentFileUri }));
    }
  );

  yield takeEvery(
    [
      ActionType.RESIZER_STOPPED_MOVING,
      ActionType.RESIZER_PATH_MOUSE_STOPPED_MOVING,
      ActionType.FRAME_TITLE_CHANGED,
      ActionType.GLOBAL_H_KEY_DOWN
    ],
    function*(action: Action) {
      const state: AppState = yield select();
      maybeSendMessage(
        pcVirtObjectEdited({
          mutations: getSelectedFrames(state).map(frame => {
            return {
              exprSource: frame.source,
              action: {
                kind: PCMutationActionKind.ANNOTATIONS_CHANGED,
                annotationsSource: frame.annotations.source,
                annotations: computeVirtJSObject(frame.annotations)
              }
            };
          })
        })
      );
    }
  );

  yield takeEvery([ActionType.GLOBAL_BACKSPACE_KEY_PRESSED], function*() {
    const state: AppState = yield select();
    maybeSendMessage(
      pcVirtObjectEdited({
        mutations: getSelectedFrames(state).map(frame => {
          return {
            exprSource: frame.source,
            action: {
              kind: PCMutationActionKind.EXPRESSION_DELETED
            }
          };
        })
      })
    );

    yield put(globalBackspaceKeySent(null));
  });

  yield takeEvery(
    [
      ActionType.META_CLICKED,
      ActionType.GLOBAL_Z_KEY_DOWN,
      ActionType.GLOBAL_Y_KEY_DOWN,
      ActionType.GLOBAL_SAVE_KEY_DOWN,
      ActionType.PASTED,
      ActionType.FS_ITEM_CLICKED
    ],
    function(action: Action) {
      maybeSendMessage(action);
    }
  );
}

function* handleCanvasMouseUp(action: CanvasMouseUp) {
  if (!action.payload.metaKey) {
    return;
  }

  const state: AppState = yield select();

  const nodeInfo = getNodeInfoAtPoint(
    state.canvas.mousePosition,
    state.canvas.transform,
    state.boxes,
    state.expandedFrameInfo?.frameIndex
  );

  // maybe offscreen
  if (!nodeInfo) {
    return;
  }

  const nodePathParts = nodeInfo.nodePath.split(".").map(Number);

  const virtualNode = getVirtTarget(
    state.allLoadedPCFileData[state.currentFileUri].preview,
    nodePathParts
  );

  parent.postMessage(
    {
      type: "metaElementClicked",
      source: virtualNode.source
    },
    location.origin
  );
}

function handleErrorBannerClicked({ payload: error }: ErrorBannerClicked) {
  parent.postMessage(
    {
      type: "errorBannerClicked",
      error
    },
    location.origin
  );
}

function* handleKeyCommands() {
  const chan = eventChannel(emit => {
    Mousetrap.bind("esc", () => {
      emit(globalEscapeKeyPressed(null));
    });
    Mousetrap.bind("meta", () => {
      emit(globalMetaKeyDown(null));
    });
    Mousetrap.bind("meta+z", () => {
      emit(globalZKeyDown(null));
    });
    Mousetrap.bind("meta+y", () => {
      emit(globalYKeyDown(null));
    });
    Mousetrap.bind("meta+h", () => {
      emit(globalHKeyDown(null));
    });
    Mousetrap.bind("meta+s", () => {
      emit(globalSaveKeyPress(null));
    });
    Mousetrap.bind("meta+shift+z", () => {
      emit(globalYKeyDown(null));
    });
    Mousetrap.bind("backspace", () => {
      emit(globalBackspaceKeyPressed(null));
    });
    Mousetrap.bind(
      "meta",
      () => {
        emit(globalMetaKeyUp(null));
      },
      "keyup"
    );

    // eslint-disable-next-line
    return () => {};
  });

  while (1) {
    yield put(yield take(chan));
  }
}

function* handleClipboard() {
  yield fork(handleCopy);
  yield fork(handlePaste);
}
function* handleCopy() {
  const ev = eventChannel(emit => {
    window.document.addEventListener("copy", emit);
    return () => {
      window.document.removeEventListener("copy", emit);
    };
  });

  yield takeEvery(ev, function*(event: ClipboardEvent) {
    const state: AppState = yield select();
    const frames = getSelectedFrames(state);

    if (!frames.length) {
      return;
    }

    const buffer = ["\n"];

    for (const frame of frames) {
      if (!state.documentContent[frame.source.uri]) {
        console.warn(`document content doesn't exist`);
        return;
      }

      const start =
        frame.annotations?.source.location.start || frame.source.location.start;
      const end = frame.source.location.end;

      buffer.push(
        state.documentContent[frame.source.uri].slice(start, end),
        "\n"
      );
    }

    event.clipboardData.setData("text/plain", buffer.join("\n"));
    event.preventDefault();
  });
}

function* handlePaste() {
  const ev = eventChannel(emit => {
    window.document.addEventListener("paste", emit);
    return () => {
      window.document.removeEventListener("paste", emit);
    };
  });

  yield takeEvery(ev, function*(event: ClipboardEvent) {
    const content = event.clipboardData.getData("text/plain");
    event.preventDefault();
    if (content) {
      yield put(
        pasted({
          clipboardData: [
            {
              type: "text/plain",
              content
            }
          ]
        })
      );
    }
  });
}

function* handleDocumentEvents() {
  yield fork(function*() {
    const chan = eventChannel(emit => {
      document.addEventListener("wheel", emit, { passive: false });
      document.addEventListener("keydown", emit);
      return () => {
        document.removeEventListener("wheel", emit);
        document.removeEventListener("keydown", emit);
      };
    });

    yield takeEvery(chan, (event: any) => {
      if (event.type === "wheel") {
        event.preventDefault();
      }

      if (
        event.type === "keydown" &&
        (event.key === "=" || event.key === "-") &&
        event.metaKey
      ) {
        event.preventDefault();
      }
    });
  });
}

function* handleInit() {
  const parts = Url.parse(location.href, true);
  yield put(
    locationChanged({
      protocol: parts.protocol,
      host: parts.host,
      pathname: parts.pathname,
      query: parts.query
    })
  );
}
