/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        'text': 'var(--text)',
        'text-muted': 'var(--text-muted)',
        'text-muted-extra': 'var(--text-muted-extra)',

        'background': 'var(--background)',
        'card': 'var(--card)',
        'element': 'var(--element)',
        'element-hover': 'var(--element-hover)',

        'border': 'var(--border)',

        'default': 'var(--default)',
        'hover': 'var(--hover)',
        'active': 'var(--active)',
        'disabled': 'var(--disabled)',

        'success': 'var(--success)',
        'warning': 'var(--warning)',
        'error': 'var(--error)',
      },

    },
  },
  plugins: [],
}

