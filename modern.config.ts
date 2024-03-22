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
      minify: "esbuild",
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
      minify: "terser",
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
      minify: "terser",
      banner: {
        js: `import './client.css';`,
      },
      externals: [
        "bun",
        "react",
        "react-dom",
        "virtual-site-data",
        "tailwindcss",
        "virtual-custom-css",
      ],
      style: {
        tailwindcss: { ...tailwindConfig },
      },
    },
  ],
});
