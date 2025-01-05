/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        'text': {
          50: 'rgb(var(--text-50))',
          100: 'rgb(var(--text-100))',
          200: 'rgb(var(--text-200))',
          300: 'rgb(var(--text-300))',
          400: 'rgb(var(--text-400))',
          500: 'rgb(var(--text-500))',
          600: 'rgb(var(--text-600))',
          700: 'rgb(var(--text-700))',
          800: 'rgb(var(--text-800))',
          900: 'rgb(var(--text-900))',
          950: 'rgb(var(--text-950))',
        },
        'background': 'rgb(var(--background))',
        'surface': 'rgb(var(--surface))',
        'card': 'rgb(var(--card))',
        'error': 'rgb(var(--error))',

        'primary': 'rgb(var(--primary))',
        'secondary': 'rgb(var(--secondary))',
        'accent': 'rgb(var(--accent))',
      },

    },
  },
  plugins: [],
}

