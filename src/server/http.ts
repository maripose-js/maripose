import { getPort } from "get-port-please";
import type { CordInstance } from "../context.ts";
import { isPortAvailable } from "../utils/port.ts";

export type ServerOptions = {
  port?: number;

  /**
   * Exits if port is already in use
   */
  strictPort?: boolean;

  /**
   * Open browser on server start
   */
  open?: boolean;

  /**
   * Hostname to listen on
   */
  hostname?: string;
};

export const getServerOptions = async (ctx: CordInstance) => {
  const options = ctx.config?.server;

  if (
    options?.strictPort &&
    !(await isPortAvailable(options?.port ?? 3001, options?.hostname))
  ) {
    ctx.logger.error(
      `Cordelius exited because port ${options.port} is already in use and strictPort is enabled`
    );
    process.exit(1);
  }

  const port = await getPort({ port: options?.port });

  try {
    return {
      port,
      hostname: options?.hostname ?? "localhost",
      open: options?.open,
    };
  } catch (err) {
    ctx.logger.error(`Failed to start http server ${err}`);
    await ctx.hooks.callHook("close", {});
    process.exit(1);
  }
};
