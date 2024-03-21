import path from "path";
import * as fs from "fs";
import { normalize, resolve } from "pathe";
import { loadConfig, watchConfig } from "c12";
import type { MariposeInstance } from "../context.ts";
import type { WatchOptions } from "chokidar";
import type { ServerOptions } from "../server/http.ts";
import { defu } from "defu";
import type { PluggableList } from "unified";
import type { RsbuildConfig } from "@rsbuild/core";

export const CONFIG_FILE = "maripose.config.ts";
export const resolvePath = (root: string, file: string) =>
  normalize(path.join(root, file)).replaceAll("/", "\\");

export interface MariposeConfig {
  /**
   * Root directory
   */
  root: string;

  /**
   * Assets directory
   */
  assetsDir: string;

  /**
   * Directory to build to
   */
  buildDir: string;

  /**
   * HMR options
   */
  watch: WatchOptions;

  /**
   * Server options
   */
  server: ServerOptions;

  /**
   * Markdown options.
   */
  markdown: {
    remarkPlugins?: PluggableList;
    rehypePlugins?: PluggableList;
    //TODO: add shiki options
  };

  /**
   * Rsbuild options
   */
  rsbuild?: RsbuildConfig;

  /**
   * Site config
   */
  site: SiteConfig;
}

export type SiteConfig = {
  /**
   * Base path
   */
  basePath: string;
};

export const resolveConfig = async (
  root: string = process.cwd(),
  ctx: MariposeInstance,
  cmd: "dev" | "build",
  mode: "development" | "production" = "development"
): Promise<MariposeConfig> => {
  const configFile = resolvePath(root, CONFIG_FILE);
  let userConfig: Partial<MariposeConfig> | undefined;

  if (!fs.existsSync(configFile)) {
    throw new Error(`No config file found at ${CONFIG_FILE}`);
  }

  const config = await loadConfig({
    cwd: root,
    name: "maripose",
  });

  userConfig = config.config as Partial<MariposeConfig>;

  const basicRoot = userConfig?.root || root || ".";
  const rootDir = path.isAbsolute(basicRoot)
    ? basicRoot
    : path.join(process.cwd(), basicRoot);
  const assetsDir = path.isAbsolute(userConfig?.assetsDir || "")
    ? userConfig?.assetsDir
    : resolvePath(rootDir, userConfig?.assetsDir || "assets");
  const buildDir = path.isAbsolute(userConfig?.buildDir || "")
    ? userConfig?.buildDir
    : resolvePath(rootDir, userConfig?.buildDir || "dist");
  const serverOptions: ServerOptions = defu(userConfig?.server, {
    port: 3001,
    strictPort: false,
    hostname: "localhost",
  } as ServerOptions);

  return {
    root: rootDir,
    assetsDir,
    buildDir,
    watch: userConfig?.watch ?? {},
    server: serverOptions,
    site: {
      basePath: userConfig?.site?.basePath || "/",
    },
  } as MariposeConfig;
};

export const defineConfig = (config: Partial<MariposeConfig>) => {
  return config;
};
