## 開発

```shell
cp .env.dist .env
npm i
npm run dev
```

Gitのブランチモデルは git-flow です。

## システム構成

- 修正をdevelopブランチにマージするとCircleCIがJestのユニットテストを実行します。テストのエラーが発生した場合はこの時点で不具合を検出できます。
- 修正をmasterブランチにマージするとCircleCIがFirebaseにデプロイします。このとき `nuxt generate` を実行して生成した静的ファイルをFirebaseにアップロードします。

## ブログを作成した背景

1. はてなブログやQiitaなどアウトプットの場所が分散していたので1箇所にまとめたかった
1. Nuxt.jsやFirebaseなど未経験の技術を勉強したかった
1. Google Analyticsの動作を検証する場所が欲しかった
