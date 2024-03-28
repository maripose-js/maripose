import type { IconType } from "../../utils/config.ts";
import { IconBase } from "../components/icons/base.tsx";

export const useIcon = (icon: IconType | undefined) => {
  if (!icon) return null;

  if (typeof icon === "string") {
    return <IconBase icon={icon} />;
  } else {
    return <IconBase icon={icon.icon} size={icon.size} />;
  }
};
