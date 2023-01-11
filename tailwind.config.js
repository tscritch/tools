/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        djent: {
          50: "#f2f8f9",
          100: "#deebef",
          200: "#c1d7e0",
          300: "#96baca",
          400: "#6395ad",
          500: "#4f85a1",
          600: "#3e647c",
          700: "#375367",
          800: "#344756",
          900: "#2f3e4a",
        },
        leaf: {
          50: "#eff9ff",
          100: "#dff1ff",
          200: "#b8e5ff",
          300: "#78d1ff",
          400: "#33bbff",
          500: "#06a2f1",
          600: "#0081ce",
          700: "#0067a7",
          800: "#02568a",
          900: "#084872",
        },
      },
      dropShadow: {
        leaf: "0 1px 2px rgb(25 223 51 / 0.5)",
        djent: "0 1px 2px rgb(31 48 37 / 0.2)",
        blue: "0 1px 2px rgb(59 131 246 / 0.4)",
        red: "0 1px 2px rgb(239 68 68 / 0.4)",
      },
      keyframes: {
        hide: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        "slide-in": {
          from: { transform: "translateX(calc(100% + 1.5rem))" },
          to: { transform: "translateX(0)" },
        },
        "swipe-out": {
          from: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
          to: { transform: "translateX(calc(100% + 1.5rem))" },
        },
        "rx-collapsible-height-open": {
          from: { height: "0" },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "rx-collapsible-height-close": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        hide: "hide 0.2s ease-in-out forwards",
        "slide-in": "slide-in 0.1s ease-out",
        "swipe-out": "swipe-out 0.1s ease-out",
        "rx-collapsible-height-open":
          "rx-collapsible-height-open 0.1s ease-out",
        "rx-collapsible-height-close":
          "rx-collapsible-height-close 0.1s ease-out",
      },
    },
  },
  plugins: [
    // radix disabled attribute
    plugin(({ addVariant }) => {
      addVariant("rx-disabled", "&[data-disabled]");
    }),
    // radix highlighted attribute
    plugin(({ addVariant }) => {
      addVariant("rx-highlighted", "&[data-highlighted]");
    }),
    // radix state open attribute
    plugin(({ addVariant }) => {
      addVariant("rx-state-open", '&[data-state="open"]');
    }),
    // radix state closed attribute
    plugin(({ addVariant }) => {
      addVariant("rx-state-closed", '&[data-state="closed"]');
    }),
    // radix swipe move attribute
    plugin(({ addVariant }) => {
      addVariant("rx-swipe-move", '&[data-swipe="move"]');
    }),
    // radix swipe cancel attribute
    plugin(({ addVariant }) => {
      addVariant("rx-swipe-cancel", '&[data-swipe="cancel"]');
    }),
    // radix swipe end attribute
    plugin(({ addVariant }) => {
      addVariant("rx-swipe-end", '&[data-swipe="end"]');
    }),
    // radix state checked attribute
    plugin(({ addVariant }) => {
      addVariant("rx-state-checked", '&[data-state="checked"]');
    }),
    // radix state unchecked attribute
    plugin(({ addVariant }) => {
      addVariant("rx-state-unchecked", '&[data-state="unchecked"]');
    }),
    // radix state on attribute
    plugin(({ addVariant }) => {
      addVariant("rx-state-on", '&[data-state="on"]');
    }),
  ],
  corePlugins: {
    preflight: false,
  },
};
