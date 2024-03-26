import { siteData } from "virtual-site-data";
import {
  ActionIcon,
  Burger,
  useMantineColorScheme,
  Group,
  Text,
  Box,
  Divider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { NavLink } from "../../utils/config.ts";
import { NavbarLink } from "./nav-link.tsx";
import { ThemeSwitch } from "./theme-switch.tsx";
import { SocialIcon } from "./social-icon.tsx";

export const Navbar = () => {
  const { logo } = siteData;
  const navbarLinks: NavLink[] = siteData.navbarLinks;
  const socialsLinks = siteData.socialsLinks as {
    icon: string;
    link: string;
  }[];
  const { colorScheme } = useMantineColorScheme();
  const [opened, { toggle }] = useDisclosure();
  return (
    <>
      <header className="mp-app-header">
        <nav className="mp-app-navbar">
          <div className="mp-navbar-inner">
            <a
              className="mp-navbar-logo"
              href={logo.href ? logo.href : "/"}
              target={logo.target ? logo.target : "_self"}
            >
              <img
                className="mp-logo-image"
                src={colorScheme === "dark" ? logo.dark : logo.light}
                alt={logo.alt}
              />
              <Text>{logo.text}</Text>
            </a>
            <div className={"flex flex-row gap-2 justify-between items-center"}>
              <div className={"mp-navbar-links"}>
                {navbarLinks.map((link, index) => (
                  <NavbarLink
                    link={link}
                    key={index}
                    border={false}
                    collapsed={false}
                  />
                ))}
              </div>
              <Divider
                orientation="vertical"
                className={"!h-6 !self-center hidden sm:block"}
              />
              <ThemeSwitch />
              <div className="sm:hidden">
                <ActionIcon variant="default" size="lg">
                  <Burger
                    opened={opened}
                    onClick={toggle}
                    aria-label="Toggle navigation"
                    size={"sm"}
                  />
                </ActionIcon>
              </div>
              {socialsLinks.length > 0 ? (
                <Divider
                  orientation="vertical"
                  className={"!h-6 !self-center hidden sm:block"}
                />
              ) : null}

              <div className={"mp-navbar-social-links"}>
                {socialsLinks.map((icon, index) => (
                  <SocialIcon icon={icon} key={index} />
                ))}
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div
        className={`mp-collapse-box ${
          opened ? "mp-collapse-box-open" : "mp-collapse-box-closed"
        }`}
      >
        <div className={"mp-collapse-box-inner"}>
          <div className={"mp-collapse-box-links"}>
            {navbarLinks.map((link, index) => (
              <NavbarLink link={link} border key={index} collapsed />
            ))}

            <div className={"mp-collapse-box-social-links"}>
              {socialsLinks.map((icon, index) => (
                <SocialIcon icon={icon} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
