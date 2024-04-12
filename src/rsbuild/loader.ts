import { type Rspack } from "@rsbuild/core";
import grayMatter from "gray-matter";
import { createProcessor } from "@mdx-js/mdx";
import type { MariposeConfig } from "../utils/config.ts";
import { buildOptions } from "./mdx/plugins.ts";

export default async function mdxLoader(
  context: Rspack.LoaderContext<any>,
  source: string,
  callback: Rspack.LoaderContext["callback"],
) {
  try {
    const options = context.getOptions() as MariposeConfig;
    const filePath = context.resourcePath;
    const { data, content } = grayMatter(source);

    const compiler = createProcessor(buildOptions(options));

    const vFile = await compiler.process({
      value: content,
      path: filePath,
    });

    const code = String(vFile);
    // @ts-ignore
    const meta = compiler.data("meta");

    const pagedata = {
      ...meta,
      ...data,
    };

    const result = `const frontmatter = ${JSON.stringify(data)};
${code}
MDXContent.__PAGE_META__ = {};

MDXContent.__PAGE_META__["${encodeURIComponent(filePath)}"] = ${JSON.stringify(
      pagedata,
    )};
`;

    callback(null, result);
  } catch (error) {
    console.log(error);
    return callback(new Error("Failed to parse frontmatter"));
  }
}
