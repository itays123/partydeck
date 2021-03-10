module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
    fill: {
      current: 'currentColor',
    },
  },
  variants: {
    extend: {
      fill: ['dark'],
      opacity: ['disabled', 'group-focus'],
      backgroundColor: ['checked'],
      borderColor: ['checked'],
    },
  },
  plugins: [],
};
