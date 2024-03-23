import { defineCommand } from "citty";
import { createLogger } from "../utils/logger.ts";
import {
  version as cordVersion,
  name as packageName,
} from "../../package.json";
import { createContext } from "../context.ts";
import { getServerOptions } from "../server/http.ts";
import { rsBuildInstance } from "../rsbuild/dev.ts";
import fs from "fs-extra";

export const buildCommand = (sharedArgs: any) =>
  defineCommand({
    meta: { description: "Create production build" },
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
        const ctx = await createContext(args.root, "build");
        const options = await getServerOptions(ctx);
        const builder = await rsBuildInstance(ctx, options);

        await fs.emptydir(ctx.config!.buildDir!);

        await builder.build();
      } catch (err) {
        console.log(err);
        colors.error(
          `Failed to create production build: ${colors.reset(
            colors.red(colors.bold(err as string))
          )}`
        );
        process.exit(1);
      }
    },
  });
