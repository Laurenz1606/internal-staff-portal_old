module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
