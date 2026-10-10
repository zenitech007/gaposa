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
        ink: "var(--color-ink)",
        navy: "var(--color-navy)",
        crimson: "var(--color-crimson)",
        forest: "var(--color-forest)",
        leaf: "var(--color-leaf)",
        chalk: "var(--color-chalk)",
        mist: "var(--color-mist)",
        slate: "var(--color-slate)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        menu: "0 12px 32px -12px rgba(23, 33, 43, 0.28)",
      },
      maxWidth: {
        container: "1440px",
      },
      borderRadius: {
        button: "6px",
        tag: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
