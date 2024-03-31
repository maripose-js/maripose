import type { ProcessorOptions } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import { remarkToc } from "./toc.ts";

export const buildOptions = (config: any): ProcessorOptions => {
  return {
    providerImportSource: "@mdx-js/react",
    remarkPlugins: [
      remarkGfm,
      remarkToc,
      ...(config?.markdown?.remarkPlugins ?? []),
    ],
  };
};
