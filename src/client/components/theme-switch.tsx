import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "./icons";

export const ThemeSwitch = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
  const { setTheme } = useTheme();

  return (
    <ActionIcon
      onClick={() => {
        setColorScheme(colorScheme === "light" ? "dark" : "light");
        setTheme(colorScheme === "light" ? "dark" : "light");
      }}
      variant="default"
      size="xl"
      aria-label="Toggle color scheme"
    >
      <SunIcon className={"dark:hidden block"} />
      <MoonIcon className={"dark:block hidden"} />
    </ActionIcon>
  );
};
