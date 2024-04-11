import pc from "picocolors";
import { logger } from "@rsbuild/core";

export const createLogger = () => {
  return {
    ...pc,
    ...logger,
  };
};
