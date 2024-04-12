import type { ProcessorOptions } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import type { MariposeConfig } from "../../utils/config.ts";
import { remarkToc } from "./toc.ts";
import { rehypeCode } from "./code.ts";

export const buildOptions = (config: MariposeConfig): ProcessorOptions => {
  return {
    providerImportSource: "@mdx-js/react",
    rehypePlugins: [
      ...(config?.markdown?.rehypePlugins ?? []),
      // [rehypeShiki, config.site?.codeHighlighting],
      [rehypeCode, config.site?.codeHighlighting],
    ],
    remarkPlugins: [
      remarkGfm,
      remarkToc,
      ...(config?.markdown?.remarkPlugins ?? []),
    ],
  };
};
