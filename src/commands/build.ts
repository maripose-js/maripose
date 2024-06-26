import path from "node:path";
import { defineCommand } from "citty";
import { log, intro, outro } from "@clack/prompts";
import fs from "fs-extra";
import pc from "picocolors";
import { createLogger } from "../utils/logger.ts";
import { createContext } from "../context.ts";
import { getServerOptions } from "../server/http.ts";
import { rsBuildInstance } from "../rsbuild/rsbuild.ts";
import { createRouter } from "../rsbuild/router.ts";
import { formatBytes, formatTime } from "../utils/helpers.ts";
import type { PageData } from "@/app.tsx";

const originalConsoleLog = console.log;

export const buildCommand = (sharedArgs: any) =>
  defineCommand({
    meta: { description: "Create production build" },
    args: { ...sharedArgs },
    run: async ({ args }) => {
      const { _, root, ...argv } = args;
      const colors = createLogger();
      const startTime = Date.now();
      intro("📦 Creating production build...");
      try {
        const ctx = await createContext(args.root, "build");
        const options = await getServerOptions(ctx);

        await fs.emptydir(ctx.config!.buildDir!);

        // remove console output
        console.log = function (msg: string): void {};

        const [client, server] = await Promise.all([
          await rsBuildInstance(ctx, options),
          await rsBuildInstance(ctx, options, {
            output: {
              distPath: {
                server: "server",
              },
              minify: false,
            },
          }),
        ]);
        await Promise.all([client.build(), server.build()]);

        // restore console output
        console.log = originalConsoleLog;

        const serverDir = path.join(
          ctx.config!.buildDir!,
          "server",
          "index.js",
        );

        const { default: exports } = await import(serverDir);

        const render = exports.render as {
          (pathname: string): Promise<{ html: string; data: PageData }>;
        };
        const routesDir = path.join(ctx.config?.root as string, "src");
        const router = createRouter(routesDir, ctx);

        await router.init();
        const routes = router.routes;

        await Promise.all(
          routes.map(async (route) => {
            try {
              const htmlTemplate = await fs.readFile(
                path.join(ctx.config?.buildDir as string, "index.html"),
              );

              const { html, data } = await render(route.route);

              const page = htmlTemplate
                .toString()
                .replace("<!--__INJECT_BODY__-->", html);

              const fileName =
                (route.route === "/" ? "index" : route.route) + ".html";

              await fs.outputFile(
                path.join(ctx.config?.buildDir as string, fileName),
                page,
              );

              const size = Buffer.byteLength(page, "utf8");

              log.step(
                `Generated ${pc.reset(pc.bold(route.route))} ${pc.dim(
                  "route",
                )} (${pc.green(formatBytes(size))})`,
              );
            } catch (error) {
              console.log(error);
              ctx.logger.error(`Failed to generate ${route.route} route`);
            }
          }),
        );

        await fs.remove(path.join(ctx.config!.buildDir!, "server"));
        await fs.remove(
          path.join(ctx.config!.buildDir!, "static", "js", "async"),
        );

        log.success(
          `🎉 Production build created in ${pc.green(
            formatTime(Date.now() - startTime),
          )}`,
        );
        outro();
      } catch (error) {
        console.log(error);
        colors.error(
          `Failed to create production build: ${colors.reset(
            colors.red(colors.bold(error as string)),
          )}`,
        );
        process.exit(1);
      }
    },
  });
