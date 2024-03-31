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
import React from "react";

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
  socialsLinks: SocialLink[];

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
   * Path to your custom css file
   */
  styles: string | string[];

  /**
   * Text display under the title
   */
  slogan: string;

  /**
   * Home page buttons
   */
  buttons: HomeButton[];

  /**
   * Team page
   *
   * @default Disabled
   */
  teamPage?: {
    members: TeamMember[];
    enable: boolean;
  };

  /**
   * Footer options
   */
  footer: FooterOptions;

  /**
   * Customize title and icon for each tab
   */
  tabSettings: {
    [key: string]: TabSetting;
  };

  /**
   * Customize sidebar links
   */
  sidebar: SidebarItem[];

  /**
   * Custom pages
   */
  pages: string[];
};

export type SidebarItem = {
  group: string;
  pages: {
    title: string;
    file: string;
    icon?: string;
  }[];
};

export type TabSetting = {
  icon?: string;
  title: string;
};

export type SocialLink = {
  icon: string;
  link: string;
};

export type HomeButton = {
  text: string;
  icon?: IconType;
  link: string;
  target?: string;
  variant:
    | "default"
    | "filled"
    | "light"
    | "outline"
    | "subtle"
    | "transparent"
    | "white";
};

export type IconType =
  | {
      icon: string;
      size: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 14 | undefined;
    }
  | string;

export type NavLink = {
  text: string;
  link: string;
  target?: string;
  rel?: string;
  icon?: IconType;
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

  /**
   * Target for the logo link
   */
  target?: string;
};

export type BentoGridItem = {
  className?: string;
  title?: string;
  description?: string;
  header?: string;
  icon?: string;
};

export type TeamMember = {
  name: string;
  role: string;
  description: string;
  avatar: string;
  socials?: SocialLink[];
  sponsor?: string;
};

export type FooterOptions = {
  /**
   * Display social links from site config
   *
   * @default true
   */
  socials: boolean;

  /**
   * Text displayed in the footer
   */
  text: string;
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
      styles: userConfig?.site?.styles || [],
      slogan: userConfig?.site?.slogan || "",
      buttons: userConfig?.site?.buttons || [
        {
          link: "/quick-start",
          text: "Get started",
          variant: "filled",
          icon: "tabler:rocket",
        },
        {
          link: "/docs",
          text: "Learn more",
          variant: "light",
          icon: "tabler:book",
        },
      ],
      teamPage: userConfig?.site?.teamPage || { members: [], enable: false },
      footer: userConfig?.site?.footer || {
        socials: true,
        text: "",
      },
      tabSettings: userConfig?.site?.tabSettings || {},
      sidebar: userConfig?.site?.sidebar || [],
      pages: userConfig?.site?.pages || [],
    },
  } as MariposeConfig;
};

export const defineConfig = (config: Partial<MariposeConfig>) => {
  return config;
};
