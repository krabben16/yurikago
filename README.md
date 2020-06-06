## 背景

1. はてなブログやQiitaなどアウトプットの場所が分散していたので1箇所にまとめたかった
1. Nuxt.jsやFirebaseなど未経験の技術を勉強したかった
1. Google Analyticsの動作を検証する場所が欲しかった

## システム構成

- Nuxt.js
- bootstrap
- Firebase Hosting

マークダウン形式で作成した記事データをHTMLに変換して表示します。

修正をGitHubのmasterブランチにマージするとCircleCIがFirebaseにデプロイします。このとき `nuxt generate` を実行して生成した静的ファイルをFirebaseにアップロードします。

開発時のコーディングスタイルを統一するためPrettierとESLintを導入しました。
