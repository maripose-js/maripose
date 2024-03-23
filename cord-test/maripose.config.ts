import { defineConfig } from "../src";

export default defineConfig({
  site: {
    styles: ["./src/globals.css"],
    logo: {
      light: "logo.png",
      dark: "logo.png",
      text: "Maripose",
    },
  },
});
