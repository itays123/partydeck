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
        dark: '#0000001A',
        theme: colors.indigo[200] + 'A1',
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
      gridTemplateColumns: {
        'iterator-sm': 'repeat(3, 86px)',
        'iterator-md': 'repeat(4, 86px)',
        'iterator-lg': 'repeat(6, 86px)',
        'iterator-rows': '128px',
      },
      width: {
        'cardpicker-md': 'calc(128px * 3 + 60px)',
        'cardpicker-sm': 'calc(128px + 20px)',
      },
      inset: {
        'card-center': 'calc(50% - 64px)',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [],
};
