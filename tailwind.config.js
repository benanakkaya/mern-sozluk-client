/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '0px',
    },
    extend: {
      colors:{
        dark: "#2D2D2D",
        primary: "#FFB347",
        somon: "#FFA07A",
        customWhite: "#BDBDBD",
        customGray: "#494949"
      },
      transitionProperty: {
        'max-height': 'max-height'
      }
    },
  },
  plugins: [],
}
