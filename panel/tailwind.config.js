const colors = require('tailwindcss/colors');
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      theme: colors.indigo,
      gray: colors.blueGray,
      transparent: {
        DEFAULT: '#00000000',
      },
      halfblack: {
        DEFAULT: '#0000007F',
      },
      white: {
        DEFAULT: '#F9FAFB',
      },
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
    fill: {
      current: 'currentColor',
    },
    extend: {
      width: {
        'cardpicker-md': 'calc(128px * 3)',
      },
      inset: {
        'card-center': 'calc(50% - 64px)',
      },
      boxShadow: {
        card: '0 4px 4px 0 rgba(0, 0, 0, 0.1), 0 -4px 4px 0 rgba(0, 0, 0, 0.1)',
      },
    },
  },
  variants: {
    extend: {
      fill: ['dark'],
      opacity: ['disabled', 'group-focus'],
      backgroundColor: ['checked'],
      borderColor: ['checked'],
      display: ['odd'],
      outline: ['active'],
    },
  },
  plugins: [],
};
