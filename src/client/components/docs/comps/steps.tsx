import React, { type ReactNode } from "react";
import { cn } from "@/lib/utils.ts";
import { Text, Title } from "@mantine/core";

export const Step = ({
  children,
  className,
  title,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
}) => {
  return (
    <div className={cn("flex flex-col gap-1 ml-2", className)}>
      <Title order={4}>{title}</Title>
      <div className={"[&>p]:!py-0"}>{children}</div>
    </div>
  );
};

export const Steps = ({
  children,
  className,
}: {
  children: ReactNode[];
  className?: string;
}) => {
  return (
    <div className={cn("my-4 flex flex-col relative gap-5 w-full", className)}>
      {children.map((child, index) => (
        <div className={"relative flex flex-row w-full"}>
          <div
            className={
              "bg-[var(--mantine-color-default-hover)] rounded-full h-10 w-10 text-white text-sm font-semibold flex items-center justify-center z-10"
            }
          >
            {index + 1}
          </div>
          {child}
        </div>
      ))}
      <div className="flex-shrink-0 h-full absolute top-0 w-[2px] start-[20px] bg-[var(--mantine-color-default-hover)] z-[9]" />
    </div>
  );
};
