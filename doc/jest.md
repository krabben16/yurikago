https://github.com/krabben27/yurikago/blob/develop/jest.config.js

# オプション

## verbose

実行中に個々のテストを報告するかどうかを示します。実行後もすべてのエラーが下に表示されます。実行中のテストファイルが1つだけの場合、デフォルトはtrueになることに注意してください。

default `false`

https://github.com/facebook/jest/blob/v26.2.2/docs/Configuration.md#verbose-boolean

## transform

正規表現からトランスフォーマーへのパスへのマップです。トランスフォーマとは、ソースファイルを変換するための同期機能を提供するモジュールのことです。例えば、node がまだサポートしていない新しい言語機能をモジュールやテストで使えるようにしたい場合、将来のバージョンの JavaScript を現在のバージョンの JavaScript にコンパイルする多くのコンパイラのうちの 1 つをプラグインすることができます。例: examples/typescript の例や webpack チュートリアルを参照してください。

注意: コード変換器を追加する場合、これはデフォルトの設定を上書きし、babel-jestは自動的にロードされなくなります。JavaScript や Typescript のコンパイルに使用する場合は、明示的に {"^.+\....[jt]sx?$". "babel-jest"}をtransformプロパティに追加して明示的に定義する必要があります。babel-jestプラグインを参照。

default `{"^.+\\.[jt]sx?$": "babel-jest"}`

https://github.com/facebook/jest/blob/v26.2.2/docs/Configuration.md#transform-objectstring-pathtotransformer--pathtotransformer-object

## moduleNameMapper

正規表現からモジュール名やモジュール名の配列へのマップで、画像やスタイルなどのリソースを単一のモジュールでスタブアウトできるようにします。

マッピングが定義される順序は重要です。パターンは、一つが適合するまで一つずつチェックされます。最も具体的なルールを最初に列挙すべきです。これはモジュール名の配列にも当てはまります。

default `null`

https://github.com/facebook/jest/blob/v26.2.2/docs/Configuration.md#modulenamemapper-objectstring-string--arraystring
