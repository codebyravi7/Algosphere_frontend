/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        neon: {
          100: "#00ffcc", // Bright aqua
          200: "#00bfff", // Bright blue
          300: "#ff00ff", // Bright magenta
          400: "#ff4081", // Bright pink
          500: "#00ff64", // Bright green
        },
        sepia: {
          100: "#f4ecd8",
          200: "#c19a6b",
          300: "#704214",
        },
      },
    },
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [],
};
