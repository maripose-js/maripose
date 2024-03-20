import { createHooks, Hookable } from "hookable";
import { createLogger } from "./utils/logger.ts";
import { type CordConfig, resolveConfig } from "./utils/config.ts";

type HookResult = void | Promise<void>;

export interface CordHooks {
  close: (server: any | null) => HookResult;
  restart: () => HookResult;
}

export interface CordInstance {
  hooks: Hookable<CordHooks>;
  logger: ReturnType<typeof createLogger>;
  config: CordConfig | undefined;
}

export const createContext = async (
  root: string,
  cmd: "dev" | "build"
): Promise<CordInstance> => {
  const ctx: CordInstance = {
    hooks: createHooks(),
    logger: createLogger(),
    config: undefined,
  };

  ctx.config = await resolveConfig(root ?? process.cwd(), ctx, cmd);

  return ctx;
};
