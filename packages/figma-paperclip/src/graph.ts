import * as plimit from "p-limit";
import * as chalk from "chalk";
import * as path from "path";
import { FigmaApi } from "./api";
import * as fsa from "fs-extra";
import { findLayer, httpGet, logVerb, logWarn, md5 } from "./utils";
import * as https from "https";
import {
  DependencyGraph,
  DependencyKind,
  DesignDependency,
  DesignFileFontImport,
  DesignFileImport,
  DesignFileImportKind,
  ExportSettings,
  flattenNodes,
  getNodeById,
  getNodeExportFileName,
  isExported,
  NodeType
} from "./state";
import { kebabCase, uniq } from "lodash";

export const loadDependencies = async (
  fileKeys: string[],
  cwd: string,
  api: FigmaApi
) => {
  let graph: DependencyGraph = {};

  // for TESTING only!
  const cacheFile = path.join(cwd, `${md5(JSON.stringify(fileKeys))}.cache`);

  if (fsa.existsSync(cacheFile) && !process.env.NO_CACHE) {
    graph = JSON.parse(fsa.readFileSync(cacheFile, "utf-8"));
  } else {
    // load all
    for (const fileKey of fileKeys) {
      await loadDesignFile(fileKey, cwd, api, graph);
    }

    if (process.env.CACHE_GRAPH) {
      fsa.writeFileSync(cacheFile, JSON.stringify(graph, null, 2));
    }
  }

  return graph;
};

const loadDesignFile = async (
  fileKey: string,
  cwd: string,
  api: FigmaApi,
  graph: DependencyGraph = {}
): Promise<DependencyGraph> => {
  if (graph[fileKey]) {
    return graph;
  }

  const imports: Record<string, DesignFileImport> = {};

  const dep = (graph[fileKey] = {
    kind: DependencyKind.Design,
    imports,
    name: null,
    fileKey,
    document: null,
    styles: null
  });

  const file = await api.getFile(fileKey);

  Object.assign(dep, {
    name: file.name,
    document: file.document,
    styles: file.styles
  });

  logVerb(`Loading design ${chalk.bold(file.name)}`);

  const limit = plimit(10);

  const fonts = await loadFonts(dep, graph);
  Object.assign(imports, fonts);

  await loadMedia(dep, graph, api);

  const foreignComponentIds = Object.keys(file.components).filter(importId => {
    const node = getNodeById(importId, file.document);
    if (node && node.type == NodeType.Component) {
      return false;
    }
    return true;
  });

  await Promise.all(
    foreignComponentIds.map(importId => {
      return limit(async () => {
        const componentRef = file.components[importId];

        let componentInfo: any;

        try {
          componentInfo = (await api.getComponent(componentRef.key)) as any;
        } catch (e) {
          if (e.status === 404) {
            logWarn(
              `Unable to find component ${chalk.bold(componentRef.name)}`
            );
            return;
          }

          throw e;
        }

        if (componentInfo.meta.file_key === fileKey) {
          return;
        }

        imports[importId] = {
          kind: DesignFileImportKind.Design,
          nodeId: componentInfo.meta.node_id,
          fileKey: componentInfo.meta.file_key
        };

        await loadDesignFile(componentInfo.meta.file_key, cwd, api, graph);
      });
    })
  );

  await Promise.all(
    Object.keys(file.styles).map(id =>
      limit(async () => {
        const style = file.styles[id];
        try {
          const info = await api.getStyle(style.key);

          if (info.meta.file_key === fileKey) {
            return;
          }

          imports[id] = {
            kind: DesignFileImportKind.Design,
            nodeId: info.meta.node_id,
            fileKey: info.meta.file_key
          };
          await loadDesignFile(info.meta.file_key, cwd, api, graph);
        } catch (e) {
          logWarn(`Can't load style info for ${chalk.bold(style.name)}`);
          // console.log(e);
        }
      })
    )
  );

  return graph;
};

const loadFonts = async (dep: DesignDependency, graph: DependencyGraph) => {
  const deps: Record<string, DesignFileFontImport> = {};
  const fonts = getDesignFonts(dep);

  const limit = plimit(6);

  await Promise.all(
    fonts.map(font => {
      const fileKey = getFontKey(font);
      deps[font] = {
        kind: DesignFileImportKind.Font,
        fileKey
      };

      if (graph[fileKey]) {
        return;
      }

      const dep = (graph[fileKey] = {
        kind: DependencyKind.Font,
        fileKey: fileKey,
        content: null
      });

      return limit(async () => {
        try {
          logVerb(`Loading font ${chalk.bold(font)}`);

          let css = await httpGet({
            host: `fonts.googleapis.com`,
            path: `/css?family=${encodeURIComponent(
              font
            )}:100,200,300,400,500,600,700`
          });

          // PC doesn't support urls without "
          css = css.replace(/url\((.*?)\)/g, (_, url, ...args) => {
            return `url("${url}")`;
          });

          dep.content = "<style>\n" + css + "</style>";
        } catch (e) {
          logWarn(
            `Could not download ${chalk.bold(
              font
            )} font, you'll need to do it manually.`
          );
        }
      });
    })
  );

  return deps;
};

const loadMedia = async (
  dep: DesignDependency,
  graph: DependencyGraph,
  api: FigmaApi
) => {
  const allNodes = flattenNodes(dep.document);

  let nodeIdsByExport: Record<
    string,
    {
      settings: ExportSettings;
      nodes: Record<string, Node>;
    }
  > = {};

  let mediaCount = 0;

  for (const child of allNodes) {
    if (isExported(child)) {
      for (const setting of child.exportSettings) {
        if (setting.format === "PDF") {
          logWarn(`Cannot download PDF for layer: "${child.name}"`);
          continue;
        }

        if (setting.constraint.type !== "SCALE") {
          logWarn(
            `Cannot download "${child.name}" export since it doesn't have SCALE constraint.`
          );
          continue;
        }

        nodeIdsByExport = addNodeToDownload(child, nodeIdsByExport, setting);
        mediaCount++;
      }
    }
  }

  if (mediaCount === 0) {
    return;
  }

  logVerb(`Loading media for ${chalk.bold(dep.name)} (${mediaCount} assets)`);

  const limit = plimit(10);

  await Promise.all(
    Object.keys(nodeIdsByExport).map(key =>
      limit(async () => {
        const { settings, nodes } = nodeIdsByExport[key];
        const result = await api.getImage(dep.fileKey, {
          ids: Object.keys(nodes).join(","),
          format: settings.format.toLowerCase() as any,
          scale: settings.constraint.value
        });

        for (const nodeId in result.images) {
          const url = result.images[nodeId];

          if (!url) {
            const node = getNodeById(nodeId, dep.document);
            logWarn(
              `Could not fetch asset for ${chalk.bold(
                dep.document.name
              )} / ${chalk.bold(node.name)}`
            );
            continue;
          }
          graph[nodeId] = {
            nodeId,
            settings,
            fileKey: getNodeExportFileName(
              nodes[nodeId] as any,
              dep.document,
              settings
            ),
            kind: DependencyKind.Media,
            url: result.images[nodeId]
          };
        }
      })
    )
  );
};

const getFontKey = font => kebabCase(font);

const getDesignFonts = (dep: DesignDependency) => {
  let fonts: string[] = [];

  findLayer(dep.document, descendent => {
    if (descendent.type === "TEXT") {
      fonts.push(descendent.style.fontFamily);
    }
    return false;
  });

  fonts = uniq(fonts);
  return fonts;
};

const EXTENSIONS = {
  "image/png": ".png",
  "image/svg+xml": ".svg",
  "image/jpeg": ".jpg"
};

const addNodeToDownload = (child, rec, setting: any): any => {
  const key = getSettingKey(setting);

  if (!rec[key]) {
    rec[key] = { settings: setting, nodes: {} };
  }
  rec[key].nodes[child.id] = child;

  return rec;
};

const getSettingKey = setting =>
  setting.format + setting.constraint.type + setting.constraint.value;
