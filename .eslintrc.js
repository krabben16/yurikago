/**
 * 開発ツール 
 * https://ja.nuxtjs.org/guide/development-tools/
 * 
 * Getting Started with ESLint
 * https://eslint.org/docs/user-guide/getting-started
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:prettier/recommended'
  ],
  // *.vue ファイルを lint にかけるために必要
  plugins: [
    'vue'
  ],
  // カスタムルール
  rules: {
    /**
     * セミコロンの一貫した使用を強制する
     * never: 構文の最後のセミコロンを許可しない（[, (, /, +, -で始まる構文を除く）
     * @see https://eslint.org/docs/rules/semi
     */
    'semi': [2, 'never'],
    /**
     * consoleオブジェクトのメソッドの呼び出しを禁止する
     * @see https://eslint.org/docs/rules/no-console
     */
    'no-console': 'off',
    /**
     * 未使用の変数、関数、および関数パラメーターを排除する
     * @see https://eslint.org/docs/rules/no-unused-vars
     */
    'no-unused-vars': 1,
    /**
     * 1行あたりの属性の最大数を強制する
     * @see https://eslint.vuejs.org/rules/max-attributes-per-line.html
     */
    'vue/max-attributes-per-line': 'off',
    /**
     * 単一行要素の内容の前後に改行を強制する
     * @see https://eslint.vuejs.org/rules/singleline-html-element-content-newline.html
     */
    'vue/singleline-html-element-content-newline': 'off',
    'prettier/prettier': [
      'error', {
        /**
         * 構文の最後にセミコロンを追加する
         * false: ASIエラーを引き起こす可能性のある行の先頭のみセミコロンを追加する
         * @see https://prettier.io/docs/en/options.html#semicolons
         */
        'semi': false,
        /**
         * オブジェクトのプロパティが引用されるときに変更する
         * preserve: オブジェクトプロパティの引用符を使用できるようにする
         * @see https://prettier.io/docs/en/options.html#quote-props
         */
        'quoteProps': 'preserve',
        /**
         * 折り返す行の長さを指定する
         * @see https://prettier.io/docs/en/options.html#print-width
         */
        'printWidth': 120,
      }
    ]
  }
}
