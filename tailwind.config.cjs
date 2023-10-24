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
      red: { light: '#ef4444', DEFAULT: '#dc2626' },
      blue: { light: '#3b82f6', DEFAULT: '#2563eb' },
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
