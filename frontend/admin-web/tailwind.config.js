/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6E01",
        background: "#000000",
        surface: "#0A0A0A",
        border: "#1A1A1A",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Sora", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        glow: "0 0 15px rgba(255, 110, 1, 0.6)",
        "glow-lg": "0 0 30px rgba(255, 110, 1, 0.7)",
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
      },
    },
  },
  plugins: [],
};
