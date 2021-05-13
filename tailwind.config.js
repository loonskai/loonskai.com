
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
        main: 'var(--color-main)',
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)'
      },
      backgroundColor: {
        main: 'var(--color-main)',
        primary: 'var(--color-bg-primary)',
        secondary: 'var(--color-bg-secondary)'
      },
      fontFamily: {
        serif: ['Tiempos Headline', ...fontFamily.serif],
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
