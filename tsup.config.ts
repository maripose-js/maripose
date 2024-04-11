import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    client: "./src/client/client.tsx",
    server: "./src/client/server.tsx",
    loader: "./src/rsbuild/loader.ts",
    cli: "src/cli.ts",
  },
  injectStyle: true,
  minify: true,
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: false,
  splitting: false,
  external: [
    "bun",
    "react",
    "react-dom",
    "virtual-site-data",
    "tailwindcss",
    "virtual-custom-css",
    "virtual-routes",
  ],
});
