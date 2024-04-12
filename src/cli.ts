import { defineCommand, runMain, showUsage } from "citty";
import { version } from "../package.json";
import { createLogger } from "./utils/logger.ts";

import { devCommand } from "./commands/dev.ts";
import { buildCommand } from "./commands/build.ts";

export const logger = createLogger();

export const cliArgs = {
  root: {
    description: "Root argument",
    required: false,
    type: "string",
  },
} as any;

const main = async () => {
  const dev = devCommand(cliArgs);
  const build = buildCommand(cliArgs);
  const main = defineCommand({
    meta: {
      name: "mari",
      version,
      description: "Maripose",
    },
    subCommands: {
      dev,
      build,
    },
    run({ args }) {
      if (args._.length === 0) {
        showUsage(main);
      }
    },
  });

  await runMain(main);
};

try {
  await main();
} catch (error) {
  logger.error(error as unknown as string);
  process.exit(1);
}
