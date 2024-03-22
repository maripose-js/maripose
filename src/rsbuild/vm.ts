import type { RsbuildPlugin } from "@rsbuild/core";
import { RspackVirtualModulePlugin } from "rspack-plugin-virtual-module";
import { createRouter } from "./router.ts";
import type { SiteConfig } from "../utils/config.ts";

type Ctx = {
  tempDir: string;
  router: ReturnType<typeof createRouter>;
  mariposeConfig: Partial<SiteConfig>;
};

export function virtualModules(ctx: Ctx): RsbuildPlugin {
  return {
    name: "virtual-modules",
    setup(api) {
      api.modifyBundlerChain(async (bundlerChain) => {
        const runtimeModule: Record<string, string> = {};
        for (const factory of [siteData]) {
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

const siteData = async (ctx: Ctx) => {
  return {
    ["virtual-site-data"]:
      ctx.router.generate() +
      `; export const siteData = ${JSON.stringify(ctx.mariposeConfig)};`,
  };
};
