/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        spectral: ["Spectral", "sans-serif"],
        handjet: ["Handjet", "sans-serif"],
        robotoCondensed: ["Roboto_Condensed", "sans-serif"],
      },
    },
  },
  plugins: [],
}