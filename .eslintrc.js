module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    "jest/globals": true
  },
  extends: ['plugin:react/recommended', 'standard', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', "jest"],
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
  },
}
