/** 
 * Getting Started with ESLint
 * https://eslint.org/docs/user-guide/getting-started
 */

/**
 * デフォルトルール
 * 
 * @nuxtjs/eslint-config-typescript
 * '@typescript-eslint/no-unused-vars': ['error', { args: 'all', argsIgnorePattern: '^_' }]
 * 
 * @nuxtjs/eslint-config
 * 'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }]
 * 
 * eslint-config-standard
 * "quote-props": ["error", "as-needed"]
 * "quotes": ["error", "single", { "avoidEscape": true, "allowTemplateLiterals": false }]
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    /**
     * 同時に以下のルールが有効になる
     * @nuxtjs/eslint-config-typescript
     * @nuxtjs/eslint-config
     * eslint-config-standard
     * eslint-plugin-vue/recommended
     */
    "@nuxtjs/eslint-config-typescript"
  ],
  rules: {
    /**
     * NOTE: @nuxtjs/eslint-config-typescript のルールを上書きする
     */

    // https://eslint.org/docs/rules/no-unused-vars
    "@typescript-eslint/no-unused-vars": [1, { args: "all", argsIgnorePattern: "^_" }],

    /**
     * NOTE: @nuxtjs/eslint-config のルールを上書きする
     */
    
     // https://eslint.org/docs/rules/arrow-parens
    "arrow-parens": [2, "as-needed", { requireForBlockBody: false }],

    /**
     * NOTE: eslint-plugin-standard のルールを上書きする
     */

    // https://eslint.org/docs/rules/quote-props
    "quote-props": [2, "consistent"],

    // https://eslint.org/docs/rules/quotes
    "quotes": [2, "double", { "avoidEscape": true, "allowTemplateLiterals": true }],
  }
}
