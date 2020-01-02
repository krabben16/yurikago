---
title: Googleクローラーが画像の遅延読み込みを認識できるかどうか検証する
date: "2020-01-03"
description: ""
---

## 概要

サイトに画像の遅延読み込みを導入したとき、クローラーが遅延読み込みを認識できるかどうかはページの評価に関わるため重要です。

認識の可否をどうやって検証するかというと、検証のためのスクリプトをPuppeteer公式が提供してくれています。

[puppeteer/examples](https://github.com/puppeteer/examples)

> lazyimages\_without\_scroll\_events.js

> Determine if your lazy loaded images will be seen correctly by Google Search.

また、Googleのドキュメントには上記のスクリプトを使ったテスト方法の記述があります。

[遅延読み込みコンテンツを Google が認識できるようにする](https://developers.google.com/search/docs/guides/lazy-loading?hl=ja)

> 実装の設定が済んだら、正しく機能することを確認する必要があります。その方法の 1 つとして、Puppeteer スクリプトを使用し、実装をローカルでテストできます。

以下、スクリプトを実行する方法をまとめます。

## 検証環境

- Docker Toolbox 19.03.1
- VirtualBox 5.2.34
    - CentOS 7
    - Node.js 12.14.0
    - Puppeteer 2.0.0
    - Chromium 727972
    
## ディレクトリ構成

```
/
  - src
  - docker-compose.yml
  - Dockerfile
```

```yml:title=docker-compose.yml
version: '3'
services:
  app:
    build:
      context: ./
    image: image-lazyimages-app
    container_name: container-lazyimages-app
    volumes:
      - ./src:/root/src
    tty: true
```

```Dockerfile:title=Dockerfile
FROM centos:7

# Node.jsをインストール
#   NodeSource Node.js Binary Distributions
#   https://github.com/nodesource/distributions/blob/master/README.md#deb
RUN curl -sL https://rpm.nodesource.com/setup_12.x | bash -
RUN yum install -y nodejs

# Puppeteerを実行するために不足しているモジュールをインストール
#   Chrome headless doesn't launch on UNIX
#   https://github.com/puppeteer/puppeteer/blob/master/docs/troubleshooting.md#chrome-headless-doesnt-launch-on-unix
RUN yum install -y pango.x86_64 \
libXcomposite.x86_64 \
libXcursor.x86_64 \
libXdamage.x86_64 \
libXext.x86_64 \
libXi.x86_64 \
libXtst.x86_64 \
cups-libs.x86_64 \
libXScrnSaver.x86_64 \
libXrandr.x86_64 \
GConf2.x86_64 \
alsa-lib.x86_64 \
atk.x86_64 \
gtk3.x86_64 \
ipa-gothic-fonts \
xorg-x11-fonts-100dpi \
xorg-x11-fonts-75dpi \
xorg-x11-utils \
xorg-x11-fonts-cyrillic \
xorg-x11-fonts-Type1 \
xorg-x11-fonts-misc
RUN yum update nss -y

# 以降の工程で必要なモジュールをインストール
RUN yum install -y git unzip

# Chromiumをダウンロード
RUN git clone https://github.com/scheib/chromium-latest-linux /root/chromium
RUN /root/chromium/update.sh

# PuppeteerをインストールするときChromiumをインストールしないようにする
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# グローバルインストールしたnpmモジュールをrequireするときに参照するパスを変更
#   デフォルトは/node_modules
ENV NODE_PATH /usr/lib/node_modules

# lazyimages_without_scroll_events.jsを実行するために必要なモジュールをインストール
RUN npm install -g puppeteer pixel-diff pngjs resize-img yargs
```

## Examplesをダウンロード

```
# git clone https://github.com/GoogleChromeLabs/puppeteer-examples /root/src
```

### jsファイルを一部書き換え

```js:title=lazyimages_without_scroll_events.js
const browser = await puppeteer.launch({
  executablePath: '/root/chromium/latest/chrome',
  args: ['--no-sandbox'],
  headless: true,
  defaultViewport: DEFAULT_VIEWPORT,
});
```

## 実行

```
# cd /root/src
# node lazyimages_without_scroll_events.js -u https://css-tricks.com/examples/LazyLoading/ -o output/result.html
```

## 結果

スクリプトを実行するとHTMLが出力されます。

もし遅延読み込みを認識できない場合は "FAILED" と表示されます。

![result.png](./result.png)

対応方法として

1. スクロール以外のイベントで遅延読み込みするライブラリを使う
2. Intersection ObserverとPolyfillを使う

などがあります。

## 補足：スマホ表示の検証

スクリプトの中でユーザーエージェントを指定すると対応可能です。

```js
await page.setUserAgent('Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)')
```

[puppeteerを使ってlazyloadがSEOフレンドリーかどうか確認する](https://qiita.com/paranishian/items/22aef0ee333b6ff971eb)

またはデバイスを指定する方法があります。

```js
await page.emulate(devices['iPhone 6']);
```

[E2Eテストツールはpuppeteerがいいと思う](https://masalib.hatenablog.com/entry/2017/09/12/212014)
