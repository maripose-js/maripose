import { defineCommand } from "citty";
import { createDevServer } from "../server";
import { createLogger } from "../utils/logger.ts";
import {
  version as cordVersion,
  name as packageName,
} from "../../package.json";

export const devCommand = (sharedArgs: any) =>
  defineCommand({
    meta: { description: "Run the dev server" },
    args: { ...sharedArgs },
    run: async ({ args }) => {
      const { _, root, ...argv } = args;
      const colors = createLogger();
      console.log(
        `\n  ${colors.green(
          `${colors.bold(packageName.toUpperCase())}`
        )} v${cordVersion}`
      );

      try {
        await createDevServer(args);
      } catch (err) {
        console.log(err);
        colors.error(
          `Failed to start dev server: ${colors.reset(
            colors.red(colors.bold(err as string))
          )}`
        );
        process.exit(1);
      }
    },
  });
