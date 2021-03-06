import * as path from "path";
import * as url from "url";
import {
  findPCConfigUrl,
  PaperclipConfig,
  PC_CONFIG_FILE_NAME
} from "paperclip-utils";
import * as fs from "fs";

// TODO - move to paperclip-utils as soon as we have a glob library that can handle virtual file systems
const findResourcesFromConfig = (
  get: (config: PaperclipConfig, options: any) => string[]
) => fs => (fromUri: string, relative?: boolean) => {
  // symlinks may fudge module resolution, so we need to find the real path
  const fromPath = fs.realpathSync(new url.URL(fromUri));
  const fromPathDirname = path.dirname(fromPath);
  const configUrl = findPCConfigUrl(fs)(fromUri);

  // If there's no config, then don't bother looking for PC files. Otherwise we're likely
  // to need esoteric logic for resolving PC that I don't think should be supported -- there should
  // just be aproach.
  if (!configUrl) {
    return [];
  }

  const configUri = new url.URL(configUrl);
  const config: PaperclipConfig = JSON.parse(
    fs.readFileSync(configUri, "utf8")
  );

  return get(config, path.dirname(url.fileURLToPath(configUri)))
    .filter(pathname => pathname !== fromPath)
    .map(pathname => {
      if (relative) {
        const modulePath = getModulePath(
          configUrl,
          config,
          pathname,
          fromPathDirname
        );

        if (!path.isAbsolute(modulePath)) {
          return modulePath;
        }

        let relativePath = path.relative(fromPathDirname, modulePath);

        if (relativePath.charAt(0) !== ".") {
          relativePath = "./" + relativePath;
        }

        return relativePath;
      }

      return url.pathToFileURL(pathname).href;
    })
    .map(filePath => {
      return filePath.replace(/\\/g, "/");
    });
};

const resolveModuleRoots = (fromDir: string, roots: string[] = []) => {
  const stat = fs.lstatSync(fromDir);
  const realpath = stat.isSymbolicLink() ? fs.realpathSync(fromDir) : fromDir;
  const newStat = realpath === fromDir ? stat : fs.lstatSync(realpath);
  if (!newStat.isDirectory()) {
    return roots;
  }
  if (fs.existsSync(path.join(fromDir, "package.json"))) {
    roots.push(fromDir);
  } else {
    for (const dirname of fs.readdirSync(realpath)) {
      resolveModuleRoots(path.join(fromDir, dirname), roots);
    }
  }
  return roots;
};

const filterAllFiles = (filter: (filePath: string) => boolean) => {
  const scan = (currentPath: string, results: string[] = []) => {
    const stat = fs.lstatSync(currentPath);
    const realpath = stat.isSymbolicLink()
      ? fs.realpathSync(currentPath)
      : currentPath;

    const newStat = realpath === currentPath ? stat : fs.lstatSync(realpath);
    if (newStat.isDirectory()) {
      for (const dirname of fs.readdirSync(realpath)) {
        const dirpath = path.join(currentPath, dirname);
        scan(dirpath, results);
      }
    } else {
      if (filter(currentPath)) {
        results.push(currentPath);
      }
    }

    return results;
  };

  return scan;
};

const resolveResources = (
  config: PaperclipConfig,
  cwd: string,
  filterFiles: (dir: string) => string[]
) => {
  const sourceDir =
    config.sourceDirectory === "."
      ? cwd
      : path.join(cwd, config.sourceDirectory);
  const filePaths = filterFiles(sourceDir);

  if (config.moduleDirectories) {
    for (const modulesDirname of config.moduleDirectories) {
      const moduleDirPath = path.join(cwd, modulesDirname);
      const moduleRoots = resolveModuleRoots(moduleDirPath);
      for (const moduleDir of moduleRoots) {
        // need to scan until there's a package. This covers @organization namespaces.

        if (!moduleDir) {
          continue;
        }

        const pcConfigPath = path.join(moduleDir, PC_CONFIG_FILE_NAME);
        if (!fs.existsSync(pcConfigPath)) {
          continue;
        }
        const moduleConfig: PaperclipConfig = JSON.parse(
          fs.readFileSync(pcConfigPath, "utf8")
        );

        const moduleSources = filterFiles(
          path.join(moduleDir, moduleConfig.sourceDirectory)
        );

        filePaths.push(...moduleSources);
      }
    }
  }

  return filePaths;
};

export const resolveAllPaperclipFiles = findResourcesFromConfig(
  (config, cwd) => {
    return resolveResources(
      config,
      cwd,
      filterAllFiles(
        filePath =>
          path.extname(filePath) === ".pc" || path.extname(filePath) === ".css"
      )
    );
  }
);
export const resolveAllAssetFiles = findResourcesFromConfig((config, cwd) => {
  // const ext = `+(jpg|jpeg|png|gif|svg)`;
  const exts = [".jpg", ".jpeg", ".png", ".gif", ".svg", ".ttf"];

  // const sourceDir = config.sourceDirectory;

  return resolveResources(
    config,
    cwd,
    filterAllFiles(filePath => exts.includes(path.extname(filePath)))
  );
  // if (sourceDir === ".") {
  //   return filterAllFiles(filePath => exts.includes(path.extname(filePath)))(cwd);
  //   // return glob.sync(`**/*.${ext}`, { cwd, realpath: true });
  // }

  // // return glob.sync(`${sourceDir}/**/*.${ext}`, { cwd, realpath: true });
  // return filterAllFiles(filePath => exts.includes(path.extname(filePath)))(path.join(cwd, sourceDir));
});

const getModulePath = (
  configUri: string,
  config: PaperclipConfig,
  fullPath: string,
  fromDir?: string
) => {
  const configDir = path.dirname(url.fileURLToPath(configUri));

  const moduleDirectory = path.join(configDir, config.sourceDirectory) + "/";

  if (fullPath.indexOf(moduleDirectory) === 0) {
    const modulePath = fullPath.replace(moduleDirectory, "");

    const relativePath = fromDir && path.relative(fromDir, fullPath);

    if (relativePath?.match(/\.\.\//g)?.length || 0 > 0) {
      return modulePath;
    }
  }

  if (config.moduleDirectories) {
    for (const moduleDirectory of config.moduleDirectories) {
      const fullModulePath = path.join(configDir, moduleDirectory);
      if (fullPath.indexOf(fullModulePath) === 0) {
        return fullPath.replace(fullModulePath, "").substr(1);
      }
    }
  }

  return fullPath;
};

// eslint-disable-next-line
export const noop = () => {};
