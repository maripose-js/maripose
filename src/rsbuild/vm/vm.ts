import type { RsbuildPlugin } from "@rsbuild/core";
import { RspackVirtualModulePlugin } from "rspack-plugin-virtual-module";
import { createRouter } from "../router.ts";
import type { MariposeConfig } from "../../utils/config.ts";
import { customCss } from "./custom-css.ts";

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
        for (const factory of [siteData, customCss]) {
          const moduleResult = await factory(ctx);
          Object.assign(runtimeModule, moduleResult);
        }

        bundlerChain.plugin("rspress-runtime-module").use(
          //@ts-ignore
          new RspackVirtualModulePlugin(runtimeModule, ctx.tempDir)
        );
      });
    },
  };
}

const siteData = async (ctx: VmCtx) => {
  return {
    ["virtual-site-data"]:
      ctx.router.generate() +
      `; export const siteData = ${JSON.stringify(ctx.config.site)};`,
  };
};
