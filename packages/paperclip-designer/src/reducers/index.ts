import {
  AppState,
  mergeBoxesFromClientRects,
  centerTransformZoom,
  IS_WINDOWS,
  Canvas,
  Box,
  getFSItem,
  Directory,
  maybeCenterCanvas,
  getNodeInfoAtPoint,
  getSelectedFrames,
  getFrameFromIndex,
  mergeBoxes,
  getActiveFrameIndex,
  isExpanded,
  getPreviewChildren,
  getCurrentPreviewFrameBoxes
} from "../state";
import { produce } from "immer";
import {
  Action,
  ActionType,
  ExternalActionType,
  LocationChanged,
  RedirectRequested,
  ServerActionType
} from "../actions";
import { clamp } from "lodash";
import {
  updateAllLoadedData,
  VirtualFrame,
  toVirtJsValue,
  computeVirtJSObject,
  VirtJsObjectKind,
  NodeAnnotations,
  isPaperclipFile,
  EngineDelegateEventKind
} from "paperclip-utils";
import * as path from "path";

const ZOOM_SENSITIVITY = IS_WINDOWS ? 2500 : 250;
const PAN_X_SENSITIVITY = IS_WINDOWS ? 0.05 : 1;
const PAN_Y_SENSITIVITY = IS_WINDOWS ? 0.05 : 1;
const MIN_ZOOM = 0.01;
const MAX_ZOOM = 6400 / 100;

export default (state: AppState, action: Action) => {
  switch (action.type) {
    case ActionType.FRAME_TITLE_CLICKED: {
      return selectNode(
        String(action.payload.frameIndex),
        action.payload.shiftKey,
        state
      );
    }
    case ActionType.BIRDSEYE_FILTER_CHANGED: {
      return produce(state, newState => {
        newState.designer.birdseyeFilter = action.payload.value;
      });
    }
    case ServerActionType.INIT_PARAM_DEFINED: {
      return produce(state, newState => {
        newState.designer.readonly = action.payload.readonly;
        newState.designer.availableBrowsers = action.payload.availableBrowsers;
      });
    }
    case ServerActionType.BROWSERSTACK_BROWSERS_LOADED: {
      return produce(state, newState => {
        newState.designer.availableBrowsers = action.payload;
      });
    }
    case ActionType.LOCATION_CHANGED: {
      if (!state.designer.syncLocationWithUI) {
        return state;
      }
      return handleLocationChange(state, action);
    }
    case ActionType.REDIRECT_REQUESTED: {
      return handleLocationChange(state, action);
    }
    case ActionType.GET_ALL_SCREENS_REQUESTED: {
      return produce(state, newState => {
        newState.designer.showBirdseye = true;
        newState.designer.loadingBirdseye = true;
      });
    }
    case ActionType.RENDERER_MOUNTED: {
      return produce(state, newState => {
        newState.designer.mountedRendererIds.push(action.payload.id);
      });
    }
    case ActionType.RENDERER_UNMOUNTED: {
      return produce(state, newState => {
        newState.designer.mountedRendererIds.splice(
          newState.designer.mountedRendererIds.indexOf(action.payload.id),
          1
        );
        newState.designer.currentEngineEvents[action.payload.id] = undefined;
      });
    }
    case ActionType.ENGINE_DELEGATE_CHANGED: {
      state = produce(state, newState => {
        // if centered initially but there were no frames, then the canvas never really centered
        // so flag it do so now.
        if (
          state.designer.centeredInitial &&
          getCurrentPreviewFrameBoxes(state).length === 0
        ) {
          newState.designer.centeredInitial = false;
        }

        if (action.payload.kind === EngineDelegateEventKind.Error) {
          newState.designer.currentError = action.payload;
        } else {
          newState.designer.currentError = undefined;
        }

        for (const id of newState.designer.mountedRendererIds) {
          if (!newState.designer.currentEngineEvents[id]) {
            newState.designer.currentEngineEvents[id] = [];
          }
          newState.designer.currentEngineEvents[id].push(action.payload);
        }
        newState.designer.allLoadedPCFileData = updateAllLoadedData(
          newState.designer.allLoadedPCFileData,
          action.payload
        );
      });

      state = maybeCenterCanvas(state);

      return state;
    }
    // case ActionType.EXPAND_FRAME_BUTTON_CLICKED: {
    //   return produce(state, newState => {
    //     newState.designer.expandedFrameInfo = {
    //       frameIndex: action.payload.frameIndex,
    //       previousCanvasTransform: state.canvas.transform
    //     };

    //     const frame = getFrameFromIndex(action.payload.frameIndex, state);
    //     const frameBounds = getFrameBounds(frame);

    //     newState.designer.canvas.transform.x = -frameBounds.x;
    //     newState.designer.canvas.transform.y = -frameBounds.y;
    //     newState.designer.canvas.transform.z = 1;
    //   });
    // }
    case ActionType.COLLAPSE_FRAME_BUTTON_CLICKED: {
      return minimizeWindow(state);
    }
    case ActionType.PC_FILE_OPENED: {
      state = produce(state, newState => {
        newState.designer.allLoadedPCFileData[
          state.designer.ui.query.currentFileUri
        ] = action.payload;
      });
      state = maybeCenterCanvas(state);
      return state;
    }
    case ActionType.ENGINE_DELEGATE_EVENTS_HANDLED: {
      return produce(state, newState => {
        newState.designer.currentEngineEvents[action.payload.id].splice(
          0,
          action.payload.count
        );
      });
    }
    case ActionType.FS_ITEM_CLICKED: {
      state = produce(state, newState => {
        if (isPaperclipFile(action.payload.url)) {
          newState.designer.centeredInitial = false;
        }
      });
      return state;
    }
    case ActionType.RECTS_CAPTURED: {
      return produce(state, newState => {
        newState.designer.boxes = mergeBoxesFromClientRects(
          newState.designer.boxes,
          action.payload
        );
      });
    }
    case ActionType.ENGINE_ERRORED: {
      return produce(state, newState => {
        newState.designer.currentError = action.payload;
      });
    }
    case ActionType.ERROR_BANNER_CLICKED: {
      return produce(state, newState => {
        newState.designer.currentError = null;
      });
    }
    case ActionType.GLOBAL_BACKSPACE_KEY_SENT:
    case ActionType.GLOBAL_ESCAPE_KEY_PRESSED: {
      // Don't do this until deselecting can be handled properly
      return produce(state, newState => {
        newState.designer.selectedNodePaths = [];
        newState.designer.showBirdseye = false;
      });
    }
    case ActionType.GLOBAL_META_KEY_DOWN: {
      // TODO
      return produce(state, newState => {
        newState.designer.metaKeyDown = true;
      });
    }
    case ActionType.GLOBAL_META_KEY_UP: {
      // TODO
      return produce(state, newState => {
        newState.designer.metaKeyDown = false;
      });
    }
    case ActionType.GLOBAL_OPTION_KEY_DOWN: {
      // TODO
      return produce(state, newState => {
        newState.designer.optionKeyDown = true;
      });
    }
    case ActionType.GLOBAL_OPTION_KEY_UP: {
      // TODO
      return produce(state, newState => {
        newState.designer.optionKeyDown = false;
      });
    }
    case ActionType.CANVAS_MOUSE_UP: {
      if (state.designer.resizerMoving) {
        return state;
      }
      // Don't do this until deselecting can be handled properly
      const nodePath = getNodeInfoAtPoint(
        state.designer.canvas.mousePosition,
        state.designer.canvas.transform,
        state.designer.boxes,
        isExpanded(state) ? getActiveFrameIndex(state) : null
      )?.nodePath;
      return selectNode(nodePath, action.payload.shiftKey, state);
    }
    case ExternalActionType.CONTENT_CHANGED: {
      return produce(state, newState => {
        newState.shared.documents[action.payload.fileUri] =
          action.payload.content;
      });
    }
    case ActionType.ZOOM_INPUT_CHANGED: {
      return produce(state, newState => {
        newState.designer.canvas = setCanvasZoom(
          action.payload.value / 100,
          state.designer.canvas,
          newState.designer.boxes,
          true
        );
      });
    }
    case ActionType.ZOOM_IN_KEY_PRESSED:
    case ActionType.ZOOM_IN_BUTTON_CLICKED: {
      return produce(state, newState => {
        newState.designer.canvas = setCanvasZoom(
          normalizeZoom(state.designer.canvas.transform.z) * 2,
          state.designer.canvas,
          newState.designer.boxes
        );
      });
    }
    case ActionType.ZOOM_OUT_KEY_PRESSED:
    case ActionType.ZOOM_OUT_BUTTON_CLICKED: {
      return produce(state, newState => {
        newState.designer.canvas = setCanvasZoom(
          normalizeZoom(state.designer.canvas.transform.z) / 2,
          state.designer.canvas,
          newState.designer.boxes
        );
      });
    }
    case ActionType.CANVAS_PAN_START: {
      return produce(state, newState => {
        newState.designer.canvas.panning = true;
      });
    }
    case ActionType.CANVAS_PAN_END: {
      return produce(state, newState => {
        newState.designer.canvas.panning = false;
      });
    }
    case ActionType.RESIZER_STOPPED_MOVING:
    case ActionType.RESIZER_PATH_MOUSE_STOPPED_MOVING: {
      return produce(state, newState => {
        newState.designer.resizerMoving = false;
      });
    }
    case ActionType.BIRDSEYE_TOP_FILTER_BLURRED:
    case ActionType.GRID_BUTTON_CLICKED:
    case ActionType.GRID_HOTKEY_PRESSED: {
      return produce(state, newState => {
        newState.designer.showBirdseye = !newState.designer.showBirdseye;
        if (
          newState.designer.showBirdseye &&
          !newState.designer.loadedBirdseyeInitially
        ) {
          newState.designer.loadingBirdseye = true;
        }
      });
    }

    // happens when grid view is requested
    case ServerActionType.ALL_PC_CONTENT_LOADED: {
      return produce(state, newState => {
        newState.designer.loadingBirdseye = false;
        newState.designer.loadedBirdseyeInitially = true;
        newState.designer.allLoadedPCFileData = action.payload;
      });
    }
    case ActionType.RESIZER_MOVED:
    case ActionType.RESIZER_PATH_MOUSE_MOVED: {
      return produce(state, newState => {
        newState.designer.resizerMoving = true;
        const frames = getSelectedFrames(newState);

        if (!frames.length) {
          console.warn(`Trying to resize non-frame`);
          return;
        }

        const oldBox = mergeBoxes(
          state.designer.selectedNodePaths.map(
            nodePath => newState.designer.boxes[nodePath]
          )
        );

        for (
          let i = 0, { length } = state.designer.selectedNodePaths;
          i < length;
          i++
        ) {
          const frame = frames[i];
          const nodePath = state.designer.selectedNodePaths[i];
          Object.assign(
            frame,
            updateAnnotations(frame, {
              frame: updateBox(
                newState.designer.boxes[nodePath],
                oldBox,
                action.payload.newBounds
              )
            })
          );
        }
      });
    }
    case ActionType.GLOBAL_H_KEY_DOWN: {
      return produce(state, newState => {
        const frames = getSelectedFrames(newState);

        for (
          let i = 0, { length } = newState.designer.selectedNodePaths;
          i < length;
          i++
        ) {
          const frame = frames[i];
          const annotations: NodeAnnotations =
            (frame.annotations && computeVirtJSObject(frame.annotations)) || {};
          Object.assign(
            frame,
            updateAnnotations(frame, {
              frame: {
                visible: !(annotations.frame?.visible !== false)
              }
            })
          );
        }
      });
    }
    case ActionType.FRAME_TITLE_CHANGED: {
      return produce(state, newState => {
        const frame = getFrameFromIndex(action.payload.frameIndex, newState);

        if (!frame) {
          console.warn(`Trying to resize non-frame`);
          return;
        }

        Object.assign(
          frame,
          updateAnnotations(frame, {
            frame: {
              title: action.payload.value
            }
          })
        );
      });

      return state;
    }
    case ActionType.CANVAS_PANNED: {
      // do not allow panning when expanded
      if (isExpanded(state)) {
        return state;
      }

      const {
        delta: { x: deltaX, y: deltaY },
        metaKey,
        mousePosition,
        size
      } = action.payload;

      const delta2X = deltaX * PAN_X_SENSITIVITY;
      const delta2Y = deltaY * PAN_Y_SENSITIVITY;

      return produce(state, newState => {
        const transform = newState.designer.canvas.transform;

        if (metaKey) {
          newState.designer.canvas.transform = centerTransformZoom(
            newState.designer.canvas.transform,
            {
              x: 0,
              y: 0,
              width: size.width,
              height: size.height
            },
            clamp(
              transform.z + (transform.z * -deltaY) / ZOOM_SENSITIVITY,
              MIN_ZOOM,
              MAX_ZOOM
            ),
            mousePosition
          );
        } else {
          newState.designer.canvas.transform.x = transform.x - delta2X; // clamp(transform.x - delta2X, 0, size.width * transform.z - size.width);
          newState.designer.canvas.transform.y = transform.y - delta2Y; // clamp(transform.y - delta2Y, 0, size.height * transform.z - size.height);
        }
        Object.assign(
          newState.designer.canvas,
          clampCanvasTransform(
            newState.designer.canvas,
            newState.designer.boxes
          )
        );
      });
    }
    case ActionType.CANVAS_MOUSE_MOVED: {
      return produce(state, newState => {
        newState.designer.canvas.mousePosition = action.payload;
      });
    }
    case ActionType.DIR_LOADED: {
      return produce(state, newState => {
        if (action.payload.isRoot) {
          newState.designer.projectDirectory = action.payload.item;
        } else {
          const target = getFSItem(
            action.payload.item.absolutePath,
            newState.designer.projectDirectory
          );
          if (target) {
            (target as Directory).children = action.payload.item.children;
          }
        }
      });
    }
    case ActionType.CANVAS_RESIZED: {
      state = produce(state, newState => {
        newState.designer.canvas.size = action.payload;
      });

      state = maybeCenterCanvas(state);

      return state;
    }
  }
  return state;
};

const normalizeZoom = zoom => {
  return zoom < 1 ? 1 / Math.round(1 / zoom) : Math.round(zoom);
};

const clampCanvasTransform = (canvas: Canvas, rects: Record<string, Box>) => {
  return produce(canvas, newCanvas => {
    const w = (canvas.size.width / MIN_ZOOM) * canvas.transform.z;
    const h = (canvas.size.height / MIN_ZOOM) * canvas.transform.z;

    newCanvas.transform.x = clamp(newCanvas.transform.x, -w, w);

    newCanvas.transform.y = clamp(newCanvas.transform.y, -h, w);
  });
};

const setCanvasZoom = (
  zoom: number,
  state: Canvas,
  rects: Record<string, Box>,
  centered?: boolean
) => {
  zoom = clamp(zoom, MIN_ZOOM, MAX_ZOOM);
  return clampCanvasTransform(
    produce(state, newState => {
      newState.transform = centerTransformZoom(
        state.transform,
        { x: 0, y: 0, ...state.size },
        zoom,
        centered
          ? {
              x: state.size.width / 2,
              y: state.size.height / 2
            }
          : state.mousePosition
      );
    }),
    rects
  );
};

const updateAnnotations = (frame: VirtualFrame, newAnnotations: any) => {
  const annotations =
    (frame.annotations && computeVirtJSObject(frame.annotations)) ||
    ({} as any);

  let mergedAnnotations = {
    ...annotations
  };

  for (const key in newAnnotations) {
    mergedAnnotations = {
      ...mergedAnnotations,

      // simple merge - cover just objects, and replace all others.
      [key]:
        (typeof annotations[key] === typeof newAnnotations[key] &&
          typeof newAnnotations[key] === "object" &&
          !Array.isArray(newAnnotations) && {
            ...(annotations[key] || {}),
            ...newAnnotations[key]
          }) ||
        newAnnotations[key]
    };
  }

  if (!frame.annotations) {
    frame.annotations = {
      kind: VirtJsObjectKind.JsObject,
      values: {},

      // null to indicate insertion
      source: null
    };
  }

  frame.annotations.values = toVirtJsValue(mergedAnnotations).values;
  return frame;
};

const selectNode = (nodePath: string, shiftKey: boolean, state: AppState) => {
  return produce(state, newState => {
    if (nodePath == null) {
      newState.designer.selectedNodePaths = [];
      return;
    }
    if (shiftKey) {
      // allow toggle selecting elements - necessary since escape key doesn't work.
      newState.designer.selectedNodePaths.push(nodePath);
    } else {
      newState.designer.selectedNodePaths = [nodePath];
    }
  });
};

const updateBox = (box: Box, oldBox: Box, newBox: Box) => {
  const x = box.x + newBox.x - oldBox.x;
  const y = box.y + newBox.y - oldBox.y;
  const width = box.width + newBox.width - oldBox.width;
  const height = box.height + newBox.height - oldBox.height;
  return {
    x,
    y,
    width,
    height
  };
};

const minimizeWindow = (state: AppState) => {
  if (!isExpanded(state)) {
    return state;
  }
  return maybeCenterCanvas(state, true);
};

const handleLocationChange = (
  state: AppState,
  { payload }: LocationChanged | RedirectRequested
) => {
  return produce(state, newState => {
    Object.assign(newState.designer.ui, payload);

    // clean path & ensure that it looks like "/canvas" instead of "/canvas/";
    newState.designer.ui.pathname = path
      .normalize(newState.designer.ui.pathname)
      .replace(/\/$/, "");

    newState.designer.centeredInitial = false;
  });
};