import { siteData } from "virtual-site-data";
import { ThemeSwitch } from "./theme-switch.tsx";
import { useMantineColorScheme } from "@mantine/core";

export const Navbar = () => {
  const { navLinks, socialLinks, logo } = siteData;
  const { colorScheme } = useMantineColorScheme();
  return (
    <>
      <header className="app-header">
        <nav className="app-navbar">
          <div className="flex items-center justify-between">
            <a
              className="inline-flex items-center gap-x-2 text-xl font-semibold dark:text-white"
              href="#"
            >
              <img
                className="w-10 h-auto"
                src={colorScheme === "dark" ? logo.dark : logo.light}
                alt={logo.alt}
              />
              {logo.text}
            </a>
          </div>
          <ThemeSwitch />
        </nav>
      </header>
    </>
  );
};
