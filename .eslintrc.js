module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/typescript/recommended'],
  /* extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/typescript/recommended', '@vue/prettier', '@vue/prettier/@typescript-eslint',"plugin:vue/vue3-recommended"], */
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-unused-components': 1,
    semi: 1,
    'prefer-const': 0,
    quotes: [1, 'single'],
    'object-shorthand': 1,
    camelcase: 1,
    'indent': [2, 2, {
      'SwitchCase': 1
    }],
    '@typescript-eslint/no-explicit-any': ["off", { "ignoreRestArgs": false }],
    '@typescript-eslint/no-empty-function': 1,
    '@typescript-eslint/no-var-requires': 1,
    '@typescript-eslint/ban-types': 2,
    '@typescript-eslint/class-name-casing': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/no-var-requires":0,
    'prettier/prettier': [
      'off',
      {
        singleQuote: true,
        trailingComma: 'none',
        bracketSpacing: true,
        jsxBracketSameLine: true,
        sortAttributes: true,
        'key-spacing': false
      }
    ]
  }
};
