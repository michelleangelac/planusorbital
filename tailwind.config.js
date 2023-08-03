/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      purple: "#d0d4eb",
      pink: "#e5d0e3",
      lavender: "#e0b0d5",
      blue: "#bad7f2",
      mint: "#aee5d8",
      tosca: "#7be0ad",
      black: "#000000",
      white: "#ffffff",
      grey: "#c3c3c3",
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
