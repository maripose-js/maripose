import React from "react";

export const ActionIcon = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div
      className={
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors duration-100 hover:bg-[hsl(var(--muted-foreground))]/50 p-0.5"
      }
    >
      {children}
    </div>
  );
};
