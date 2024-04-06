import defaultTheme from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", "sans-serif", ...defaultTheme.fontFamily.sans],
      },

      animation: {
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
      },
      keyframes: {
        moveHorizontal: {
          "0%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
          "50%": {
            transform: "translateX(50%) translateY(10%)",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
        },
        moveInCircle: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        moveVertical: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "50%": {
            transform: "translateY(50%)",
          },
          "100%": {
            transform: "translateY(-50%)",
          },
        },
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:red|orange|yellow|lime|green|sky|blue)-(?:50|100|200|300|400|500|600|700|800|900|950)(?:\/[1-9][0-9]*)?)$/,
      variants: ["dark"],
    },
    {
      pattern:
        /^(text-(?:red|orange|yellow|lime|green|sky|blue)-(?:50|100|200|300|400|500|600|700|800|900|950)(?:\/[1-9][0-9]*)?)$/,
      variants: ["dark"],
    },
    {
      pattern:
        /^(border-(?:red|orange|yellow|lime|green|sky|blue)-(?:50|100|200|300|400|500|600|700|800|900|950)(?:\/[1-9][0-9]*)?)$/,
      variants: ["dark"],
    },
  ],
  plugins: [],
} as Config;
