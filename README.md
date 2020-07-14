## 開発

```sh
npm i
npm run dev
```

コーディングスタイルを統一するため、ESLintとPrettierによる構文チェックを実施します。

Gitのブランチモデルは git-flow です。

## システム構成

- Nuxt.js
- Firebase Hosting
- CircleCI

マークダウン形式で作成した記事データをHTMLに変換して表示します。

修正をGitHubのmasterブランチにマージするとCircleCIがFirebaseにデプロイします。このとき `nuxt generate` を実行して生成した静的ファイルをFirebaseにアップロードします。

## 動作検証ブラウザ

### PC

- Windows10 Google Chrome 83
- Windows10 Firefox 78

### SP

- iOS Google Chrome 83
- iOS Safari 13

## ブログを作成した背景

1. はてなブログやQiitaなどアウトプットの場所が分散していたので1箇所にまとめたかった
1. Nuxt.jsやFirebaseなど未経験の技術を勉強したかった
1. Google Analyticsの動作を検証する場所が欲しかった
