import type { Rspack } from "@rsbuild/core";
import grayMatter from "gray-matter";
import path from "path";
import { createProcessor } from "@mdx-js/mdx";
import { buildOptions } from "./mdx/plugins.ts";

export default async function mdxLoader(
  context: Rspack.LoaderContext<any>,
  source: string,
  callback: Rspack.LoaderContext["callback"]
) {
  try {
    const options = context.getOptions();
    const filePath = context.resourcePath;
    const { data, content } = grayMatter(source);

    const compiler = createProcessor(buildOptions(options));

    const vFile = await compiler.process({
      value: content,
      path: filePath,
    });

    const code = String(vFile);
    //@ts-ignore
    const meta = compiler.data("meta");

    const result = `const frontmatter = ${JSON.stringify(data)};
${code}
MDXContent.__PAGE_META__ = {};

MDXContent.__PAGE_META__["${encodeURIComponent(filePath)}"] = ${JSON.stringify({
      ...meta,
      ...data,
    })};
`;

    callback(null, result);
  } catch (err) {
    console.log(err);
    return callback(new Error("Failed to parse frontmatter"));
  }
}
