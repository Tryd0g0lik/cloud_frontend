module.exports = {
  content: [
    "./src/*.{js,jsx,ts,tsx}",
    "./src/public/*.html"
  ],

  theme: {
    extend: {},

  },
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui")
  ],


}
/* require('daisyui') */
