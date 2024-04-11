import fs from "fs-extra";
import type { RspackPluginInstance, Compiler } from "@rspack/core";
import { extname, join } from "path";

export const virtualModulesPlugin = (
  modules: Record<string, string>,
  tempDir: string
): RspackPluginInstance => {
  fs.mkdirSync(tempDir, { recursive: true });

  const normalizePath = (p: string) =>
    join(tempDir, extname(p) ? p : `${p}.js`);

  return {
    apply: (compiler: Compiler) => {
      Object.entries(modules).forEach(([path, content]) => {
        fs.writeFileSync(normalizePath(path), content);
      });

      compiler.options.resolve.modules = [
        ...(compiler.options.resolve.modules || ["node_modules"]),
        tempDir,
      ];

      compiler.options.resolve.alias = {
        ...compiler.options.resolve.alias,
        ...Object.fromEntries(
          Object.keys(modules).map((p) => [p, normalizePath(p)])
        ),
      };

      process.on("exit", () => fs.removeSync(tempDir));
    },
  };
};
