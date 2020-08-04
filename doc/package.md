# Nuxt

## Google Analytics

```
npm install @nuxtjs/google-analytics
```

## サイトマップXML

```
npm install @nuxtjs/sitemap
```

## TypeScript

```
npm install --save-dev @nuxt/typescript-build @nuxt/types
```

https://typescript.nuxtjs.org/ja/guide/setup.html

# Vue

## Disqus

```
npm install vue-disqus
```

## Social Sharing

```
npm install vue-social-sharing
```

ソーシャルボタン

# Webpack

```
npm install raw-loader
```

ファイルを文字列としてimportできるWebpackのローダー

https://github.com/webpack-contrib/raw-loader

# HTML

## マークダウンパーサー

```
npm install marked
```

## シンタックスハイライト

```
npm install highlight.js
```

# Sass

```
npm install --save-dev node-sass sass-loader
```

https://ja.nuxtjs.org/api/configuration-css/

# リントツール

## vue, js

```
npm install --save-dev babel-eslint eslint eslint-config-prettier eslint-loader eslint-plugin-vue eslint-plugin-prettier prettier
```

https://ja.nuxtjs.org/guide/development-tools/

|パッケージ名|説明|url|
|---|---|---|
|babel-eslint|Babelによって変換されたソースコードでESLintを実行できるようにする|https://github.com/babel/babel-eslint|
|eslint-config-prettier|Prettierと競合する可能性のある（ESLintの）すべてのルールをオフにする|https://github.com/prettier/eslint-config-prettier|
|eslint-loader|WebpackのESLintローダー|https://github.com/webpack-contrib/eslint-loader|
|eslint-plugin-vue|Vue.jsのESLintプラグイン|https://github.com/vuejs/eslint-plugin-vue|
|eslint-plugin-prettier|PrettierをESLintのルールとして実行し、差異をESLintの問題として報告する|https://github.com/prettier/eslint-plugin-prettier|

## vue, js, ts

```
npm i -D @nuxtjs/eslint-config-typescript
```

https://typescript.nuxtjs.org/ja/guide/lint.html

> ESlint が TypeScript パーサー（@typescript-eslint/parser）を使用するようにするために、parserOptions.parser オプションが拡張した他の設定等によってオーバーライドされないことを確認してください。

> パーサーとして babel-eslint を使用していた場合は、.eslintrc.js と依存関係から削除してください。

### 依存関係

#### @nuxtjs/eslint-config-typescript

```json
  "dependencies": {
    "@nuxtjs/eslint-config": "3.1.0",
    "@typescript-eslint/eslint-plugin": "^3.7.0",
    "@typescript-eslint/parser": "^3.7.0"
  },
```

https://github.com/nuxt/eslint-config/blob/%40nuxtjs/eslint-config-typescript%403.0.0/packages/eslint-config-typescript/package.json

```js
module.exports = {
  extends: [
    '@nuxtjs'
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { args: 'all', argsIgnorePattern: '^_' }]
  }
}
```

https://github.com/nuxt/eslint-config/blob/%40nuxtjs/eslint-config-typescript%403.0.0/packages/eslint-config-typescript/index.js

※ `extends: ['@nuxtjs']` => `@nuxtjs/eslint-config` のルールを有効にする

※ `plugins: ['@typescript-eslint']` => `@typescript-eslint/eslint-plugin` のルールを追加する

#### @nuxtjs/eslint-config

```json
  "dependencies": {
    "eslint-config-standard": "^14.1.1",
    "eslint-plugin-import": "2.22.0",
    "eslint-plugin-jest": "^23.18.2",
    "eslint-plugin-node": "^11.1.0",
    "eslint-plugin-promise": "^4.2.1",
    "eslint-plugin-standard": "^4.0.1",
    "eslint-plugin-unicorn": "^21.0.0",
    "eslint-plugin-vue": "^6.2.2"
  },
  "peerDependencies": {
    "eslint": "^7.5.0"
  },
```

https://github.com/nuxt/eslint-config/blob/%40nuxtjs/eslint-config%403.1.0/packages/eslint-config/package.json

```js
module.exports = {
  env: {
    browser: true,
    node: true,
    'jest/globals': true
  },
  extends: [
    'standard',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:vue/recommended'
  ],
  plugins: [
    'jest',
    'unicorn',
    'vue'
  ],
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.mjs'] }
    }
  },
  rules: {
:
  }
}
```

https://github.com/nuxt/eslint-config/blob/%40nuxtjs/eslint-config%403.1.0/packages/eslint-config/index.js

※ `extends: ['standard']` => `eslint-config-standard` のルールを有効にする

※ `extends: ['plugin:vue/recommended']` => `eslint-plugin-vue/recommended` のルールを有効にする

#### eslint-config-standard

https://github.com/standard/eslint-config-standard/blob/v14.1.1/eslintrc.json

#### eslint-plugin-vue/recommended

https://github.com/vuejs/eslint-plugin-vue/blob/v6.2.2/lib/configs/recommended.js

# テストツール

```
npm install --save-dev @babel/core @babel/preset-env
```

```
npm install --save-dev jest babel-jest
```

https://qiita.com/riversun/items/6c30a0d0897194677a37

|パッケージ名|説明|url|
|---|---|---|
|@babel/preset-env|ターゲットのブラウザーまたはランタイム環境に基づいて必要なBabelプラグインとポリフィルを自動的に決定し、ES2015+をES5にコンパイルする|https://github.com/babel/babel-preset-env|

# デプロイツール

```
npm install --save-dev firebase-tools
```

https://qiita.com/nakata_kazuhiro/items/53c7f06900ae3156e07b
