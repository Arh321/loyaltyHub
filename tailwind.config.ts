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
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
        fadeUp: "fadeUp 0.5s ease-in-out forwards",
        "fadeIn-repetive": "fadeIn 2s ease-in-out",
        movable: "movable 3s infinite",
        popIn: "popIn 0.7s ease-in-out",
      },
      colors: {
        transparent: "transparent",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        cta: "#1E9C51",
        "cta-disabled":
          "#90CBA8" /* 40% lighter than base for disabled state */,
        "cta-hover": "#167B40" /* 20% darker than base for hover state */,
        "cta-focus": "#0F5C30" /* 40% darker than base for focus state */,
        "cta-30": "#1e9c5032",
        Highlighter: "#fff",
        "Highlighter-disabled":
          "#FFFFFF99" /* 40% opacity for disabled state */,
        "Highlighter-hover":
          "#CCCCCC" /* 20% darker than base for hover state */,
        "Highlighter-focus":
          "#999999" /* 40% darker than base for focus state */,
        "Highlighter-Faded": "#E2EBF2",
        BG: "#F2F6FC",
        Alert: "#F7410F",
        Tritary: "#ADBAB2",
        Secondary: "#50675E",
        Primary: "#252827",
        Focus: "#409FA6",
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
