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
      }
    },
  },
  variants: {},
  plugins: []
}
