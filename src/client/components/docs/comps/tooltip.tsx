import { Tooltip as MantineTooltip } from "@mantine/core";
import React from "react";

export const Tooltip = ({ children }: { children: React.ReactNode }) => {
  return <MantineTooltip label="Tooltip">{children}</MantineTooltip>;
};
