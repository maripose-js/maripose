import type { IconType } from "../../utils/config.ts";
import { IconBase } from "#/icons/base.tsx";

export const useIcon = (icon: IconType | undefined) => {
  if (!icon) {
    return null;
  }

  return typeof icon === "string" ? (
    <IconBase icon={icon} />
  ) : (
    <IconBase icon={icon.icon} size={icon.size} />
  );
};
