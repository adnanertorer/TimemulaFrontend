/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef5ff",
          100: "#d9e8ff",
          500: "#2f6bff",
          600: "#2457d6",
          900: "#14315f",
        },
        ink: {
          500: "#68758a",
          700: "#34425a",
          900: "#172033",
        },
        mint: {
          500: "#00a68a",
        },
      },
      boxShadow: {
        soft: "0 16px 42px rgba(23, 32, 51, 0.10)",
        auth: "0 24px 70px rgba(30, 47, 74, 0.14)",
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "Roboto", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
