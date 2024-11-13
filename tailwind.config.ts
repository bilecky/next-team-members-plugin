import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      fontFamily: {
        quicksand: ["var(--font-quicksand)"],
        karma: ["var(--font-mavenPro)"],
      },
      colors: {
        primary: {
          DEFAULT: "#FCFCFC",
          DEFAULT_PURPLE_FONT_COLOR: "#8B5DFF",
          DEFAULT_PURPLE_BG: "#6A42C2",
          DARKENED_PURPLE_BG: "#563A9C",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
