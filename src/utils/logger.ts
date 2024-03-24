import pc from "picocolors";

type MessageInput = string | number | null | undefined;

const prefix = (color: string) => {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return (
    pc.dim(`${hours}:${minutes}:${seconds}`) +
    //@ts-ignore
    ` ${pc.bold(pc[color](`[maripose]`))}`
  );
};

export const createLogger = () => {
  return {
    ...pc,
    log: (message: MessageInput) =>
      console.log(`${prefix("yellow")} ${pc.dim(message)}`),
    error: (message: MessageInput) =>
      console.error(`${prefix("red")} ${pc.dim(message)}`),
    info: (message: MessageInput) =>
      console.info(`${prefix("cyan")} ${pc.dim(message)}`),
    success: (message: MessageInput) =>
      console.log(`${prefix("green")} ${pc.dim(message)}`),
  };
};

const test = createLogger();
