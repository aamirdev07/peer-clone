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
        "bg-base": "var(--bg-base)",
        "bg-surface": "var(--bg-surface)",
        "bg-surface-raised": "var(--bg-surface-raised)",
        "bg-surface-hover": "var(--bg-surface-hover)",
        "bg-input": "var(--bg-input)",
        "accent-purple": "var(--accent-purple)",
        "accent-purple-hover": "var(--accent-purple-hover)",
        "accent-purple-muted": "var(--accent-purple-muted)",
        "accent-green": "var(--accent-green)",
        "accent-green-hover": "var(--accent-green-hover)",
        "accent-blue": "var(--accent-blue)",
        "accent-amber": "var(--accent-amber)",
        "accent-red": "var(--accent-red)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-tertiary": "var(--text-tertiary)",
        "border-subtle": "var(--border-subtle)",
        "border-hover": "var(--border-hover)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        satoshi: ["Satoshi", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
