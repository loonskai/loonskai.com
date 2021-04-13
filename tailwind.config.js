
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      textColor: {
        skin: {
          base: 'var(--color-text-base)'
        }
      },
      backgroundColor: {
        skin: {
          base: 'var(--color-fill)'
        }
      },
      fontFamily: {
        serif: ['Orelega One', ...fontFamily.serif],
        sans: ['Roboto', ...fontFamily.sans]
      }
    },
  },
  variants: {},
  plugins: []
}
