import { cn } from "../lib/utils.ts";
import React from "react";
import { type BentoGridItem as Item } from "../../utils/config.ts";
import { IconBase } from "./icons/base.tsx";

export const BentoGrid = ({ children }: { children?: React.ReactNode }) => {
  return <div className={"mp-bento-grid"}>{children}</div>;
};

export const BentoGridItem = ({
  className,
  title,
  description,
  icon,
}: Item) => {
  return (
    <div
      className={cn("mp-bento-grid-item group/bento shadow-input", className)}
    >
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <div
          className={
            "flex justify-center items-center h-12 w-12 mb-[10px] mp-mantine-body rounded-xl"
          }
        >
          <IconBase icon={icon as string} size={6} />
        </div>
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};
