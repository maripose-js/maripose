import React from "react";
import { Kbd as MantineKbd } from "@mantine/core";

type KbdProps = {
  children?: React.ReactNode;
  values?: string[];
  separator?: string;
  meta?: boolean;
};

export const Kbd = ({ children, values, separator, meta }: KbdProps) => {
  const metaKey =
    meta && !children
      ? navigator.platform.includes("Mac")
        ? "⌘"
        : "Ctrl"
      : null;
  const childrenArray = [metaKey, ...(values ?? [])];

  return (
    <div className="my-2.5 mx-1.5">
      {children ? (
        <kbd className="px-1 py-[3px] mp-default-color-bg mp-mantine-border border border-b-[3px] rounded-lg mp-mantine-text leading-none break-words break-spaces inline !text-sm [&>p]:!py-0">
          {children}
        </kbd>
      ) : (
        <div
          className={`flex flex-row items-center ${!separator ? "gap-1" : ""}`}
        >
          {childrenArray.map((value, index) => (
            <React.Fragment key={index}>
              <kbd className="px-1 py-[3px] mp-default-color-bg mp-mantine-border border border-b-[3px] rounded-lg mp-mantine-text leading-none break-words break-spaces inline !text-sm [&>p]:!py-0">
                {value}
              </kbd>
              {index !== childrenArray.length - 1 && separator && (
                <p className="mx-1">{separator}</p>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
