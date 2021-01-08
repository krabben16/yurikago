(2021/01/09) package.jsonのバージョンと実際にインストールされるバージョンの比較

```
// packages
@nuxt/content
@nuxt/typescript-runtime
@nuxtjs/composition-api
@nuxtjs/dayjs
@nuxtjs/google-analytics
@nuxtjs/sitemap
core-js
nuxt
prism-themes
rehype-plugin-image-native-lazy-loading
vue-disqus
@nuxt/types
@nuxt/typescript-build
@nuxtjs/eslint-config
@nuxtjs/eslint-config-typescript
@nuxtjs/eslint-module
babel-eslint
eslint
eslint-config-prettier
eslint-plugin-nuxt
eslint-plugin-prettier
node-sass
prettier
sass-loader
```

```sh
for p in `cat packages`; do cat node_modules/${p}/package.json | grep \"version\"; done > versions
```

|name|package.json|node_modules|
|---|---|---|
|@nuxt/content|^1.9.0|1.11.1|
|@nuxt/typescript-runtime|^2.0.0|2.0.0|
|@nuxtjs/composition-api|^0.16.4|0.16.4|
|@nuxtjs/dayjs|^1.2.1|1.3.0|
|@nuxtjs/google-analytics|^2.4.0|2.4.0|
|@nuxtjs/sitemap|^2.4.0|2.4.0|
|core-js|^3.6.5|3.8.2|
|nuxt|^2.14.6|2.14.12|
|prism-themes|^1.5.0|1.5.0|
|rehype-plugin-image-native-lazy-loading|^1.1.0|1.1.0|
|vue-disqus|^4.0.1|4.0.1|
|@nuxt/types|^2.14.6|2.14.12|
|@nuxt/typescript-build|^2.0.3|2.0.3|
|@nuxtjs/eslint-config|^3.1.0|3.1.0|
|@nuxtjs/eslint-config-typescript|^3.0.0|3.0.0|
|@nuxtjs/eslint-module|^2.0.0|2.0.0|
|babel-eslint|^10.1.0|10.1.0|
|eslint|^7.10.0|7.17.0|
|eslint-config-prettier|^6.12.0|6.15.0|
|eslint-plugin-nuxt|^1.0.0|1.0.0|
|eslint-plugin-prettier|^3.1.4|3.3.1|
|node-sass|^4.14.1|4.14.1|
|prettier|^2.1.2|2.2.1|
|sass-loader|^9.0.3|9.0.3|

[semver | npm Docs](https://docs.npmjs.com/cli/v6/using-npm/semver#caret-ranges-123-025-004)
