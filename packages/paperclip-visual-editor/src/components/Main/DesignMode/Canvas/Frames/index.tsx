import React, { useCallback, useLayoutEffect, useState } from "react";
import {
  Frame,
  FramesRenderer,
  getFrameBounds,
  getFrameVirtualNode
} from "paperclip-web-renderer";
import { memo, useEffect, useMemo } from "react";
import {
  engineDelegateEventsHandled,
  rectsCaptured,
  rendererMounted,
  rendererUnounted
} from "../../../../../actions";
import { useAppStore } from "../../../../../hooks/useAppStore";
import {
  computeVirtJSObject,
  VirtualElement,
  VirtualNode,
  VirtualText,
  NodeAnnotations,
  LoadedData,
  EngineDelegateEvent
} from "paperclip-utils";
import * as styles from "./index.pc";
import { render } from "react-dom";
import { FrameContainer } from "../../../../FrameContainer";
import { throttle } from "lodash";
import { isExpanded } from "../../../../../state";

type FramesProps = {
  expandedFrameIndex?: number;
};

export const Frames = memo(({ expandedFrameIndex }: FramesProps) => {
  const { state } = useAppStore();
  const { renderer, preview, onFrameLoaded } = useFrames({
    fileUri: state.ui.query.currentFileUri,
    shouldCollectRects: true
  });

  if (!preview) {
    return null;
  }

  return (
    <>
      {renderer.immutableFrames.map((frame, i) => {
        return (
          <Frame
            key={i}
            onLoad={onFrameLoaded}
            expanded={expandedFrameIndex === i}
            frame={frame}
            preview={getFrameVirtualNode(
              frame,
              renderer.immutableFrames,
              preview
            )}
          />
        );
      })}
    </>
  );
});

type UseFrames2Props = {
  fileData: Record<string, LoadedData>;
  shouldCollectRects: boolean;
};

class FrameController {
  readonly id: string;
  private _disposed: boolean;
  constructor(
    readonly renderer: FramesRenderer,
    readonly dispatch: any,
    public shouldCollectRects: boolean,
    readonly loadedData?: LoadedData
  ) {
    this.id = `${Date.now()}.${Math.random()}`;
    this.dispatch(rendererMounted({ id: this.id }));
    if (shouldCollectRects) {
      this, window.addEventListener("resize", this._onWindowResize);
    }
    if (loadedData) {
      renderer.initialize(loadedData);
    }
  }
  updatePreview(preview: VirtualNode) {
    this.renderer.setPreview(preview);
    this.collectRects();
  }
  dispose() {
    this._disposed = true;
    this, window.removeEventListener("resize", this._onWindowResize);
    this.dispatch(rendererUnounted({ id: this.id }));
  }
  handleEvents = (events: EngineDelegateEvent[] = [], preview: VirtualNode) => {
    if (!events.length) {
      return;
    }
    events.forEach(this.renderer.handleEngineDelegateEvent);
    this.updatePreview(preview);
    this.dispatch(
      engineDelegateEventsHandled({ id: this.id, count: events.length })
    );
  };
  private _onWindowResize = () => {
    this.collectRects();
  };
  collectRects = throttle(
    () => {
      if (!this.shouldCollectRects || this._disposed) {
        return;
      }
      this.dispatch(rectsCaptured(this.renderer.getRects()));
    },
    5,
    { leading: false }
  );
}

export const useMultipleFrames = ({
  fileData,
  shouldCollectRects
}: UseFrames2Props) => {
  const [renderers, setRenderers] = useState<Record<string, FrameController>>(
    {}
  );
  const { state, dispatch } = useAppStore();

  useEffect(() => {
    const newRenderers = { ...renderers };
    for (const fileUri in fileData) {
      if (newRenderers[fileUri]) {
        continue;
      }

      newRenderers[fileUri] = new FrameController(
        new FramesRenderer(fileUri, state.renderProtocol),
        dispatch,
        shouldCollectRects,
        fileData[fileUri]
      );
    }

    for (const fileUri in newRenderers) {
      if (!fileData[fileUri]) {
        newRenderers[fileUri].dispose();
      }
    }

    setRenderers(newRenderers);
  }, [fileData]);

  useLayoutEffect(() => {
    for (const fileUri in renderers) {
      const renderer = renderers[fileUri];
      renderer.collectRects();
    }
  }, [renderers, isExpanded(state), state.canvas.size]);

  useEffect(() => {
    for (const fileUri in renderers) {
      const frameData = state.allLoadedPCFileData[fileUri];
      const renderer = renderers[fileUri];
      renderer.handleEvents(
        state.currentEngineEvents[renderer.id],
        frameData?.preview
      );
    }
  }, [renderers, state.currentEngineEvents]);

  return useMemo(
    () =>
      Object.keys(renderers).map(uri => {
        const renderer = renderers[uri];

        return {
          renderer: renderer.renderer,
          onFrameLoaded: renderer.collectRects,
          preview: renderer.renderer.getPreview()
        };
      }, {}),
    [renderers]
  );
};

type UseFramesProps = {
  fileUri: string;
  shouldCollectRects: boolean;
};

export const useFrames = ({
  fileUri,
  shouldCollectRects = true
}: UseFramesProps) => {
  const { state, dispatch } = useAppStore();

  const frameData = state.allLoadedPCFileData[fileUri];

  const renderer = useMemo(() => {
    return new FrameController(
      new FramesRenderer(fileUri, state.renderProtocol),
      dispatch,
      shouldCollectRects,
      frameData
    );
  }, [fileUri, state.renderProtocol, shouldCollectRects, !!frameData]);

  useEffect(() => {
    return () => renderer.dispose();
  }, [renderer]);

  useLayoutEffect(() => {
    renderer.collectRects();
  }, [renderer, isExpanded(state), state.canvas.size]);

  const onFrameLoaded = useCallback(() => {
    renderer.collectRects();
  }, [renderer]);

  useEffect(() => {
    if (state.currentEngineEvents[renderer.id]?.length) {
      renderer.handleEvents(
        state.currentEngineEvents[renderer.id],
        frameData?.preview
      );
    }
  }, [renderer, state.currentEngineEvents, frameData?.preview]);

  return {
    renderer: renderer.renderer,
    preview: frameData?.preview,
    onFrameLoaded
  };
};

type FrameProps = {
  frame: Frame;
  expanded: boolean;
  preview: VirtualText | VirtualElement;
  onLoad: () => void;
};

const Frame = memo(({ frame, preview, expanded, onLoad }: FrameProps) => {
  if (!preview) {
    return null;
  }

  const annotations: NodeAnnotations =
    (preview.annotations && computeVirtJSObject(preview.annotations)) ||
    ({} as any);

  // ability to hide
  if (annotations.frame?.visible === false) {
    return null;
  }

  const frameStyle = useMemo(() => {
    const bounds = getFrameBounds(preview);

    if (expanded) {
      return {
        width: `100%`,
        height: `100%`,

        // necessary since client rects include frame position
        left: bounds.x,
        top: bounds.y,
        zIndex: 1,
        position: "absolute"
      };
    }

    return {
      width: bounds.width,
      height: bounds.height,
      left: bounds.x,
      top: bounds.y,
      position: "absolute"
    };
  }, [preview.annotations, expanded]) as any;

  return (
    <styles.Frame style={frameStyle}>
      <FrameContainer frame={frame} fullscreen={expanded} onLoad={onLoad} />
    </styles.Frame>
  );
});