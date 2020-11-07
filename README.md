## 開発

```shell
cp .env.dist .env
npm i
npm run dev
```

Gitのブランチモデルは git-flow です。

## システム構成

- 修正をmasterブランチにマージするとCircleCIがFirebaseにデプロイします。このとき `nuxt generate` を実行して生成した静的ファイルをFirebaseにアップロードします。
