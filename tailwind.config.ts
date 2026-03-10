import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
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
        muted: "#7D8590",
        border: "rgba(255,107,53,0.15)",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "sans-serif"],
        body: ['"Inter"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      fontSize: {
        "display-2xl": ["6rem", { lineHeight: "1", letterSpacing: "-0.04em" }],
        "display-xl": ["4.5rem", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-lg": ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        xl: ["1.5rem", { lineHeight: "1.4" }],
        lg: ["1.125rem", { lineHeight: "1.6" }],
        base: ["1rem", { lineHeight: "1.6" }],
        sm: ["0.875rem", { lineHeight: "1.5" }],
        xs: ["0.75rem", { lineHeight: "1.4" }],
      },
      boxShadow: {
        hazard: "0 0 0 1px rgba(255,107,53,0.3), 0 12px 30px rgba(192,57,43,0.28)",
      },
      backgroundImage: {
        "toxic-radial":
          "radial-gradient(circle at 20% 20%, rgba(255,107,53,0.18), transparent 45%), radial-gradient(circle at 80% 10%, rgba(192,57,43,0.16), transparent 40%)",
      },
    },
  },
  plugins: [],
};

export default config;
