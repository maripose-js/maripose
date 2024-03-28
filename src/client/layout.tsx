import React from "react";
import { AppShell, Combobox, useMantineTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import "virtual-custom-css";
import { ThemeProvider } from "next-themes";
import { createTheme, MantineProvider } from "@mantine/core";
import { Navbar } from "./components/navbar.tsx";
import { BackgroundGradientAnimation } from "./components/background-gradient.tsx";
import { Footer } from "./components/footer.tsx";

const theme = createTheme({
  defaultRadius: "lg",
  primaryColor: "lime",
  autoContrast: true,
});

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <MantineProvider theme={theme} defaultColorScheme={"dark"}>
        <Child>{children}</Child>
      </MantineProvider>
    </ThemeProvider>
  );
};

const Child = ({ children }: { children: React.ReactNode }) => {
  const _theme = useMantineTheme();
  const key = _theme.primaryColor;
  return (
    <AppShell header={{ height: 60 }} padding="sm">
      <AppShell.Header className={"!border-none mp-mantine-body"}>
        <Navbar />
      </AppShell.Header>

      <BackgroundGradientAnimation
        firstColor={_theme.colors[key][4]}
        secondColor={_theme.colors[key][5]}
        thirdColor={_theme.colors[key][6]}
        fourthColor={_theme.colors[key][7]}
        fifthColor={_theme.colors[key][8]}
        pointerColor={_theme.colors[key][5]}
      ></BackgroundGradientAnimation>
      <AppShell.Main className={"!pt-0 !mt-0"}>{children}</AppShell.Main>

      <Footer />
    </AppShell>
  );
};
