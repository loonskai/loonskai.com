module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 8,
  },
  ignorePatterns: ['node_modules/*', '.next/*', '.out/*', '!.prettierrc.js'],
  extends: ['eslint:recommended'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: { react: { version: 'detect' } },
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'prettier',
      ],
      plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
      rules: {
        'react/no-unescaped-entities': 'off',
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/self-closing-comp': 2,
        'react/jsx-first-prop-new-line': [2, 'multiline'],
        'react/jsx-max-props-per-line': [2, { maximum: 1, when: 'multiline' }],
        'react/jsx-indent-props': [2, 2],
        'react/jsx-closing-bracket-location': [2, 'line-aligned'],
        'react/jsx-wrap-multilines': [
          2,
          {
            declaration: 'parens-new-line',
            assignment: 'parens-new-line',
            return: 'parens-new-line',
            arrow: 'parens-new-line',
          },
        ],
        "react/no-unknown-property": ["error", { "ignore": ["css"] }],
        'jsx-a11y/anchor-is-valid': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        indent: ['error', 2],
        'comma-dangle': ['error', 'always-multiline'],
        'object-curly-spacing': ['error', 'always'],
        '@typescript-eslint/no-empty-function': ['error'],
      },
    },
  ],
}
