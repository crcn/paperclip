import React, { useMemo } from "react";
import { MainBase as DesignModeMainBase } from "paperclip-designer/src/components/Main";
import { AppStoreContext as DesignModeAppStoreContext } from "paperclip-designer/src/contexts";
import { withAppStore } from "../../hocs/withAppStore";
import { useAppStore } from "../../hooks/useAppStore";
import { MainToolbar } from "./Toolbar";
import * as styles from "./index.pc";
import { CodeMode } from "./CodeMode";

export const Main = withAppStore(() => {
  const store = useAppStore();
  const { compact } = store.state;
  return (
    <styles.Container>
      {!compact && <MainToolbar />}
      <styles.EditorContainer compact={store.state.compact}>
        <CodeMode />
        <DesignModeAppStoreContext.Provider value={store}>
          <DesignModeMainBase />
        </DesignModeAppStoreContext.Provider>
      </styles.EditorContainer>
    </styles.Container>
  );
});
