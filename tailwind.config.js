/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#b9dcff',
          300: '#7cc0ff',
          400: '#3aa0ff',
          500: '#0d7ff2',
          600: '#0062cf',
          700: '#004ea7',
          800: '#00438a',
          900: '#003872',
        },
      },
      boxShadow: {
        card: '0 20px 60px -20px rgba(13, 127, 242, 0.25)',
      },
    },
  },
  plugins: [],
}
