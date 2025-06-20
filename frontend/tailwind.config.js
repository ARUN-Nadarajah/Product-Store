module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('@headlessui/tailwindcss')],
  variants: {
    extend: {
      display: ['group-data-open'], // add custom variants if necessary
    },
  },
};