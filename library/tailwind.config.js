const colors = require('tailwindcss/colors');
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      colors: {
        theme: colors.indigo,
        base: colors.slate,
        pink: {
          DEFAULT: '#EC4899',
          light: '#F6C5DD',
          dark: '#831843',
        },
        orange: {
          DEFAULT: '#F59E0B',
          light: '#F9DFB2',
          dark: '#78350F',
        },
        green: {
          DEFAULT: '#76E235',
          light: '#D2F3BF',
          dark: '#365314',
        },
      },
      fontFamily: {
        sans: ['"Rubik"', ...fontFamily.sans],
        roboto: ['"Roboto"', ...fontFamily.sans],
      },
      extend: {},
    },
    plugins: [],
  },
};
