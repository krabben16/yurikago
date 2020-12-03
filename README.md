## 開発

```shell
yarn install
yarn dev
```

Gitのブランチモデルは git-flow です。

## システム構成

- 修正をmasterブランチにマージするとCircleCIがFirebaseにデプロイします。このとき `nuxt generate` を実行して生成した静的ファイルをFirebaseにアップロードします。
