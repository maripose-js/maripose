import type { MariposeInstance } from "../context.ts";
import { isProduction } from "std-env";
import type { RsbuildConfig } from "@rsbuild/core";
import type { ServerOptions } from "../server/http.ts";
import type { MariposeConfig } from "../utils/config.ts";
import path from "path";
import { fileURLToPath } from "url";
import { pluginMdx } from "./mdx-plugin.ts";
import { virtualModules } from "./vm.ts";
import { createRouter } from "./router.ts";
import * as fs from "fs-extra";

const dirname = path.dirname(fileURLToPath(new URL(import.meta.url)));

export const PACKAGE_ROOT = path.join(dirname, "../..");

export const CLIENT_ENTRY = path.join(
  PACKAGE_ROOT,
  "dist",
  "client",
  "client.js"
);

export const rsDev = async (ctx: MariposeInstance, options: ServerOptions) => {
  const {
    default: { createRsbuild, mergeRsbuildConfig },
  } = await import("@rsbuild/core");
  const { pluginReact } = await import("@rsbuild/plugin-react");
  const routesDir = path.join(ctx.config?.root!, "src");
  const router = createRouter(routesDir, ctx);

  await router.init();

  const rsBuildConfig = createRsbuildConfig(ctx.config!, options);
  const rsbuild = await createRsbuild({
    rsbuildConfig: mergeRsbuildConfig(rsBuildConfig, ctx.config?.rsbuild!),
  });

  rsbuild.addPlugins([
    virtualModules({
      tempDir: ".maripose/runtime",
      router,
      mariposeConfig: ctx.config?.site!,
    }),
    pluginMdx(ctx.config!),
    pluginReact(),
  ]);
  return rsbuild;
};

export const createRsbuildConfig = (
  ctg: MariposeConfig,
  options: ServerOptions
): RsbuildConfig => {
  const browserslist = {
    web: isProduction
      ? ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"]
      : [
          "last 1 chrome version",
          "last 1 firefox version",
          "last 1 safari version",
        ],
    node: ["node >= 14"],
  };

  return {
    server: {
      ...options,
      publicDir: {
        name: ctg?.assetsDir,
      },
      printUrls: ({ urls }) => {
        return urls.map((url) => url);
      },
    },
    dev: {
      progressBar: false,
    },
    output: {
      targets: ["web"],
      distPath: {
        root: ctg?.buildDir,
      },
      overrideBrowserslist: browserslist,
      assetPrefix: "/",
    },
    source: {
      entry: {
        index: CLIENT_ENTRY,
      },
      include: [`${process.cwd() + "\\node_modules\\.maripose\\runtime"}`],
    },
    performance: {
      printFileSize: true,
      chunkSplit: {
        override: {
          cacheGroups: {
            styles: {
              name: "styles",
              minSize: 0,
              chunks: "all",
              test: /\.(?:css|less|sass|scss)$/,
              priority: 99,
            },
          },
        },
      },
    },
  };
};
