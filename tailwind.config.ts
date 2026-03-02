import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#2D5016",
          dark: "#1E3A0F",
          light: "#3D6B1F",
        },
        earth: {
          DEFAULT: "#8B4513",
          dark: "#6B3410",
          light: "#A0522D",
        },
        turmeric: {
          DEFAULT: "#D4A017",
          dark: "#B8860B",
          light: "#E6B820",
        },
        cream: {
          DEFAULT: "#FAF7F0",
          dark: "#F0EBE0",
          light: "#FFFDF8",
        },
        charcoal: {
          DEFAULT: "#1A1A1A",
          light: "#333333",
          muted: "#666666",
        },
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        lato: ["Lato", "sans-serif"],
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        "natural": "0 4px 20px rgba(45, 80, 22, 0.1)",
        "product": "0 8px 30px rgba(0, 0, 0, 0.08)",
        "card-hover": "0 16px 40px rgba(45, 80, 22, 0.15)",
      },
      screens: {
        xs: "375px",
      },
    },
  },
  plugins: [],
};

export default config;
