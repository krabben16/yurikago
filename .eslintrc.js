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
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // より厳しいルールにするには`plugin:vue/strongly-recommended` もしくは `plugin:vue/recommended` に切り替えることを検討してください。
    'plugin:vue/recommended',
    'plugin:prettier/recommended'
  ],
  // *.vue ファイルを lint にかけるために必要
  plugins: [
    'vue'
  ],
  // ここにカスタムルールを追加します。
  rules: {
    // https://eslint.org/docs/rules/semi
    // never: 行末尾のセミコロンを許可しない
    // 上記のルールに違反した場合にerror（=2）を引き起こす？
    'semi': [2, 'never'],
    'no-console': 'off',
    'no-unused-vars': 1,
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'prettier/prettier': [
      'error', {
        // https://prettier.io/docs/en/options.html#semicolons
        // false: ASIエラーを引き起こす可能性のある行の先頭のみセミコロンを追加する
        'semi': false,
        // https://prettier.io/docs/en/options.html#quote-props
        // preserve: オブジェクトプロパティの引用符を使用できるようにする
        'quoteProps': 'preserve',
        'printWidth': 120,
      }
    ]
  }
}
