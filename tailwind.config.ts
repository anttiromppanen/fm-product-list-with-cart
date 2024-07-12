import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      font: {
        sans: ["Red Hat Text", "sans-serif"],
      },
      colors: {
        userRed: "hsl(14, 86%, 42%)",
        userGreen: "hsl(159, 69%, 38%)",
      },
    },
  },
  plugins: [],
};
export default config;
