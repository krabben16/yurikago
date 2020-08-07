https://github.com/krabben27/yurikago/blob/develop/jest.config.js

# オプション

## verbose

実行中に個々のテストを報告するかどうかを示します。実行後もすべてのエラーが下に表示されます。実行中のテストファイルが1つだけの場合、デフォルトはtrueになることに注意してください。

default `false`

https://github.com/facebook/jest/blob/v26.2.2/docs/Configuration.md#verbose-boolean

## moduleNameMapper

正規表現からモジュール名やモジュール名の配列へのマップで、画像やスタイルなどのリソースを単一のモジュールでスタブアウトできるようにします。

マッピングが定義される順序は重要です。パターンは、一つが適合するまで一つずつチェックされます。最も具体的なルールを最初に列挙すべきです。これはモジュール名の配列にも当てはまります。

default `null`

https://github.com/facebook/jest/blob/v26.2.2/docs/Configuration.md#modulenamemapper-objectstring-string--arraystring
