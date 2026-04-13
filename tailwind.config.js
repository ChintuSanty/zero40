/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        black:    '#0D0D0D',
        amber:    '#D4860B',
        gold:     '#F0A500',
        offwhite: '#F5F0E8',
        copper:   '#8B4E1E',
      },
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        sans:    ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
