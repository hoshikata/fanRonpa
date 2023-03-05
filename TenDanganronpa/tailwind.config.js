/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,html.pug}'],
  theme: {
    screens: {
      xxl: { max: '1600px' },
      xl: { max: '1200px' },
      lg: { max: '992px' },
      md: { max: '768px' },
      sm: { max: '576px' },
      xs: { max: '360px' },
    },
    extend: {
      colors: {
        primary: '#30D5C8',
        secondary: '#2B5EAB',
        jumbotron: {
          900: '#050913',
          800: '#0a1227',
          700: '#0f1b3a;',
          DEFAULT: '#14244D',
        },
        highlight: '#EBC22C',
        back: '#000100',
      },
      fontFamily: {
        sans: ['Noto Sans TC', 'Noto Sans JP', 'sans-serif'],
        serif: ['Noto Serif TC', 'Noto Serif JP', 'serif'],
        Economica: ['Economica', 'Noto Sans TC', 'Noto Sans JP', 'sans-serif'],
      },
      boxShadow: {
        info: '10px 10px 0 rgba(0, 0, 0)',
        'info-sm': '6px 6px 0 rgba(0, 0, 0)',
      },
    },
  },
  plugins: [],
};
