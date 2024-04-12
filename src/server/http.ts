import type { MariposeInstance } from "../context.ts";

export type ServerOptions = {
  port?: number;

  /**
   * Open browser on server start
   */
  open?: boolean;

  /**
   * Hostname to listen on
   */
  hostname?: string;
};

export const getServerOptions = async (ctx: MariposeInstance) => {
  const options = ctx.config?.server;

  try {
    return {
      port: options?.port ?? 3001,
      hostname: options?.hostname ?? "localhost",
      open: options?.open,
    };
  } catch (error) {
    ctx.logger.error(`Failed to start http server ${error}`);
    await ctx.hooks.callHook("close", {});
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  }
};
