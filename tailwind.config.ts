import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        mash: {
          black: "#050505",
          dark: "#0a0a0a",
          card: "#0f0f0f",
          gold: "#c9a84c",
          "gold-light": "#e8d48b",
          "gold-dark": "#a07c2a",
          purple: "#6b21a8",
          "purple-glow": "#7c3aed",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #a07c2a, #c9a84c, #e8d48b, #c9a84c, #a07c2a)",
        "gold-text": "linear-gradient(135deg, #c9a84c, #e8d48b)",
        "purple-glow": "radial-gradient(ellipse at center, rgba(124, 58, 237, 0.15), transparent 70%)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        "mesh-move": "mesh-move 20s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        "mesh-move": {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0, 0) scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
