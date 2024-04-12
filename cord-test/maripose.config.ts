import { defineConfig } from "../src";

export default defineConfig({
  site: {
    styles: ["./src/globals.css"],
    logo: {
      light: "logo.png",
      dark: "logo.png",
      text: "Maripose",
    },
    navbarLinks: [
      {
        text: "Home",
        link: "/",
      },
      {
        text: "About",
        link: "/about",
      },
    ],
    title: "Maripose",
    description:
      "A simple static site generator created using react, tailwind, rsbuild and bun. Create beautiful websites with ease.",
    slogan: "A simple static site generator",
    buttons: [
      {
        link: "/quick-start",
        text: "Get started",
        variant: "filled",
        icon: "tabler:rocket",
      },
      {
        link: "/docs",
        text: "Learn more",
        variant: "light",
        icon: "tabler:book",
      },
    ],
    tabSettings: {
      guide: {
        icon: "tabler:book",
        title: "Guide",
      },
    },
    sidebar: [
      {
        group: "guide",
        pages: [
          {
            file: "guide/test.mdx",
            title: "Guide test",
          },
          {
            file: "quick-start.mdx",
            title: "Quick start",
          },
        ],
      },
    ],
    pages: ["about.mdx"],
    socialsLinks: [
      {
        icon: "github",
        link: "https://github.com/malezjaa",
      },
      {
        icon: "twitter",
        link: "https://twitter.com/malezjaa",
      },
    ],
    codeHighlighting: {
      theme: "catppuccin-frappe",
    },
  },
});
