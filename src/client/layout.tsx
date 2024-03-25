import React from "react";
import { AppShell, Text } from "@mantine/core";
import "@mantine/core/styles.css";
import "virtual-custom-css";
import { ThemeProvider } from "next-themes";
import { createTheme, MantineProvider } from "@mantine/core";
import { Navbar } from "./components/navbar.tsx";

const theme = createTheme({
  defaultRadius: "lg",
  primaryColor: "orange",
  autoContrast: true,
});

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <MantineProvider theme={theme} defaultColorScheme={"dark"}>
        <AppShell header={{ height: 60 }} padding="md">
          <AppShell.Header className={"!border-none"}>
            <Navbar />
          </AppShell.Header>

          <AppShell.Main className={"mt-4"}>{children}</AppShell.Main>
        </AppShell>
      </MantineProvider>
    </ThemeProvider>
  );
};
