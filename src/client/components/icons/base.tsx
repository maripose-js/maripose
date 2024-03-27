import React, { type ComponentProps } from "react";
import { Icon } from "@iconify-icon/react";

export type IconProps = ComponentProps<typeof Icon> & {
  size?: keyof typeof sizes;
};

const sizes = {
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  7: "28px",
  8: "32px",
  14: "56px",
};

export const IconBase = ({
  size = 5,
  className,
  name,
  ...props
}: IconProps) => {
  const { mode, ...rest } = props;
  return (
    <Icon
      className={className}
      {...rest}
      style={{ fontSize: sizes[size], ...rest.style }}
    />
  );
};
