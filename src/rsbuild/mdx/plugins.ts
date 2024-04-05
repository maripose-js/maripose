import type { ProcessorOptions } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import { remarkToc } from "./toc.ts";
import rehypeShiki from "@shikijs/rehype";
import type { MariposeConfig } from "../../utils/config.ts";

export const buildOptions = (config: MariposeConfig): ProcessorOptions => {
  return {
    providerImportSource: "@mdx-js/react",
    rehypePlugins: [
      ...(config?.markdown?.rehypePlugins ?? []),
      [rehypeShiki, config.site?.codeHighlighting],
    ],
    remarkPlugins: [
      remarkGfm,
      remarkToc,
      ...(config?.markdown?.remarkPlugins ?? []),
    ],
  };
};
