/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Lato', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#fbf7ef',
          100: '#f5edd8',
          200: '#ecdfba',
        },
        sand: {
          100: '#ead7b3',
          200: '#dcc090',
          300: '#c9a26a',
          400: '#b8884d',
          500: '#9c6f3a',
        },
        forest: {
          100: '#d4e0d6',
          400: '#4a6a52',
          600: '#2f4a37',
          700: '#22382a',
          900: '#10211a',
        },
        ink: '#1a1a1a',
      },
      boxShadow: {
        card: '0 8px 24px -12px rgba(34, 56, 42, 0.18)',
        lift: '0 20px 40px -18px rgba(34, 56, 42, 0.35)',
      },
    },
  },
  plugins: [],
};
