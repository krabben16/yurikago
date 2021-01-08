(2021/01/08) `create-nuxt-app` で作成したプロジェクトのpackage.jsonのバージョンと実際にインストールされるバージョンの比較

```
// packages
@nuxt/content
@nuxt/typescript-runtime
core-js
nuxt
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
prettier
```

```sh
for p in `cat packages`; do cat node_modules/${p}/package.json | grep \"version\"; done > versions
```

|name|package.json|node_modules|
|---|---|---|
|@nuxt/content|^1.9.0|1.11.1|
|@nuxt/typescript-runtime|^2.0.0|2.0.0|
|core-js|^3.6.5|3.8.2|
|nuxt|^2.14.6|2.14.12|
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
|prettier|^2.1.2|2.2.1|

[semver | npm Docs](https://docs.npmjs.com/cli/v6/using-npm/semver#caret-ranges-123-025-004)

> - ^1.2.3 ：= >=1.2.3 <2.0.0
> - ^0.2.3 ：= >=0.2.3 <0.3.0
> - ^0.0.3 ：= >=0.0.3 <0.0.4
