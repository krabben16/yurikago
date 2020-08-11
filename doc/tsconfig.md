https://github.com/nerukani/yurikago/blob/develop/tsconfig.json

# compilerOptions

## target

target設定は、どのJS機能が古いJavaScript構文にトランスパイルされ、どの機能がそのまま残されるかを変更します。例えばtargetがES5以下である場合、アロー関数 `() => this` は等価なfunction式へ変換されます。

targetの変更はlibのデフォルト値も変更します。必要に応じてtargetとlibの値を組み合わせることも可能ですが、簡単にtargetの値のみを設定することも可能です。

default `ES3`

https://www.typescriptlang.org/tsconfig#target

## module

おそらく"CommonJS"が求められるでしょう。

default `ES6/ES2015 (synonymous, default for target ES6 and higher)`

https://www.typescriptlang.org/tsconfig#module

※ESNext = ECMAScriptの次のバージョン

## moduleResolution

モジュール解決の方法を"node"（Node.js）または"classic"（TypeScript pre-1.6）から設定します。おそらく利用する必要はないでしょう。

default `module === AMD, System or ES6 then Classic Otherwise Node`

https://www.typescriptlang.org/tsconfig#moduleResolution

## lib

TypeScriptには組み込みのJS API（例：Math）の型定義や、ブラウザーで利用されるAPI（例：document）の型定義がデフォルトで組み込まれています。指定したtargetに合致する新しいJS機能のAPIの型定義もTypeScriptには組み込まれています。例えば、Mapの定義はtargetがES6かそれよりも新しいときに利用可能です。

default `targetによって変化する`

https://www.typescriptlang.org/tsconfig#lib

### ESNext

ESNextで利用可能なAPI - JavaScriptの仕様変遷によって内容は変化します。

### DOM

DOMの型定義 - windowやdocumentなど。

## esModuleInterop

すべてのインポートに対してNamespaceオブジェクトを生成することによって、CommonJSとES Modules間で相互運用可能なコードを出力します。

このコンパイラフラグを有効化すると、`allowSyntheticDefaultImports` も有効化されます。

default `false`

https://www.typescriptlang.org/ja/tsconfig#esModuleInterop

## allowJs

.ts、.tsxファイルだけでなく、JavaScriptファイルをプロジェクトへインポートできるようにします。

default `false`

https://www.typescriptlang.org/ja/tsconfig#allowJs

## sourceMap

ソースマップファイルの生成を有効化します。これらのファイルにより、出力されたJavaScriptファイルが実際に動作させるときに、デバッガーやその他のツールが元のTypeScriptソースファイルを表示できるようになります。ソースマップファイルは.js.map（または.jsx.map）として、対応する.jsファイルとともに出力されます。

default `false`

https://www.typescriptlang.org/ja/tsconfig#sourceMap


## strict

strictフラグは、プログラムの正しさを強く保証するための幅広い型チェックの挙動を有効化します。このオプションの有効化は、以降で述べるすべてのstrictモードファミリーオプションの有効化と等価です。必要に応じて、個別のstrictモードファミリーを無効化できます。

default `false`

https://www.typescriptlang.org/ja/tsconfig#strict

## noEmit

JavaScriptソースコード、ソースマップ、型定義のファイルを出力しないようにします。

default `false`

https://www.typescriptlang.org/ja/tsconfig#noEmit

## baseUrl

絶対パス参照でないモジュール名を解決するための基点となるディレクトリを設定できます。

`"baseUrl": "./"` とすると、このプロジェクト内では、TypeScriptはtsconfig.jsonと同じフォルダからファイルの探索を行います。

https://www.typescriptlang.org/ja/tsconfig#baseUrl

## paths

baseUrlからの相対的な検索場所にインポートを再マッピングするエントリです。

※baseUrlの設定が必要

https://www.typescriptlang.org/ja/tsconfig#paths

## types

デフォルトでは、すべての表示されている"@types"パッケージがコンパイル時にインクルードされます。

typesを設定すると、リストに列挙したパッケージのみがインクルードされます。

https://www.typescriptlang.org/ja/tsconfig#types
