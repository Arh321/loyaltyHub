import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient": "linear-gradient(to top, black, transparent)", // Your custom gradient
      },
      fontFamily: {
        Regular: "Regular",
        Bold: "Bold",
        Light: "Light",
        Medium: "Medium",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        popIn: {
          "0%": { top: "80%", "z-index": "-1" },
          "90%": { top: "100%" },
          "100%": { "z-index": "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
        "fadeIn-repetive": "fadeIn 2s ease-in-out",

        popIn: "popIn 0.7s ease-in-out",
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
        Focus: "#409FA6",
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

  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          ".no-scrollbar": {
            "-ms-overflow-style": "none" /* IE و Edge */,
            "scrollbar-width": "none" /* فایرفاکس */,
          },
          ".no-scrollbar::-webkit-scrollbar": {
            display: "none" /* مرورگرهای Webkit */,
          },
          ".border-gradient-seconday": {
            background:
              " linear-gradient(#F2F6FC, #F2F6FC) padding-box,linear-gradient(90deg, rgba(30,156,81,0.1) 0%, rgba(30,156,81,1) 50%, rgba(30,156,81,0.1) 100%) border-box",

            border: " 0 0 4px 0 solid transparent",
            borderImage:
              "linear-gradient(90deg, rgba(30,156,81,0.1) 0%, rgba(30,156,81,1) 50%, rgba(30,156,81,0.1) 100%) 1",
          },
        },
        ["responsive"] // Add responsive support
      );
    },
  ],
};
export default config;
