import React from "react";
import * as styles from "./index.pc";
import * as path from "path";
import { useAppStore } from "../../../../hooks/useAppStore";
import {
  zoomInButtonClicked,
  zoomOutButtonClicked,
  popoutButtonClicked,
  collapseFrameButtonClicked,
  gridButtonClicked,
  birdseyeFilterChanged,
  birdseyeTopFilterBlurred
} from "../../../../actions";
import { useTextInput } from "../../../TextInput";
import { pathToFileURL } from "url";
import { current } from "immer";

export const Toolbar = () => {
  const {
    state: {
      canvas,
      embedded,
      expandedFrameInfo,
      projectDirectory,
      showBirdseye,
      readonly,
      birdseyeFilter,
      currentFileUri
    },
    dispatch
  } = useAppStore();

  const onMinusClick = () => {
    dispatch(zoomOutButtonClicked(null));
  };
  const onPlusClick = () => {
    dispatch(zoomInButtonClicked(null));
  };
  const onPopOutButtonClicked = () => {
    dispatch(popoutButtonClicked(null));
  };
  const onCollapseButtonClick = () => {
    dispatch(collapseFrameButtonClicked(null));
  };
  const onGridButtonClick = () => {
    dispatch(gridButtonClicked(null));
  };

  const { inputProps } = useTextInput({
    value: birdseyeFilter,
    focus: true,
    onValueChange: (value: string) => {
      dispatch(birdseyeFilterChanged({ value }));
    }
  });

  const onFilterBlur = () => {
    // dispatch(birdseyeTopFilterBlurred(null));
  };

  const relativePath = currentFileUri
    ?.replace(projectDirectory?.url, "")
    .substr(1);

  return (
    <styles.Container>
      <styles.Controls>
        {/* {showBirdseye ? (
          <styles.SearchInput
            inputRef={inputProps.ref}
            onChange={inputProps.onChange}
            defaultValue={inputProps.value}
            onBlur={onFilterBlur}
          />
        ) : (
          <styles.MagnifyButton onClick={onGridButtonClick} /> 
        )} */}
        <styles.GridButton active={showBirdseye} onClick={onGridButtonClick} />
        {/* <styles.PaintButton
          active={toolsLayerEnabled}
          onClick={onPainToolClick}
        /> */}

        <styles.Zoom
          amount={Math.round(canvas.transform.z * 100)}
          onMinusClick={onMinusClick}
          onPlusClick={onPlusClick}
          hidden={expandedFrameInfo || showBirdseye}
        />
      </styles.Controls>

      {(!embedded && <styles.Title>{relativePath}</styles.Title>) || (
        <styles.Spacer />
      )}

      <styles.Controls>
        {embedded ? (
          <styles.PopOutButton onClick={onPopOutButtonClicked} />
        ) : null}
        {expandedFrameInfo ? (
          <styles.CollapseButton active onClick={onCollapseButtonClick} />
        ) : null}
      </styles.Controls>
      {readonly && <styles.ReadOnlyBadge />}
    </styles.Container>
  );
};
