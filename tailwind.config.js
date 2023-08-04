/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // Screen settings source: https://tailwindcss.com/docs/screens
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
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
      hyperlink: "#5062ad",
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
