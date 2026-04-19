import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#080A0F",
        surface: "#0D1117",
        surface2: "#161B22",
        hazard: "#FF6B35",
        critical: "#C0392B",
        warning: "#F39C12",
        safe: "#27AE60",
        particle: "#FF8C42",
        data: "#58A6FF",
        ivory: "#E6EDF3",
        muted: "#8B929A",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "display-2xl": ["6rem", { lineHeight: "1", letterSpacing: "-0.04em" }],
        "display-xl": ["4.5rem", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-lg": ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
    },
  },
  plugins: [],
};

export default config;
