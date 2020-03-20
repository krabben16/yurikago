## 背景

1. はてなブログやQiitaなどアウトプットの場所が分散していたので1箇所にまとめたかった
1. Nuxt.jsやLaravelなど未経験の技術を勉強したかった
1. インフラの環境構築をしたことがなかったので経験してみたかった
1. Google Analyticsの動作を検証する場所が欲しかった

## システム構成

### フロントエンド

- Nuxt.js
- bootstrap
- Firebase

ページ遷移するとき表示するデータをバックエンドから取得して表示します。修正をGitHubのmasterブランチにマージするとCircleCIがFirebaseにデプロイします。このとき `nuxt generate` を実行して生成した静的HTMLをFirebaseに配置します。

### バックエンド（別リポジトリ）

- Laravel
- Nginx
- EC2（Amazon Linux 2）
- RDS（MySQL）

DBからデータを取得してフロントエンドにJSONを返します。DB負荷を軽減するため取得したデータをファイルにキャッシュします。（キャッシュの有効期限は1日）
