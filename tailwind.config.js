
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./components/**/*.js', './pages/**/*.js'],
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
