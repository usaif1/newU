/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        black: "#1E1E1D",
        slate: "#AEAC92",
        offwhite: "#E7E7D6",
        yellow: "#FF8C00",
        lightorgange: "#FF6D00",
        organge: "#FF5800",
      },
    },
  },
  plugins: [],
};
