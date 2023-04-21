/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00B214',
        'primary-hover': '#026D0E',
        'primary-light': '#8cca46',
        'header-blue': '#0000ff',
        'header-dark': '#0a0a0a',
        dark: '#282828',
        'dark-light': 'rgba(102,102,102,0.7)',
        red: '#ff0000'
      }
    }
  },
  plugins: []
};
