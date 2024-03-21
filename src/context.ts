import { createHooks, Hookable } from "hookable";
import { createLogger } from "./utils/logger.ts";
import { type MariposeConfig, resolveConfig } from "./utils/config.ts";

type HookResult = void | Promise<void>;

export interface MariposeHooks {
  close: (server: any | null) => HookResult;
  restart: () => HookResult;
}

export interface MariposeInstance {
  hooks: Hookable<MariposeHooks>;
  logger: ReturnType<typeof createLogger>;
  config: MariposeConfig | undefined;
}

export const createContext = async (
  root: string,
  cmd: "dev" | "build"
): Promise<MariposeInstance> => {
  const ctx: MariposeInstance = {
    hooks: createHooks(),
    logger: createLogger(),
    config: undefined,
  };

  ctx.config = await resolveConfig(root ?? process.cwd(), ctx, cmd);

  return ctx;
};
