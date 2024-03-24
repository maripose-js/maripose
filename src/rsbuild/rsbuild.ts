import type { MariposeInstance } from "../context.ts";
import type { RsbuildConfig } from "@rsbuild/core";
import type { ServerOptions } from "../server/http.ts";
import type { MariposeConfig } from "../utils/config.ts";
import path from "path";
import { fileURLToPath } from "url";
import { virtualModules } from "./vm/vm.ts";
import { createRouter } from "./router.ts";

const dirname = path.dirname(fileURLToPath(new URL(import.meta.url)));

const isProduction = process.env.NODE_ENV === "production";

export const PACKAGE_ROOT = path.join(dirname, "../..");
export const CLIENT_ENTRY = path.join(
  PACKAGE_ROOT,
  "dist",
  "client",
  "client.js"
);

export const SERVER_ENTRY = path.join(
  PACKAGE_ROOT,
  "dist",
  "client",
  "server.js"
);

export const rsBuildInstance = async (
  ctx: MariposeInstance,
  options: ServerOptions,
  buildOptions?: RsbuildConfig
) => {
  const {
    default: { createRsbuild, mergeRsbuildConfig },
  } = await import("@rsbuild/core");
  const { pluginReact } = await import("@rsbuild/plugin-react");
  const routesDir = path.join(ctx.config?.root!, "src");
  const router = createRouter(routesDir, ctx);

  await router.init();

  const rsBuildConfig = await createRsbuildConfig(
    ctx.config!,
    options,
    buildOptions
  );
  const rsbuild = await createRsbuild({
    rsbuildConfig: mergeRsbuildConfig(
      buildOptions ?? {},
      rsBuildConfig,
      ctx.config?.rsbuild!
    ),
  });

  rsbuild.addPlugins([
    virtualModules({
      tempDir: ".maripose/runtime",
      router,
      config: ctx.config!,
    }),
    pluginReact(),
  ]);
  return rsbuild;
};

export const createRsbuildConfig = async (
  ctg: MariposeConfig,
  options: ServerOptions,
  buildOptions: RsbuildConfig = {}
): Promise<RsbuildConfig> => {
  const isSsr = buildOptions.output?.distPath?.["server"] !== undefined;
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

  const MDX_REGEXP = /\.(md|mdx)$/i;
  return {
    tools: {
      bundlerChain(chain, { CHAIN_ID }) {
        const jsModuleRule = chain.module.rule(CHAIN_ID.RULE.JS);

        const swcLoaderOptions = jsModuleRule
          .use(CHAIN_ID.USE.SWC)
          .get("options");

        chain.module
          .rule("MDX")
          .type("javascript/auto")
          .test(MDX_REGEXP)
          .resolve.merge({
            conditionNames: jsModuleRule.resolve.get("conditionNames"),
            mainFields: jsModuleRule.resolve.mainFields.values(),
          })
          .end()
          .oneOf("MDXCompile")
          .use("builtin:swc-loader")
          .loader("builtin:swc-loader")
          .options(swcLoaderOptions)
          .end()
          .use("mdx-loader")
          .loader(require.resolve("../../loader.cjs"))
          .options(ctg);

        if (chain.plugins.has(CHAIN_ID.PLUGIN.REACT_FAST_REFRESH)) {
          chain.plugin(CHAIN_ID.PLUGIN.REACT_FAST_REFRESH).tap((options) => {
            options[0] ??= {};
            options[0].include = [/\.([cm]js|[jt]sx?|flow)$/i, MDX_REGEXP];
            return options;
          });
        }

        chain.resolve.extensions.prepend(".md").prepend(".mdx").prepend(".mjs");
      },
      rspack: {
        mode: "development",
        optimization: {
          sideEffects: false,
          moduleIds: "named",
          minimize: !isSsr,
        },
      },
    },
    server: {
      ...options,
      publicDir: {
        name: ctg?.publicDir,
      },
      printUrls: ({ urls }) => {
        return urls.map((url) => url);
      },
    },
    html: {
      title: ctg?.site?.title,
      template: path.join(PACKAGE_ROOT, "index.html"),
    },
    dev: {
      progressBar: false,
      startUrl: true,
    },
    output: {
      targets: isSsr ? ["node"] : ["web"],
      distPath: {
        root: ctg?.buildDir,
      },
      overrideBrowserslist: browserslist,
      assetPrefix: "/",
    },
    source: {
      entry: {
        index: isSsr ? SERVER_ENTRY : CLIENT_ENTRY,
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
          chunks: "all",
          minSize: 30000,
        },
        strategy: "split-by-experience",
        forceSplitting: {
          mantine: /node_modules[\\/]@mantine/,
        },
      },
    },
  };
};
