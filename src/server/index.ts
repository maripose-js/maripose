import { createContext } from "../context.ts";
import { resolveWatcherOptions } from "../watch.ts";
import { getServerOptions } from "./http.ts";
import chokidar from "chokidar";
import { rsBuildInstance } from "../rsbuild/rsbuild.ts";

export const createDevServer = async (args: any) => {
  const createServer = async () => {
    const ctx = await createContext(args.root, "dev");
    const watcherOptions = resolveWatcherOptions(ctx.config);
    const options = await getServerOptions(ctx);
    const builder = await rsBuildInstance(ctx, options);

    const watcher = chokidar.watch(
      [ctx.config?.root || "", ctx.config?.publicDir || ""],
      watcherOptions
    );

    const { server } = await builder.startDevServer();
    watcher.on("all", async (action, path) => {
      if (path.includes("maripose.")) {
        ctx.logger.info(`updated config file: ${path}`);
        await ctx.hooks.callHook("restart");
      }
    });

    ctx.hooks.addHooks({
      restart: async () => {
        await ctx.hooks.callHook("close", server);
        await createServer();
      },
      close: async (server) => {
        server !== null && (await server.close());
        await watcher.close();
      },
    });
  };

  await createServer();
};
