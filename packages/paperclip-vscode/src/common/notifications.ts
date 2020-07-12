import { EngineEvent as PCEngineEvent } from "paperclip";
import {
  VirtualNode,
  LoadedData,
  GraphErrorEvent,
  EngineErrorEvent
} from "paperclip-utils";

abstract class BaseNotification<TType extends string, TParams> {
  constructor(readonly type: TType, readonly params: TParams) {}
  getArgs(): [TType, TParams] {
    return [this.type, this.params];
  }
}

export enum NotificationType {
  UPDATE_VIRTUAL_FILE_CONTENTS = "UPDATE_VIRTUAL_FILE_CONTENTS",
  CRASH = "CRASH",
  LOAD = "LOAD",
  ERROR_LOADING = "ERROR_LOADING",
  LOADED = "LOADED",
  UNLOAD = "UNLOAD",
  ENGINE_EVENT = "ENGINE_EVENT"
}

export type UpdateVirtualFileContentsParams = {
  uri: string;
  content: string;
};

export class UpdateVirtualFileContents extends BaseNotification<
  NotificationType.UPDATE_VIRTUAL_FILE_CONTENTS,
  UpdateVirtualFileContentsParams
> {
  constructor(params: UpdateVirtualFileContentsParams) {
    super(NotificationType.UPDATE_VIRTUAL_FILE_CONTENTS, params);
  }
}

export type LoadParams = {
  uri: string;
};

export class Load extends BaseNotification<NotificationType.LOAD, LoadParams> {
  constructor(params: LoadParams) {
    super(NotificationType.LOAD, params);
  }
}

export type ErrorLoadingParams = {
  uri: string;
  error: EngineErrorEvent;
};

export class ErrorLoading extends BaseNotification<
  NotificationType.ERROR_LOADING,
  ErrorLoadingParams
> {
  constructor(params: ErrorLoadingParams) {
    super(NotificationType.ERROR_LOADING, params);
  }
}

export type LoadedParams = {
  uri: string;
  data: LoadedData;
};

export class Loaded extends BaseNotification<
  NotificationType.LOADED,
  LoadedParams
> {
  constructor(params: LoadedParams) {
    super(NotificationType.LOADED, params);
  }
}

export type PreviewInitParams = {
  uri: string;
  sheet: any;
  preview: VirtualNode;
  importedSheets: any[];
};

export class Unload extends BaseNotification<
  NotificationType.UNLOAD,
  LoadParams
> {
  constructor(params: LoadParams) {
    super(NotificationType.UNLOAD, params);
  }
}

export class Crash extends BaseNotification<NotificationType.CRASH, {}> {
  constructor(params: {}) {
    super(NotificationType.CRASH, params);
  }
}

export class EngineEventNotification extends BaseNotification<
  NotificationType.ENGINE_EVENT,
  PCEngineEvent
> {
  constructor(params: PCEngineEvent) {
    super(NotificationType.ENGINE_EVENT, params);
  }
}
