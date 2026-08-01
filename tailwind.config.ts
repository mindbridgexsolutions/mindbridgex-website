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
        'mindbridge-primary': '#0f172a',
        'mindbridge-secondary': '#38bdf8',
        'mindbridge-accent': '#2563eb',
      },
    },
  },
  plugins: [],
};
export default config;