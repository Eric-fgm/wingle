/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin")

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      primary: "var(--primary-color)",
      "primary-muted": "var(--primary-muted-color)",
      danger: "var(--danger-color)",
      white: "#ffffff",
      modifier: "var(--background-modifier)",
      "modifier-accent": "var(--background-modifier-accent)",
    },
    backgroundColor: {
      transparent: "transparent",
      primary: "var(--primary-color)",
      "primary-muted": "var(--primary-muted-color)",
      danger: "var(--danger-color)",
      dominant: "var(--background-dominant)",
      secondary: "var(--background-secondary)",
      tertiary: "var(--background-tertiary)",
      muted: "var(--text-muted)",
      modifier: "var(--background-modifier)",
      accent: "var(--background-modifier-accent)",
      hover: 'var(--background-hover)',
      white: "#ffffff",
    },
    textColor: {
      white: "#ffffff",
      primary: "var(--primary-color)",
      "primary-muted": "var(--primary-muted-color)",
      danger: "var(--danger-color)",
      normal: "var(--text-normal)",
      muted: "var(--text-muted)",
    },
    borderColor: {
      DEFAULT: "var(--background-modifier)",
      accent: "var(--background-modifier-accent)",
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      fontSize: {
        tiny: "11px",
        mini: "11.5px",
        rg: "13px",
        md: "15px",
      },
      spacing: {
        13: "52px",
        18: "72px",
      },
      maxHeight: {
        'top-bar': 'calc(100vh - 64px)'
      }
    },
  },
  plugins: [
    plugin(({ addComponents, addUtilities, theme }) => {
      addComponents({
        ".scroller": {
          "overflow-x": "hidden",
        },
      })
      addUtilities({
        ".scroller.camouflaged": {
          scrollbarWidth: "none",
        },
        ".scroller.camouflaged::-webkit-scrollbar": {
          width: 0,
          height: 0,
        },
        ".scroller.thin": {
          scrollbarWidth: "thin",
        },
        ".scroller.thin::-webkit-scrollbar": {
          width: 8,
        },
        ".scroller.thin::-webkit-scrollbar-thumb": {
          backgroundClip: "padding-box",
          border: "2px solid transparent",
          borderRadius: 4,
        },
        ".scroller::-webkit-scrollbar": {
          width: 16,
          height: 16,
        },
        ".scroller::-webkit-scrollbar-thumb": {
          minHeight: 40,
          backgroundClip: "padding-box",
          border: "4px solid transparent",
          borderRadius: 8,
          backgroundColor: "var(--scrollbar-thin-thumb)",
        },
          ".scroller.s-mb-5::-webkit-scrollbar-track": {
            marginBottom: 20
          },
        ".scroller.thin::-webkit-scrollbar, .scroller.thin::-webkit-scrollbar-thumb": {
          visibility: "hidden",
        },
        ".scroller:hover::-webkit-scrollbar, .scroller:hover::-webkit-scrollbar-thumb":
          {
            visibility: "visible",
          },
          
        // ".scroller::-webkit-scrollbar-track": {
        //   backgroundColor: "var(--scrollbar-track-color)",
        // },
      })
    }),
  ],
}
