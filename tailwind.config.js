/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["DM Sans", "sans-serif"]
      },
      colors: {
        text: "#fff",
        primary: "#164e63",
        secondary: "#7adeee"

      }
    },
  },
  plugins: [],
};