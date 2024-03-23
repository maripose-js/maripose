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
  publicDir: string;

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
  site?: Partial<SiteConfig>;
}

export type SiteConfig = {
  /**
   * Base path
   */
  basePath: string;

  /**
   * Links to your social media
   */
  socialsLinks: {
    icon: string;
    link: string;
  }[];

  /**
   * Navbar links
   */
  navbarLinks: NavLink[];

  /**
   * Logo options
   */
  logo: LogoOptions;

  /**
   * Title for the site
   */
  title: string;

  /**
   * Description for the site
   */
  description: string;

  /**
   * Route redirects
   */
  redirects: Record<string, string>;

  /**
   * Anchors showed on top of the sidebar
   */
  anchors: NavLink[];

  /**
   * Path to your custom css file
   */
  styles: string | string[];
};

export type NavLink = {
  text: string;
  link: string;
  target?: string;
  rel?: string;
  icon?: string;
};

export type LogoOptions = {
  /**
   * Path to the dark logo
   */
  dark: string;

  /**
   * Path to the light logo
   */
  light: string;

  /**
   * Alt text for the logo
   */
  alt?: string;

  /**
   * Override default href
   */
  href?: string;

  /**
   * Text displayed with the logo
   */
  text?: string;
};

export const resolveConfig = async (
  root: string = process.cwd(),
  ctx: MariposeInstance,
  cmd: "dev" | "build",
  mode: "development" | "production" = "development"
): Promise<MariposeConfig> => {
  const configFile = resolvePath(root, CONFIG_FILE);
  let userConfig: Partial<MariposeConfig> | undefined;
  console.log("configFile", configFile);

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
  const publicDir = path.isAbsolute(userConfig?.publicDir || "")
    ? userConfig?.publicDir
    : resolvePath(rootDir, userConfig?.publicDir || "public");
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
    publicDir,
    buildDir,
    watch: userConfig?.watch ?? {},
    server: serverOptions,
    site: {
      basePath: userConfig?.site?.basePath || "/",
      socialsLinks: userConfig?.site?.socialsLinks || [],
      navbarLinks: userConfig?.site?.navbarLinks || [],
      logo: userConfig?.site?.logo || { dark: "", light: "", name: "" },
      title: userConfig?.site?.title || "",
      description: userConfig?.site?.description || "",
      redirects: userConfig?.site?.redirects || {},
      anchors: userConfig?.site?.anchors || [],
      styles: userConfig?.site?.styles || [],
    },
  } as MariposeConfig;
};

export const defineConfig = (config: Partial<MariposeConfig>) => {
  return config;
};
