/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        test: "linear-gradient(90deg, #4EEAFF 0%, #4D74FF 113.97%)",
        gradient: "gradient-to-r from-cyan-300 to-blue-400",
      },
    },
    animation: {
      wave: "waveAnimation 2s linear infinite",
    },
  },
  plugins: [require("daisyui"), require("tailwind-scrollbar-hide")],
};
