import { SocialIcon } from "./social-icon.tsx";
import { siteData } from "virtual-site-data";
import type { SocialLink } from "../../utils/config.ts";
import { Text } from "@mantine/core";

export const Footer = () => {
  const socialsLinks = siteData.socialsLinks as SocialLink[];

  const fallbackText = `Copyright © ${new Date().getFullYear()} ${
    siteData.title
  }`;
  return (
    <footer className="mp-footer">
      <Text fw={500} className={"!text-[14px]"}>
        {siteData.footer.text || fallbackText}
      </Text>
      {siteData.footer.socials && socialsLinks.length > 0 ? (
        <div className={"mp-navbar-social-links"}>
          {socialsLinks.map((icon, index) => (
            <SocialIcon icon={icon} key={index} />
          ))}
        </div>
      ) : null}
    </footer>
  );
};
