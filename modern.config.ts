import { moduleTools, defineConfig } from "@modern-js/module-tools";
import { createRequire } from "module";
import tailwindConfig from "./tailwind.config";
import path from "path";

const require = createRequire(import.meta.url);
const tailwindPlugin = require("@modern-js/plugin-tailwindcss").default;

export default defineConfig({
  plugins: [tailwindPlugin(), moduleTools()],
  testing: {
    transformer: "ts-jest",
  },
  buildConfig: [
    {
      input: {
        cli: "src/cli.ts",
      },
      buildType: "bundle",
      format: "esm",
      target: "esnext",
      outDir: "dist",
      sourceMap: true,
      externals: ["bun", "react", "react-dom", "virtual-site-data"],
    },
    {
      input: {
        loader: "./src/rsbuild/loader.ts",
      },
      buildType: "bundle",
      format: "esm",
      target: "es2020",
      outDir: "dist",
      sourceMap: true,
      externals: ["bun", "react", "react-dom", "virtual-site-data"],
    },
    {
      input: {
        client: "./src/client/client.tsx",
      },
      buildType: "bundle",
      format: "esm",
      target: "es2020",
      outDir: "dist/client",
      sourceMap: true,
      banner: {
        js: "import './client.css';",
      },
      externals: [
        "bun",
        "react",
        "react-dom",
        "virtual-site-data",
        "tailwindcss",
      ],
      style: {
        tailwindcss: { ...tailwindConfig },
        modules: {
          localsConvention: "camelCase",
          generateScopedName(name, filename) {
            const relative = path
              .relative(__dirname, filename)
              .replace(/\\/g, "/");
            const hash = crypto
              // @ts-ignore
              .createHash("sha256")
              .update(relative)
              .digest("hex")
              .slice(0, 5);
            return `${name}_${hash}`;
          },
        },
      },
    },
  ],
});
