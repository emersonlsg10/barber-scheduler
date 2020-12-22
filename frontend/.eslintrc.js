module.exports = {
  parser: 'babel-eslint',
  plugins: ['react', 'prettier'],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
      },
    ],
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['./'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: {
      version: require('./package.json').dependencies.react,
    },
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
};
