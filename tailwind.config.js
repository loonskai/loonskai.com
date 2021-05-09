
const { fontFamily } = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './context/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      textColor: {
        skin: {
          base: 'var(--color-text-base)'
        },
      },
      backgroundColor: {
        skin: {
          base: 'var(--color-fill)',
          content: 'var(--color-content-fill)',
        },
      },
      fontFamily: {
        serif: ['Orelega One', ...fontFamily.serif],
        sans: ['Roboto', ...fontFamily.sans]
      }
    },
  },
  variants: {},
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.border-main': {
          borderColor: 'var(--color-main)',
        },
      });
    }),
  ]
}
