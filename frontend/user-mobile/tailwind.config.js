/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "",
        glow: "#FF8C42",
        gray: "#4B4B4B",
        success: "#1EE84C",
        warning: "#FFC107",
        danger: "#DC3545",
        info: "#07BDFF",
        teal: "#2DD4BF",
        muted: "#6B7280",
        dark_gray: "#111111"
      },
      fontFamily: {
        heading: ["Montserrat-Bold"],
        subheading: ["Montserrat-Regular"],
        sans: ["Inter"]
      },
    },
  },
  plugins: [],
}