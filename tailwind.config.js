module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./src/*.{html}",
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
