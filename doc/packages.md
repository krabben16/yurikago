(2021/01/08) `create-nuxt-app` で作成したプロジェクトのpackage.jsonのバージョンと実際にインストールされるバージョンの比較

```
// packages
@nuxt/content
@nuxt/typescript-runtime
core-js
nuxt
@nuxt/types
@nuxt/typescript-build
@nuxtjs/eslint-config-typescript
@nuxtjs/eslint-module
babel-eslint
eslint
eslint-config-prettier
eslint-plugin-nuxt
eslint-plugin-prettier
eslint-plugin-vue
prettier
```

```sh
for p in `cat packages`; do cat node_modules/${p}/package.json | grep \"version\"; done > versions
```

|name|package.json|node_modules|
|---|---|---|
|@nuxt/content|^1.11.1|1.12.0|
|@nuxt/typescript-runtime|^2.0.1|2.0.1|
|core-js|^3.8.3|3.8.3|
|nuxt|^2.14.12|2.14.12|
|@nuxt/types|^2.14.12|2.14.12|
|@nuxt/typescript-build|^2.0.4|2.0.4|
|@nuxtjs/eslint-config-typescript|^5.0.0|5.0.0|
|@nuxtjs/eslint-module|^3.0.2|3.0.2|
|babel-eslint|^10.1.0|10.1.0|
|eslint|^7.18.0|7.19.0|
|eslint-config-prettier|^7.2.0|7.2.0|
|eslint-plugin-nuxt|^2.0.0|2.0.0|
|eslint-plugin-prettier|^3.3.1|3.3.1|
|eslint-plugin-vue|^7.5.0|7.5.0|
|prettier|^2.2.1|2.2.1|

[semver | npm Docs](https://docs.npmjs.com/cli/v6/using-npm/semver#caret-ranges-123-025-004)

> - ^1.2.3 ：= >=1.2.3 <2.0.0
> - ^0.2.3 ：= >=0.2.3 <0.3.0
> - ^0.0.3 ：= >=0.0.3 <0.0.4
