import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { useTheme } from "next-themes";
import { IconBase } from "./icons/base.tsx";

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
      size="lg"
      aria-label="Toggle color scheme"
    >
      <IconBase icon={"tabler:moon"} className={"dark:hidden block"} />
      <IconBase icon={"tabler:sun"} className={"dark:block hidden"} />
    </ActionIcon>
  );
};
