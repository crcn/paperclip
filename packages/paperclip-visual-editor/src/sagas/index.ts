import * as Mousetrap from "mousetrap";
import SockJSClient from "sockjs-client";
import { computeVirtJSObject, isPaperclipFile } from "paperclip-utils";
import * as Url from "url";
import { fork, put, take, takeEvery, select, call } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import {
  ActionType,
  CanvasElementClicked,
  ErrorBannerClicked,
  engineErrored,
  globalEscapeKeyPressed,
  globalMetaKeyDown,
  globalMetaKeyUp,
  Action,
  engineDelegateChanged,
  fileOpened,
  currentFileInitialized,
  pcVirtObjectEdited
} from "../actions";
import { Renderer } from "paperclip-web-renderer";
import { AppState, getSelectedFrame } from "../state";
import { getVirtTarget } from "paperclip-utils";
import { handleCanvas } from "./canvas";
import { PCMutationActionKind } from "paperclip-source-writer";

declare const vscode;
declare const TARGET_URI;
declare const PROTOCOL;

export default function* mainSaga() {
  yield fork(handleRenderer);
  yield takeEvery(
    ActionType.CANVAS_ELEMENT_CLICKED,
    handleCanvasElementClicked
  );
  yield takeEvery(ActionType.ERROR_BANNER_CLICKED, handleErrorBannerClicked);
  yield fork(handleKeyCommands);
  yield put(fileOpened({ uri: getTargetUrl() }));
  yield fork(handleCanvas);
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
    const url = getTargetUrl();
    if (url) {
      client.send(JSON.stringify({ type: "OPEN", uri: url }));
    }

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

function handleIPC(onMessage) {
  window.onmessage = ({ data: { type, payload } }: MessageEvent) => {
    if (!type || !payload) {
      return;
    }

    onMessage({
      type,
      payload: JSON.parse(payload)
    });
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

    handleIPC(onMessage);
    handleSock(onMessage, client => {
      _client = client;
    });
    return () => {
      window.onmessage = undefined;
    };
  });

  const sendMessage = message =>
    _client ? _client.send(message) : parent.postMessage(message);

  yield fork(function*() {
    while (1) {
      const action = yield take(chan);
      yield put(action);
    }
  });

  yield takeEvery([ActionType.FS_ITEM_CLICKED], function*(action: Action) {
    if (
      action.type === ActionType.FS_ITEM_CLICKED &&
      isPaperclipFile(action.payload.url)
    ) {
      // renderer.reset(action.payload.url);
      yield put(fileOpened({ uri: getTargetUrl() }));
    }
    sendMessage(action);
  });

  yield takeEvery(
    [
      ActionType.RESIZER_STOPPED_MOVING,
      ActionType.RESIZER_PATH_MOUSE_STOPPED_MOVING
    ],
    function*(action: Action) {
      const state: AppState = yield select();

      sendMessage(
        pcVirtObjectEdited({
          mutation: {
            nodeSource: getSelectedFrame(state).source,
            action: {
              kind: PCMutationActionKind.ANNOTATIONS_CHANGED,
              annotationsSource: getSelectedFrame(state).annotations.source,
              annotations: computeVirtJSObject(
                getSelectedFrame(state).annotations
              )
            }
          }
        })
      );
    }
  );

  yield takeEvery([ActionType.META_CLICKED], function(action: Action) {
    sendMessage(action);
  });

  sendMessage({
    type: "ready"
  });
}

const handleInteractionsForRenderer = (renderer: Renderer) =>
  function*() {
    function* syncScrollbarVisibilityState() {
      const state: AppState = yield select();
      renderer.hideScrollbars = state.toolsLayerEnabled;
    }

    yield call(syncScrollbarVisibilityState);
    yield takeEvery(
      ActionType.PAINT_BUTTON_CLICKED,
      syncScrollbarVisibilityState
    );
  };

function* handleCanvasElementClicked(action: CanvasElementClicked) {
  if (!action.payload.metaKey) {
    return;
  }

  const state: AppState = yield select();

  const nodePathParts = action.payload.nodePath.split(".").map(Number);
  console.log(state.allLoadedPCFileData[state.currentFileUri], nodePathParts);
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
