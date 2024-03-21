//https://github.com/web-infra-dev/rsbuild/tree/main/packages/plugin-mdx

import type { RsbuildPlugin } from "@rsbuild/core";
import type { MariposeConfig } from "../utils/config.ts";

function createRegExp(exts: string[]): RegExp {
  const matcher = exts.map((ext) => ext.slice(1)).join("|");
  return new RegExp(
    exts.length === 1 ? `\\.${matcher}$` : `\\.(?:${matcher})$`,
    "i"
  );
}

export const pluginMdx = (config: MariposeConfig): RsbuildPlugin => ({
  name: "rsbuild:mdx",

  setup(api) {
    api.modifyBundlerChain((chain, { CHAIN_ID }) => {
      const extensions = [".mdx", ".md"];

      for (const ext of extensions) {
        chain.resolve.extensions.add(ext);
      }

      const jsRule = chain.module.rules.get(CHAIN_ID.RULE.JS);
      const mdxRule = chain.module.rule("mdx");

      [CHAIN_ID.USE.SWC, CHAIN_ID.USE.BABEL].some((id) => {
        const use = jsRule.uses.get(id);

        if (use) {
          mdxRule.use(id).loader(use.get("loader")).options(use.get("options"));
          return true;
        }

        return false;
      });

      const MDX_REGEXP = createRegExp(extensions);

      mdxRule
        .test(MDX_REGEXP)
        .use("mdx")
        .loader(require.resolve("../../loader.cjs"))
        .options(config);

      // support for React fast refresh
      const { REACT_FAST_REFRESH } = CHAIN_ID.PLUGIN;
      if (chain.plugins.has(REACT_FAST_REFRESH)) {
        chain.plugins.get(REACT_FAST_REFRESH).tap((options) => {
          const firstOption = options[0] ?? {};
          firstOption.include = [...(firstOption.include || []), MDX_REGEXP];
          options[0] = firstOption;
          return options;
        });
      }
    });
  },
});
