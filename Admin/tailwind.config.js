/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2E64F0",
        secondary: "#00D1FF",
        oren1: "#FF9900",
        merah: "#FF0000",
        green1: "#3B9C00",
        green2: "#3B9C00",
      },
    },
  },
  plugins: [require("daisyui"), require("tailwind-scrollbar-hide")],
};
