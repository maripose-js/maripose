import { extname, join } from "node:path";
import fs from "fs-extra";
import type { RspackPluginInstance, Compiler } from "@rspack/core";

export const virtualModulesPlugin = (
  modules: Record<string, string>,
  tempDir: string,
): RspackPluginInstance => {
  fs.mkdirSync(tempDir, { recursive: true });

  const normalizePath = (p: string) =>
    join(tempDir, extname(p) ? p : `${p}.js`);

  return {
    apply: (compiler: Compiler) => {
      for (const [path, content] of Object.entries(modules)) {
        fs.writeFileSync(normalizePath(path), content);
      }

      compiler.options.resolve.modules = [
        ...(compiler.options.resolve.modules || ["node_modules"]),
        tempDir,
      ];

      compiler.options.resolve.alias = {
        ...compiler.options.resolve.alias,
        ...Object.fromEntries(
          Object.keys(modules).map((p) => [p, normalizePath(p)]),
        ),
      };

      process.on("exit", () => fs.removeSync(tempDir));
    },
  };
};
