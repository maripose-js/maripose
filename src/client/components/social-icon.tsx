import type { SiteConfig } from "../../utils/config.ts";
import { Link } from "react-router-dom";
import { IconBase } from "./icons/base.tsx";
import { ActionIcon } from "./action-icon.tsx";

export const SocialIcon = ({
  icon,
}: {
  icon: SiteConfig["socialsLinks"][0];
}) => {
  return (
    <Link
      to={icon.link}
      className={"w-8 h-8 flex justify-center items-center"}
      target={"_blank"}
    >
      <ActionIcon>
        <IconBase icon={`simple-icons:${icon.icon}`} className={"!p-1"} />
      </ActionIcon>
    </Link>
  );
};
