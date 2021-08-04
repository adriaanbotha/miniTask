module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'eslint:recommended',
    "plugin:vue/vue3-recommended",
    "**prettier**"
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-expressions': 0,
    'template-curly-spacing': 'off',
    'indent': ['error', 2, { 'ignoredNodes': ['TemplateLiteral'] }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}

