// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import prettier from 'eslint-plugin-prettier'
import jest from 'eslint-plugin-jest'
import importPlugin from 'eslint-plugin-import'
import promisePlugin from 'eslint-plugin-promise'

export default [
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', 'coverage/**', '.env*'],
  },

  js.configs.recommended,
  react.configs.flat['jsx-runtime'],

  {
    files: ['**/*.{js,jsx}'],

    plugins: {
      react,
      'react-hooks': reactHooks,
      prettier,
      jest,
      import: importPlugin,
      promise: promisePlugin,
    },

    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
        ...globals.jest,
      },

      parserOptions: {
        ecmaFeatures: { jsx: true, sourceType: 'module' },
      },
    },

    settings: {
      react: {
        version: '18.2.0', // or 'detect'
      },
      'import/resolver': {
        node: { extensions: ['.js', '.jsx'] },
      },
    },

    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...{
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-uses-vars': 'error',
        // 'prettier/prettier': 'warn',
      },
    },
  },
]
