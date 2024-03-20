import pc from "picocolors";

type MessageInput = string | number | null | undefined;

const prefix = (color: string) => {
  const date = new Date();
  return (
    pc.dim(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`) +
    //@ts-ignore
    ` ${pc.bold(pc[color](`[cord]`))}`
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
  };
};

const test = createLogger();
