import type { WatchOptions } from "chokidar";
import type { MariposeConfig } from "./utils/config.ts";

export const globby_ignore = [
  /(^|[\/\\])\../,
  "**/.git/**",
  "**/node_modules/**",
];
export const resolveWatcherOptions = (
  config: MariposeConfig | undefined
): WatchOptions => {
  const options = config?.watch || {};
  const { ignored, ...rest } = options;
  const ignoredFiles: WatchOptions["ignored"] = [
    ...globby_ignore,
    //TODO: Fix this
    // ...((config?.buildDir ? config?.buildDir + "/**" : []) as any),
  ];

  if (ignored) {
    const ignoredFilesArray = Array.isArray(ignored) ? ignored : [ignored];

    ignoredFiles.push(...ignoredFilesArray);
  }

  return {
    ignored: ignoredFiles,
    ignoreInitial: true,
    ignorePermissionErrors: true,
    ...rest,
  };
};
