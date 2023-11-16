/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      lg: { max: "850px" },
      md: { max: "620px" },
      sm: { max: "440px" },
      xs: { max: "400px" },
    },
    extend: {
      fontFamily: {
        coverge: ["Convergence", "sans-serif"],
      },
      colors: {
        brownRed: "#7d6262",
        brownRedHover: "#ab8686",
        lightRed: "#ffe1e1",
        lightRedHover: "#f5c8c8",
      },
    },
  },
  plugins: [],
};
