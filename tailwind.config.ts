import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient": "linear-gradient(to top, black, transparent)",
        "custom-gradient-white":
          "linear-gradient(to top, rgb(0,0,0,0.5), transparent)",
      },
      fontFamily: {
        Regular: "Regular",
        Bold: "Bold",
        Light: "Light",
        Medium: "Medium",
      },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        fadeUp: {
          "100%": {
            opacity: "1",
            transform: "translateY(0px)",
          },
        },
        popIn: {
          "0%": {
            top: "80%",
            "z-index": "-1",
          },
          "90%": {
            top: "100%",
          },
          "100%": {
            "z-index": "1",
          },
        },
        movable: {
          "0%": {
            transform: "translateY(-2px)",
          },
          "50%": {
            transform: "translateY(2px)",
          },
          "100%": {
            transform: "translateY(-2px)",
          },
        },
        skeleton: {
          "0%": {
            backgroundColor: "#e0e0e0",
          },
          "50%": {
            backgroundColor: "#c0c0c0",
          },
          "100%": {
            backgroundColor: "#e0e0e0",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
        fadeUp: "fadeUp 0.5s ease-in-out forwards",
        "fadeIn-repetive": "fadeIn 2s ease-in-out",
        movable: "movable 3s infinite",
        popIn: "popIn 0.7s ease-in-out",
        skeleton: "skeleton 1.5s infinite ease-in-out",
      },
      colors: {
        transparent: "transparent",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        cta: "var(--cta)",
        "cta-disabled": "var(--ctaDisabled)",
        "cta-hover": "var(--ctaHover)",
        "cta-focus": "var(--ctaFocus)",
        "cta-30": "var(--cta30)",
        Highlighter: "var(--highlighter)",
        "Highlighter-disabled": "var(--highlighter-disabled)",
        "Highlighter-hover": "var(--highlighterHover)",
        "Highlighter-focus": "var(--highlighterFocus)",
        "Highlighter-Faded": "var(--highlighterFaded)",
        BG: "var(--bg)",
        Alert: "var(--alert)",
        Tritary: "var(--tritary)",
        Secondary: "var(--secondary)",
        Primary: "var(--primary)",
        Focus: "var(--focus)",
        borderColor: "var(--border-color)",
      },
      screens: {
        sm: "320px",
        lsm: "420px",
        md: "768px",
        lg: "1024px",
        xl: "1220px",
        dxl: "1440px",
        ldxl: "1728px",
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
