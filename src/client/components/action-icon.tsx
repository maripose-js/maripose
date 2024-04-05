import React from "react";

export const ActionIcon = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors duration-100 hover:bg-[hsl(var(--muted-foreground))]/50 cursor-pointer p-0.5 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
