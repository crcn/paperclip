import React, { useMemo, useRef, useState } from "react";
import { useAppStore } from "../../../../hooks/useAppStore";
import * as styles from "./index.pc";
import * as path from "path";
import TextInput from "paperclip-designer/src/components/TextInput/index.pc";
import { useTextInput } from "paperclip-designer/src/components/TextInput";
import { useSelect } from "paperclip-designer/src/components/Select";

import {
  fileItemClicked,
  newFileNameEntered,
  syncPanelsClicked
} from "../../../../actions";
import { redirectRequest } from "paperclip-designer/src/actions";

export const Toolbar = () => {
  const { state, dispatch } = useAppStore();
  const [showNewFileInput, setShowNewFileInput] = useState(false);
  const [newFileName, setNewFileName] = useState<string>();
  const onAddFile = e => {
    setShowNewFileInput(true);
  };
  const select = useSelect();

  const onFileItemClick = uri => {
    select.close();
    dispatch(fileItemClicked({ uri }));
  };

  const onNewInputBlur = () => {
    setNewFileName(null);
    setShowNewFileInput(false);
  };

  const basename = path.basename(state.currentCodeFileUri);
  const allFileUris = useMemo(() => Object.keys(state.shared.documents), [
    state.shared.documents
  ]);

  const { inputProps: newFileInputProps } = useTextInput({
    value: newFileName,
    onValueChange: setNewFileName
  });

  const onNewFileNameKeyPress = e => {
    if (e.key !== "Enter") {
      return;
    }
    for (const uri of allFileUris) {
      if (
        uri.replace(/(\w+:\/\/\/|\.pc$)/g, "") ===
        newFileName.replace(".pc", "")
      ) {
        return alert(`A file with that name already exists`);
      }
    }
    dispatch(newFileNameEntered({ value: newFileName }));
    setShowNewFileInput(false);
    setNewFileName("");
    select.close();
  };

  const onSyncPanelsClick = () => {
    dispatch(syncPanelsClicked(null));
  };
  return (
    <styles.Topbar>
      <styles.FileSelect
        ref={select.ref}
        active={select.menuVisible}
        onButtonClick={select.onButtonClick}
        onBlur={select.onBlur}
        name={basename}
        menu={
          select.menuVisible && (
            <styles.FileMenu>
              <styles.FileMenuItems>
                {allFileUris.map(uri => {
                  return (
                    <styles.FileMenuItem
                      key={uri}
                      onClick={() => {
                        onFileItemClick(uri);
                      }}
                    >
                      {path.basename(uri)}
                    </styles.FileMenuItem>
                  );
                })}
                {showNewFileInput && (
                  <styles.FileMenuItem noFocus>
                    <TextInput
                      autoFocus
                      onBlur={onNewInputBlur}
                      {...newFileInputProps}
                      onKeyPress={onNewFileNameKeyPress}
                    />
                  </styles.FileMenuItem>
                )}
              </styles.FileMenuItems>

              <styles.AddFileMenuItem onClick={onAddFile} />
            </styles.FileMenu>
          )
        }
      />
      {state.currentCodeFileUri !== state.designer.ui.query.currentFileUri && (
        <styles.EyeButton onClick={onSyncPanelsClick} />
      )}
    </styles.Topbar>
  );
};