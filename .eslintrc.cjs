module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    // 'plugin:jsx-a11y/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:prettier/recommended',
    'next/core-web-vitals',
    'next/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['simple-import-sort'],
  rules: {

    // we're using TypeScript here, not propTypes!
    'react/prop-types': 'off',

    // obscure error that we don't need
    'react/display-name': 'off',

    // to avoid "no-unused-vars" warnings in function type declarations
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',

    // imports
    'import/prefer-default-export': 0,
    'import/no-anonymous-default-export': 0,

    // sort alias imports that start with `@` separately from modules that start with `@`
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [['^\\u0000'], ['^@?\\w'], ['^@src', '^@shared'], ['^\\.']],
      },
    ],
    'simple-import-sort/exports': 'warn',
    'sort-imports': 'off',
    'import/order': 'off',
  },
};
