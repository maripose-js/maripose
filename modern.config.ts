import { moduleTools, defineConfig } from "@modern-js/module-tools";

export default defineConfig({
  plugins: [moduleTools()],
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
      externals: ["bun", "react", "react-dom", "virtual-site-data"],
    },
  ],
});
