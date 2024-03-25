import type { NavLink } from "../../utils/config.ts";
import { Text } from "@mantine/core";

export const NavbarLink = ({
  link,
  border = false,
  collapsed = false,
}: {
  link: NavLink;
  border: boolean;
  collapsed: boolean;
}) => {
  return (
    <a
      className={`mp-nav-link ${
        border ? "mp-nav-link-border" : "mp-nav-link-borderless"
      } ${collapsed ? "" : "mp-nav-link-not-collapsed"}`}
      href={link.link}
      target={link.target}
      rel={link.rel}
    >
      <Text>{link.text}</Text>
    </a>
  );
};
