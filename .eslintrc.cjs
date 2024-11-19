const path = require('path');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    createDefaultProgram: true,
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['@typescript-eslint', 'import', 'prettier', 'react', 'react-hooks'],
  rules: {
    'no-console': 'warn',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        alphabetize: {
          order: 'asc',
        },
        pathGroups: [
          {
            pattern: './**/*.scss',
            group: 'sibling',
            position: 'after',
          },
        ],
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.scss', '.svg', '.png', '.jpg', ],
    },
    'import/resolver': {
      alias: {
        map: [
          ['@', path.resolve(__dirname, 'src')],
          ['@components', path.resolve(__dirname, 'src/components')],
          ['@assets', path.resolve(__dirname, 'src/assets')],
          ['@utils', path.resolve(__dirname, 'src/utils')],
          ['@services', path.resolve(__dirname, 'src/services')],
          ['@styles', path.resolve(__dirname, 'src/styles')],
          ['@types', path.resolve(__dirname, 'src/types')],
          ['@config', path.resolve(__dirname, 'src/config')],
          ['@pages', path.resolve(__dirname, 'src/pages')],
          ['@store', path.resolve(__dirname, 'src/store')],
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.svg']
      },
      typescript: {
        project: path.resolve(__dirname,'./tsconfig.json'),
      },
    },
    'import/external-module-folders': ['node_modules', 'node_modules/@types'],
    react: {
      version: 'detect',
    },
  },
};
