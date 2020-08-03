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
    'eslint:recommended',
    'plugin:vue/recommended',
    '@nuxtjs/eslint-config-typescript'
  ],
  // *.vue ファイルを lint にかけるために必要
  plugins: [
    'vue'
  ],
  // カスタムルール
  rules: {
    /**
     * consoleオブジェクトのメソッドの呼び出しを禁止する
     * https://eslint.org/docs/rules/no-console
     */
    'no-console': 'off',
    /**
     * https://eslint.org/docs/rules/semi
     */
    'semi': 'off',
    /**
     * https://eslint.org/docs/rules/no-unused-vars
     */
    'no-unused-vars': 'off',
    /**
     * https://eslint.org/docs/rules/space-before-function-paren
     */
    'space-before-function-paren': 'off',
    /**
     * https://eslint.org/docs/rules/quotes
     */
    'quotes': 'off',
    /**
     * 省略構文の使用を強制する
     * https://eslint.org/docs/rules/object-shorthand
     */
    'object-shorthand': 'off',
    /**
     * オブジェクトリテラルプロパティ名を引用符で囲む
     * consistent: 一貫した引用スタイルを適用する。すべてのプロパティを引用する or どのプロパティも引用しない
     * https://eslint.org/docs/rules/quote-props
     */
    'quote-props': [2, 'consistent'],
    /**
     * アロー関数のパラメータを括弧で囲む
     * as-needed: 省略可能なブレースを強制しない
     */
    'arrow-parens': [2, 'as-needed'],
    /**
     * !! eslint/semi を拡張するルール
     * セミコロンの一貫した使用を強制する
     * never: 構文の最後のセミコロンを許可しない（[, (, /, +, -で始まる構文を除く）
     * https://github.com/typescript-eslint/typescript-eslint/blob/v3.7.1/packages/eslint-plugin/docs/rules/semi.md
     */
    '@typescript-eslint/semi': [2, 'never'],
    /**
     * !! eslint/no-unused-vars を拡張するルール
     * 未使用の変数を許可しない
     * https://github.com/typescript-eslint/typescript-eslint/blob/v3.7.1/packages/eslint-plugin/docs/rules/no-unused-vars.md
     */
    '@typescript-eslint/no-unused-vars': 1,
    /**
     * !! eslint/space-before-function-paren を拡張するルール
     * 関数の括弧の前に一定の間隔を強制する
     * never: 引数の括弧があとに続く空白を許可しない
     * https://github.com/typescript-eslint/typescript-eslint/blob/v3.7.1/packages/eslint-plugin/docs/rules/space-before-function-paren.md
     */
    '@typescript-eslint/space-before-function-paren': [2, 'never'],
    /**
     * !! eslint/quotes を拡張するルール
     * バッククォート、二重引用符、または単一引用符の一貫した使用を強制する
     * double: 可能な場合は常に二重引用符を使用する必要がある
     * allowTemplateLiterals: 文字列でバックティックを使用できるようにする
     * https://github.com/typescript-eslint/typescript-eslint/blob/v3.7.1/packages/eslint-plugin/docs/rules/quotes.md
     */
    '@typescript-eslint/quotes': [2, 'double', { 'allowTemplateLiterals': true }],
    /**
     * 1行あたりの属性の最大数を強制する
     * https://eslint.vuejs.org/rules/max-attributes-per-line.html
     */
    'vue/max-attributes-per-line': 'off',
    /**
     * 単一行要素の内容の前後に改行を強制する
     * https://eslint.vuejs.org/rules/singleline-html-element-content-newline.html
     */
    'vue/singleline-html-element-content-newline': 'off'
  }
}
