/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  plugins: [require("daisyui")],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      keyframes: {
        hide: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
      },
      animation: {
        hide: "hide 0.2s ease-in-out forwards",
      },
    },
  },
  daisyui: {
    themes: ["night", "winter"],
  },
};
