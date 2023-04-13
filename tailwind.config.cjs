/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    aspectRatio: false,
  },
  theme: {
    colors: {
      transparent: 'transparent',
      red: { light: '#f37176', DEFAULT: '#f00025' },
      blue: { light: '#8fb4ea', DEFAULT: '#2689e0' },
      light: '#fdfdfe',
      dark: '#000',
      white: '#fff',
      black: '#000',
      gold: '#FFD700',
      success: '#10B981',
      warning: '#EF4444',
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
