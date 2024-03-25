import { siteData } from "virtual-site-data";
import { ThemeSwitch } from "./theme-switch.tsx";
import {
  ActionIcon,
  Burger,
  useMantineColorScheme,
  Group,
  Text,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { NavLink } from "../../utils/config.ts";
import { NavbarLink } from "./nav-link.tsx";

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
            <div className={"flex flex-row gap-2"}>
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
              <ThemeSwitch />
              <Box maw={400} mx="auto">
                <Group justify="center" mb={5}>
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
                </Group>
              </Box>
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
            {/*<div className={"flex flex-row gap-4"}>*/}
            {/*{socialsLinks.map((link, index) => (*/}
            {/*  <ActionIcon*/}
            {/*    key={index}*/}
            {/*    component={"a"}*/}
            {/*    href={link.link}*/}
            {/*    target={link.target}*/}
            {/*    aria-label={link.alt}*/}
            {/*    variant="default"*/}
            {/*    size="lg"*/}
            {/*  >*/}
            {/*    {link.icon}*/}
            {/*  </ActionIcon>*/}
            {/*))}*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    </>
  );
};
