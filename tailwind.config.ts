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
        "cta-focus": "#0E843E",
        Highlighter: "#fff",
        "Highlighter-Faded": "#E2EBF2",
        BG: "#F2F6FC",
        Alert: "#F7410F",
        Tritary: "#ADBAB2",
        Secondary: "#50675E",
        Secondary2: "#1E9C51",
        Primary: "#252827",
        Focus: "#409FA6",
        SecondaryHover: "#0E843E",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
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
