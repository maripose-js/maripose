import type { RsbuildPlugin } from "@rsbuild/core";
import { createRouter } from "../router.ts";
import type { MariposeConfig } from "../../utils/config.ts";
import { customCss } from "./custom-css.ts";
import { virtualModulesPlugin } from "./plugin.ts";

export type VmCtx = {
  tempDir: string;
  router: ReturnType<typeof createRouter>;
  config: MariposeConfig;
};

export function virtualModules(ctx: VmCtx): RsbuildPlugin {
  return {
    name: "virtual-modules",
    setup(api) {
      api.modifyBundlerChain(async (bundlerChain) => {
        const runtimeModule: Record<string, string> = {};
        for (const factory of [siteData, customCss, routes]) {
          const moduleResult = await factory(ctx);
          Object.assign(runtimeModule, moduleResult);
        }

        bundlerChain
          .plugin("virtual-modules")
          .use(virtualModulesPlugin(runtimeModule, ctx.tempDir));
      });
    },
  };
}

const siteData = (ctx: VmCtx) => {
  return {
    "virtual-site-data": `export const siteData = ${JSON.stringify(
      ctx.config.site,
    )};`,
  };
};

const routes = (ctx: VmCtx) => {
  return {
    "virtual-routes": ctx.router.generate(),
  };
};
