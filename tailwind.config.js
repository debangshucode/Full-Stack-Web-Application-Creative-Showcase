/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          primary: '#4D2B8C',
          secondary: '#85409D',
          accent: '#EEA727',
          highlight: '#FFEF5F',
        },
        dark: {
          primary: '#2A004E',
          secondary: '#500073',
          accent: '#C62300',
          highlight: '#F14A00',
        },
      },
    },
  },
  plugins: [],
};
