/** 
 * Getting Started with ESLint
 * https://eslint.org/docs/user-guide/getting-started
 */ 

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    // eslint-config-prettier
    'prettier',
    'prettier/vue',
    // eslint-plugin-prettier
    'plugin:prettier/recommended',
    // eslint-plugin-nuxt
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    // eslintのquote-propsはeslint-config-prettierでoffになっている
    // https://github.com/prettier/eslint-config-prettier/blob/v6.15.0/index.js#L69

    // prettierのquote-propsはデフォルトでas-neededになっている
    // https://prettier.io/docs/en/options.html#quote-props
  },
}
