import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "kenit-black": "var('--font-kenit-black')",
        "kenit-medium": "var('--font-kenit-medium')",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        woksBlue: "#3B82F6",
        woksBlueLght: "#318FB5",
        woksGreen: "#4C4B16",
        woksGreenLght: "#898121",
        woksYellow: "#F59E0B",
        woksYellowLight: "#40534C",
      },
    },
  },
  plugins: [],
};
export default config;
