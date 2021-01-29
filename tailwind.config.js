module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  purge: [],
  theme: {
    extend: {
      colors: {
        biblogreen: {
          100: "#e5f2f1",
          200: "#b2dad5",
          300: "#7fc2ba",
          400: "#4ca99e",
          500: "#199182",
          600: "#008575",
          700: "#006a5d",
          800: "#004f46",
          900: "#00352e",
        },
      },
      boxShadow: {
        biblofocus: "0 0 0 3px #b2dad5",
      },
      fontFamily: {
        biblofont: ["Cabin", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
    cursor: {
      grab: "grab",
    },
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "active"],
    boxShadow: ["responsive", "hover", "focus", "active"],
    borderStyle: ["responsive", "hover", "focus", "active"],
    scrollbar: ["responsive", "hover", "focus", "active"],
  },
  plugins: [
    require("@tailwindcss/custom-forms"),
    require("tailwindcss-shadow-outline-colors")(),
    require("tailwind-scrollbar"),
  ],
};
