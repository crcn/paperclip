import { call, put, delay } from "redux-saga/effects";
import {
  BaseRequestChanged,
  getProjectFilesRequestChanged,
  getProjectRequestChanged,
  projectFilesLoadProgressChanged
} from "../actions";
import { EDITABLE_MIME_TYPES, Project, Result } from "../state";
import * as api from "../api";

export function* request<TData>(
  actionCreator: (payload: {
    result: Result<TData>;
  }) => BaseRequestChanged<any, TData>,
  load: () => Generator<any, TData, any> | Promise<TData>
) {
  yield put(actionCreator({ result: { done: false } }));
  try {
    const result = { data: yield call(load), done: true };
    yield put(actionCreator({ result }));
    return result;
  } catch (error) {
    const result = { error, done: true };
    yield put(actionCreator({ result }));
    return result;
  }
}

export function* loadProject(projectIdOrHash: string) {
  const project: Result<Project> = yield request(
    getProjectRequestChanged,
    function*() {
      return yield call(api.getProject, projectIdOrHash);
    }
  );

  if (project.error) {
    return;
  }

  // TODO - to progress
  yield call(loadProjectFiles, project);
}

export function* loadProjectFiles(project: Result<Project>) {
  yield put(projectFilesLoadProgressChanged(0));
  yield request(getProjectFilesRequestChanged, function*() {
    const allData = {};

    let i = 0;
    for (const { path, url } of project.data.files) {
      i++;
      
      // set progress immediately so that people can see progress
      yield put(projectFilesLoadProgressChanged(i / (project.data.files.length + 1)));

      allData[path] = yield call(async () => {
        const resp = await fetch(url, { credentials: "include" });


        const editable = EDITABLE_MIME_TYPES.includes(
          String(resp.headers.get("content-type"))
            .split(";")
            .shift()
        );

        return editable ? resp.text() : resp.blob();
      });

    }

    yield put(projectFilesLoadProgressChanged(1));

    return allData;
  });
}