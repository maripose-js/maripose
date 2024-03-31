import { ActionIcon, Switch, useMantineColorScheme } from "@mantine/core";
import { useTheme } from "next-themes";
import { IconBase } from "./icons/base.tsx";

export const ThemeSwitch = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
  const { setTheme } = useTheme();

  return (
    <Switch
      onChange={(event) => {
        setColorScheme(event.currentTarget.checked ? "dark" : "light");
        setTheme(event.currentTarget.checked ? "dark" : "light");
      }}
      size="sm"
      classNames={{
        track:
          colorScheme === "dark"
            ? "!bg-[var(--mantine-color-default-hover)] mp-switch-border"
            : "",
        thumb:
          colorScheme === "dark"
            ? "!bg-[var(--mantine-color-dark-5)] mp-switch-border"
            : "",
      }}
      checked={colorScheme === "dark"}
      thumbIcon={
        colorScheme === "dark" ? (
          <IconBase icon={"tabler:moon"} size={2} />
        ) : (
          <IconBase icon={"tabler:sun"} size={2} />
        )
      }
    />
  );
};
