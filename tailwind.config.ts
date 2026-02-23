import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#FAF9F5", // Your new Soft Pearl background
        card: "#FFFFFF",       // Crisp white for cards
        accent: {
          DEFAULT: "#3B82F6",
          soft: "#60A5FA",
        },
        muted: "#6B7280",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;