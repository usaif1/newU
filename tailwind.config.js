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
        lightorange: "#FF6D00",
        orange: "#FF5800",
      },
      borderColor: {
        black: "#1E1E1D",
        slate: "#AEAC92",
        offwhite: "#E7E7D6",
        yellow: "#FF8C00",
        lightorange: "#FF6D00",
        orange: "#FF5800",
      },
      textColor: {
        primary: "#E7E7D6",
        secondary: "#AEAC92",
        alternate: "#FF8C00",
        complementary: "#FF6D00",
        dark: "#1E1E1D",
      },
    },
  },
  plugins: [],
};
