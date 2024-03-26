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
    socialsLinks: [
      {
        icon: "github",
        link: "https://github.com/malezjaa",
      },
      {
        icon: "github",
        link: "https://github.com/malezjaa",
      },
      {
        icon: "github",
        link: "https://github.com/malezjaa",
      },
    ],
  },
});
