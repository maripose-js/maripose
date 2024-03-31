import React from "react";
import { AppShell, Text, useMantineTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import "virtual-custom-css";
import { ThemeProvider } from "next-themes";
import { createTheme, MantineProvider } from "@mantine/core";
import { Navbar } from "./components/navbar.tsx";
import { BackgroundGradientAnimation } from "./components/background-gradient.tsx";
import { Footer } from "./components/footer.tsx";
import { useLocation } from "react-router-dom";
import type { PageData } from "./app.tsx";

const theme = createTheme({
  defaultRadius: "md",
  primaryColor: "red",
  autoContrast: true,
  fontFamily:
    "Nunito, sans-serif, system-ui, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
  headings: {
    fontFamily:
      "Nunito, sans-serif, system-ui, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
  },
  components: {
    Text: Text.extend({
      defaultProps: {
        size: "sm",
        fw: 500,
      },
    }),
  },
});

export const Layout = ({
  children,
  data,
}: {
  children: React.ReactNode;
  data: PageData;
}) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <MantineProvider theme={theme} defaultColorScheme={"dark"}>
        <Child data={data}>{children}</Child>
      </MantineProvider>
    </ThemeProvider>
  );
};

const Child = ({
  children,
  data,
}: {
  data: PageData;
  children: React.ReactNode;
}) => {
  const location = useLocation();
  const _theme = useMantineTheme();
  const key = _theme.primaryColor;
  return (
    <AppShell header={{ height: 60 }} padding="sm">
      <AppShell.Header className={`border-none mp-mantine-body`}>
        <Navbar data={data} />
      </AppShell.Header>

      <BackgroundGradientAnimation
        firstColor={_theme.colors[key][4]}
        secondColor={_theme.colors[key][5]}
        thirdColor={_theme.colors[key][6]}
        fourthColor={_theme.colors[key][7]}
        fifthColor={_theme.colors[key][8]}
        pointerColor={_theme.colors[key][5]}
      ></BackgroundGradientAnimation>
      <AppShell.Main className={location.pathname === "/" ? "!pt-0 !mt-0" : ""}>
        {children}
      </AppShell.Main>
      <Footer />
    </AppShell>
  );
};
