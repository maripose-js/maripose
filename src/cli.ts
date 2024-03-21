import {
  type ArgsDef,
  defineCommand,
  type Resolvable,
  runMain,
  showUsage,
} from "citty";
import { version } from "../package.json";
import { createLogger } from "./utils/logger.ts";

export const logger = createLogger();

export const cliArgs = {
  root: {
    description: "Root argument",
    required: false,
    type: "string",
  },
} as any;

import { devCommand } from "./commands/dev.ts";

const main = async () => {
  const dev = devCommand(cliArgs);
  const main = defineCommand({
    meta: {
      name: "mari",
      version: version,
      description: "Maripose",
    },
    subCommands: {
      dev,
    },
    run({ args }) {
      if (args._.length < 1) {
        showUsage(main);
      }
    },
  });

  await runMain(main);
};

try {
  await main();
} catch (err) {
  logger.error(err as unknown as string);
  process.exit(1);
}
