import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Regular: "Regular",
        Bold: "Bold",
        Light: "Light",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cta: "#1E9C51",
        "cta-focus": "#0E843E",
        Highlighter: "#fff",
        "Highlighter-Faded": "#E2EBF2",
        BG: "#F2F6FC",
        Alert: "#BB0E0E",
        Tritary: "#ADBAB2",
        Secondary: "#50675E",
        Secondary2: "#1E9C51",
        Primary: "#252827",
      },
      screens: {
        sm: "320px",
        // => @media (min-width: 320px) { ... }
        lsm: "420px",
        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        xl: "1220px",
        dxl: "1440px",
        ldxl: "1728px",

        // => @media (min-width: 1024px) { ... }
      },
    },
  },
  plugins: [],
};
export default config;
