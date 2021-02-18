module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
    fill: theme => ({
      light: theme('colors.purple.300'),
      dark: theme('colors.gray.500'),
    }),
  },
  variants: {
    extend: {
      fill: ['dark'],
    },
  },
  plugins: [],
};
