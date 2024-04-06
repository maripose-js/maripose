import { IconBase } from "../../icons/base.tsx";
import React from "react";
import colors from "tailwindcss/colors";
import { type ColorKey, hexToRgb } from "@/lib/color.ts";

export type CalloutType =
  | "tip"
  | "warning"
  | "success"
  | "error"
  | "info"
  | "link";

const calloutConfig = {
  tip: { icon: "tabler:bulb", color: "lime" },
  info: { icon: "tabler:info-circle", color: "sky" },
  warning: { icon: "tabler:alert-triangle", color: "yellow" },
  success: { icon: "tabler:check", color: "emerald" },
  error: { icon: "tabler:alert-circle", color: "red" },
  link: { icon: "tabler:link", color: "blue" },
};

export const Callout = ({
  type,
  children,
  link,
  icon,
}: {
  type: CalloutType;
  children: React.ReactNode;
  link?: string;
  icon?: string;
}) => {
  const colorKey = calloutConfig[type].color as ColorKey;
  const isLink = link !== undefined && type === "link";
  const style = {
    "--mp-callout-light-bg": hexToRgb(colorKey, "50", 50),
    "--mp-callout-light-border": hexToRgb(colorKey, "500", 20),
    "--mp-callout-dark-bg": hexToRgb(colorKey, "500", 10),
    "--mp-callout-dark-border": hexToRgb(colorKey, "500", 30),
    "--mp-text-color": colors?.[colorKey][900],
    "--mp-text-dark-color": colors?.[colorKey][200],
    "--mp-link-color": colors?.[colorKey][500],
  } as React.CSSProperties;

  return (
    <div
      className={`mp-callout-${type} overflow-hidden border pl-4 pr-6 py-3 my-5 last:mb-0 rounded-xl bg-[var(--mp-callout-light-bg)] dark:bg-[var(--mp-callout-dark-bg)] ${
        isLink
          ? "border-dashed cursor-pointer mp-mantine-border hover:dark:border-[var(--mp-callout-dark-border)] hover:border-[var(--mp-callout-light-border)] hover:border-solid"
          : "dark:border-[var(--mp-callout-dark-border)] border-[var(--mp-callout-light-border)]"
      }`}
      style={style}
    >
      <div className={`flex flex-row items-center gap-2 prose font-semibold`}>
        <IconBase
          icon={icon ? icon : calloutConfig[type].icon}
          size={6}
          className={`text-[var(--mp-text-color)] dark:text-[var(--mp-text-dark-color)]`}
        />
        <div className={"[&>p]:!py-0"}>{children}</div>
      </div>
    </div>
  );
};
