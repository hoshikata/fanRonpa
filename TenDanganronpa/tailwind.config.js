/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,html.pug}'],
  theme: {
    extend: {
      screens: {
        xs: { max: '360px' },
        sm: { max: '576px' },
        md: { max: '768px' },
        lg: { max: '992px' },
        xl: { max: '1200px' },
        xxl: { max: '1600px' },
      },
      colors: {
        primary: '#BE3482',
        back: '#000100',
      },
      fontFamily: {
        sans: ['Noto Sans TC', 'Noto Sans JP', 'sans-serif'],
        serif: ['Noto Serif TC', 'Noto Serif JP', 'serif'],
      },
    },
  },
  plugins: [],
};
