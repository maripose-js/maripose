import React from "react";
import NextTopLoader from "nextjs-toploader";
import "@mantine/core/styles.css";
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({});

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <>
      <MantineProvider theme={theme}>
        <NextTopLoader color="#59cdb5" />
        <AppShell header={{ height: 60 }} padding="md">
          <AppShell.Header>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <div>Logo</div>
          </AppShell.Header>

          <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
      </MantineProvider>
    </>
  );
};
