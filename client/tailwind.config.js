/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        xll: "2100px",
        xs: "450px"
      }
    },
  },
  plugins: [],
}

