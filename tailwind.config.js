module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./src/*.{html,js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {},

  },
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui"),
    // require('prettier-plugin-tailwindcss'),
  ],
  // daisyui: {
  //   "styled": true,
  //   "themes": true,
  //   "base": true,
  //   "utils": true,
  //   "logs": true,
  //   "rtl": false,
  // },

}
/* require('daisyui') */
