import { IconBase } from "../../icons/base.tsx";
import React from "react";
import colors from "tailwindcss/colors";

export type CalloutType = "tip" | "warning" | "success" | "error" | "info";

const calloutConfig: Record<
  CalloutType,
  {
    icon: string;
    color: string;
  }
> = {
  tip: {
    icon: "tabler:bulb",
    color: "lime",
  },
  info: {
    icon: "tabler:info-circle",
    color: "sky",
  },
  warning: {
    icon: "tabler:alert-triangle",
    color: "yellow",
  },
  success: {
    icon: "tabler:check",
    color: "green",
  },
  error: {
    icon: "tabler:alert-circle",
    color: "red",
  },
};

export const Callout = ({
  type,
  children,
}: {
  type: CalloutType;
  children: React.ReactNode;
}) => {
  const color = calloutConfig[type].color;
  console.log(colors?.[color as keyof typeof colors][500], colors);
  return (
    <div
      className={`mp-callout-${type} overflow-hidden border border-${color}-500/20 my-4 px-5 py-4 rounded-xl bg-${color}-50/50 dark:border-${color}-500/30 dark:bg-${color}-500/10`}
    >
      <div
        className={`flex flex-row items-center gap-2 prose font-semibold`}
        style={
          {
            "--mp-link-color": colors?.[color as keyof typeof colors][500],
          } as React.CSSProperties
        }
      >
        <IconBase
          icon={calloutConfig[type].icon}
          size={6}
          className={`text-${color}-900 dark:text-${color}-200`}
        />
        <div className={"[&>p]:!py-0"}>{children}</div>
      </div>
    </div>
  );
};
