// 🙈

import * as fs from "fs";
import * as url from "url";
import {
  EngineDelegateEvent,
  updateAllLoadedData,
  EngineDelegateEventKind,
  DependencyContent,
  SheetInfo,
  VirtualNode,
  LoadedData,
  PaperclipSourceWatcher,
  ChangeKind
} from "paperclip-utils";
import { noop } from "./utils";

export type FileContent = {
  [identifier: string]: string;
};

export type EngineIO = {
  resolveFile?: (fromPath: string, toPath: string) => string;
  fileExists?: (filePath: string) => boolean;
  readFile?: (filePath: string) => string;
};

export interface IEngineDelegate {
  onEvent: (listener: EngineDelegateEventListener) => () => void;
  parseFile: (uri: string) => any;
}

export enum EngineMode {
  SingleFrame,
  MultiFrame
}

export type EngineOptions = {
  io?: EngineIO;
  mode?: EngineMode;
};

const mapResult = result => {
  if (!result) {
    return result;
  }
  if (result.Ok) {
    return result.Ok;
  } else {
    return { error: result.Err };
  }
};

export type EngineDelegateEventListener = (event: EngineDelegateEvent) => void;

export type LoadResult = {
  importedSheets: SheetInfo[];
  sheet: any;
  preview: VirtualNode;
};

export enum EngineDelegateEventType {
  Loaded = "Loaded",
  ChangedSheets = "ChangedSheets"
}

/*
Engine delegate is the bridge between JS and the rust engine. Primary reason
for this class instead of shoving functionality into the engine itself is for performance & 
reducing amount of data being passed between Rust <-> JS
*/

export class EngineDelegate {
  private _listeners: EngineDelegateEventListener[] = [];
  private _rendered: Record<string, LoadedData> = {};

  constructor(private _native: any, private _onCrash: (err) => void = noop) {
    // only one native listener to for buffer performance
    this._native.add_listener(this._dispatch);

    this.onEvent(this._onEngineDelegateEvent);
    return this;
  }

  onEvent(listener: EngineDelegateEventListener) {
    if (listener == null) {
      throw new Error(`listener cannot be undefined`);
    }
    this._listeners.push(listener);
    return () => {
      const i = this._listeners.indexOf(listener);
      if (i !== -1) {
        this._listeners.splice(i, 1);
      }
    };
  }

  private _onEngineDelegateEvent = (event: EngineDelegateEvent) => {
    if (event.kind === EngineDelegateEventKind.Evaluated) {
      this._rendered = updateAllLoadedData(this._rendered, event);
      this._dispatch({
        kind: EngineDelegateEventKind.Loaded,
        uri: event.uri,
        data: this._rendered[event.uri]
      });
    } else if (event.kind === EngineDelegateEventKind.Diffed) {
      const existingData = this._rendered[event.uri];
      this._rendered = updateAllLoadedData(this._rendered, event);
      const newData = this._rendered[event.uri];

      const removedSheetUris = [];

      for (const { uri } of existingData.importedSheets) {
        if (!newData.allDependencies.includes(uri)) {
          removedSheetUris.push(uri);
        }
      }

      const addedSheets: SheetInfo[] = [];
      for (const depUri of event.data.allDependencies) {
        // Note that we only do this if the sheet is already rendered -- engine
        // doesn't fire an event in that scenario. So we need to notify any listener that a sheet
        // has been added, including the actual sheet object.
        if (
          !existingData.allDependencies.includes(depUri) &&
          this._rendered[depUri]
        ) {
          addedSheets.push({
            uri: depUri,
            sheet: this._rendered[depUri].sheet
          });
        }
      }

      if (addedSheets.length || removedSheetUris.length) {
        this._dispatch({
          uri: event.uri,
          kind: EngineDelegateEventKind.ChangedSheets,
          data: {
            newSheets: addedSheets,
            removedSheetUris: removedSheetUris,
            allDependencies: event.data.allDependencies
          }
        });
      }
    }
  };
  parseFile(uri: string) {
    return mapResult(this._native.parse_file(uri));
  }
  getLoadedAst(uri: string): DependencyContent {
    return this._tryCatch(() => this._native.get_loaded_ast(uri));
  }
  parseContent(content: string) {
    return this._tryCatch(() => mapResult(this._native.parse_content(content)));
  }
  updateVirtualFileContent(uri: string, content: string) {
    return this._tryCatch(() => {
      const ret = mapResult(
        this._native.update_virtual_file_content(uri, content)
      );
      return ret;
    });
  }

  public getLoadedData(uri: string): LoadedData | null {
    return this._rendered[uri];
  }

  public getAllLoadedData(): Record<string, LoadedData> {
    return this._rendered;
  }

  open(uri: string): LoadedData {
    const result = this._tryCatch(() => mapResult(this._native.run(uri)));
    if (result && result.error) {
      throw result.error;
    }

    return this._rendered[uri];
  }
  private _tryCatch = <TRet>(fn: () => TRet) => {
    try {
      return fn();
    } catch (e) {
      this._onCrash(e);
      return null;
    }
  };
  private _dispatch = (event: EngineDelegateEvent) => {
    // try-catch since engine will throw opaque error.
    for (const listener of this._listeners) {
      listener(event);
    }
  };
}

export const keepEngineInSyncWithFileSystem2 = (
  watcher: PaperclipSourceWatcher,
  engine: EngineDelegate
) => {
  return watcher.onChange((kind, uri) => {
    if (kind === ChangeKind.Changed) {
      engine.updateVirtualFileContent(
        uri,
        fs.readFileSync(new url.URL(uri), "utf8")
      );
    }
  });
};