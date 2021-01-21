module.exports = {
  root: true,
  env: {
    browser: true,
    es5:true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        useTabs: false,
        tabWidth: 2,
        printWidth: 80,
        bracketSpacing: true,
        arrowParens: 'avoid',
      },
    ],
  },
};
