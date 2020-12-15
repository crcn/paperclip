import React, { useRef } from "react";
import { Frame, FramesRenderer } from "paperclip-web-renderer";
import { memo, useEffect, useMemo } from "react";
import { engineDelegateEventsHandled } from "../../../../../actions";
import { useAppStore } from "../../../../../hooks/useAppStore";

export const Frames = memo(() => {
  const { state, dispatch } = useAppStore();

  const renderer = useMemo(() => {
    const renderer = new FramesRenderer(state.currentFileUri, "file://");
    const pcFileData = state.allLoadedPCFileData[state.currentFileUri];
    if (pcFileData) {
      renderer.initialize(pcFileData);
    }
    return renderer;
  }, [state.currentFileUri]);

  useEffect(() => {
    if (state.currentEngineEvents.length) {
      state.currentEngineEvents.forEach(renderer.handleEngineDelegateEvent);
      dispatch(engineDelegateEventsHandled(undefined));
    }
  }, [renderer, state.currentEngineEvents]);

  return (
    <div>
      FRAME?
      {renderer.immutableFrames.map((frame, i) => {
        return <Frame key={i} frame={frame} />;
      })}
    </div>
  );
});

type FrameProps = {
  frame: Frame;
};

const Frame = memo(({ frame }: FrameProps) => {
  const frameRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (frameRef.current) {
      const iframe = document.createElement("iframe");
      // addresses https://github.com/crcn/paperclip/issues/310
      iframe.srcdoc = `
      <!doctype html>
      <html>
        <head>
          <style>
            html, body {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
            }
          </style>
        </head>
        <body>
        </body>
      </html>
    `;
      iframe.onload = () => {
        iframe.contentDocument.body.appendChild(frame.stage);
      };
      frameRef.current.appendChild(iframe);
    }

    return () => {
      // remove iframe
      if (frameRef.current && frameRef.current.childElementCount) {
        frameRef.current.removeChild(frameRef.current.childNodes[0]);
      }
    };
  }, [frameRef, frame]);

  return <div ref={frameRef}></div>;
});