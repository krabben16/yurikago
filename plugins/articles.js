import { getTagByName } from "~/plugins/tags.js"

import content1 from "~/assets/markdown/articles/1.md"
import content2 from "~/assets/markdown/articles/2.md"
import content3 from "~/assets/markdown/articles/3.md"
import content4 from "~/assets/markdown/articles/4.md"
import content5 from "~/assets/markdown/articles/5.md"
import content6 from "~/assets/markdown/articles/6.md"
import content7 from "~/assets/markdown/articles/7.md"
import content8 from "~/assets/markdown/articles/8.md"
import content9 from "~/assets/markdown/articles/9.md"
import content10 from "~/assets/markdown/articles/10.md"
import content11 from "~/assets/markdown/articles/11.md"
import content12 from "~/assets/markdown/articles/12.md"
import content13 from "~/assets/markdown/articles/13.md"
import content14 from "~/assets/markdown/articles/14.md"
import content15 from "~/assets/markdown/articles/15.md"
import content16 from "~/assets/markdown/articles/16.md"
import content17 from "~/assets/markdown/articles/17.md"

const articles = [
  {
    "id": 1,
    "title": "CentOS7 Tesseract3.04をビルドして実行する",
    "posted_at": "2018-07-09",
    "tags": [getTagByName("CentOS"), getTagByName("Tesseract")],
    "content": content1
  },
  {
    "id": 2,
    "title": "CentOS7 Puppeteerを実行してスクリーンショット画像を作成する",
    "posted_at": "2018-12-20",
    "tags": [getTagByName("CentOS"), getTagByName("Chromium"), getTagByName("Node.js"), getTagByName("Puppeteer")],
    "content": content2
  },
  {
    "id": 3,
    "title": "Chrome SeleniumIDE 配列を定義してループする",
    "posted_at": "2019-03-14",
    "tags": [getTagByName("Google Chrome"), getTagByName("Selenium")],
    "content": content3
  },
  {
    "id": 4,
    "title": "CentOS7 CLIでLighthouseを実行する",
    "posted_at": "2019-07-28",
    "tags": [getTagByName("CentOS"), getTagByName("Node.js"), getTagByName("Puppeteer"), getTagByName("Lighthouse")],
    "content": content4
  },
  {
    "id": 5,
    "title": "Alpine Linux 3.10.3 Python3 NLTKを実行する",
    "posted_at": "2019-12-19",
    "tags": [getTagByName("Alpine Linux"), getTagByName("NLTK"), getTagByName("Python")],
    "content": content5
  },
  {
    "id": 6,
    "title": "Homestead PostgreSQLにHeidiSQLで接続する",
    "posted_at": "2019-12-30",
    "tags": [getTagByName("Homestead"), getTagByName("HeidiSQL"), getTagByName("PostgreSQL")],
    "content": content6
  },
  {
    "id": 7,
    "title": "CentOS6 Xdebug+VSCodeでPHP5.3をデバッグする",
    "posted_at": "2020-01-01",
    "tags": [getTagByName("CentOS"), getTagByName("PHP"), getTagByName("VSCode"), getTagByName("Xdebug")],
    "content": content7
  },
  {
    "id": 8,
    "title": "Googleクローラーが画像の遅延読み込みを認識できるかどうか検証する",
    "posted_at": "2020-01-03",
    "tags": [getTagByName("Chromium"), getTagByName("Node.js"), getTagByName("Puppeteer")],
    "content": content8
  },
  {
    "id": 9,
    "title": "記事ページにWebP画像を表示する",
    "posted_at": "2020-01-05",
    "tags": [getTagByName("Marked.js"), getTagByName("Nuxt.js")],
    "content": content9
  },
  {
    "id": 10,
    "title": "JavaScriptはDOMツリーの構築中に実行される",
    "posted_at": "2020-01-14",
    "tags": [getTagByName("Google Chrome"), getTagByName("JavaScript"), getTagByName("HTML")],
    "content": content10
  },
  {
    "id": 11,
    "title": "Nuxt.js サイトマップXMLを動的に出力する",
    "posted_at": "2020-01-21",
    "tags": [getTagByName("Nuxt.js"), getTagByName("Postman")],
    "content": content11
  },
  {
    "id": 12,
    "title": "Nuxt.js Disqusのコメントフォームを表示する",
    "posted_at": "2020-01-27",
    "tags": [getTagByName("Google Chrome"), getTagByName("Nuxt.js"), getTagByName("Disqus")],
    "content": content12
  },
  {
    "id": 13,
    "title": "Nuxt.js Homesteadにhttpsでリクエストしてレスポンスを取得する",
    "posted_at": "2020-02-02",
    "tags": [getTagByName("Node.js"), getTagByName("Homestead"), getTagByName("Nuxt.js")],
    "content": content13
  },
  {
    "id": 14,
    "title": "JavaScript 整数の連番を配列として取得する",
    "posted_at": "2020-02-05",
    "tags": [getTagByName("JavaScript")],
    "content": content14
  },
  {
    "id": 15,
    "title": "PHP5.3 全角ひらがなの濁点を削除する",
    "posted_at": "2020-03-25",
    "tags": [getTagByName("PHP")],
    "content": content15
  },
  {
    "id": 16,
    "title": "curlでHTTPステータスコードを取得する",
    "posted_at": "2020-04-27",
    "tags": [getTagByName("cURL")],
    "content": content16
  },
  {
    "id": 17,
    "title": "画像をIE11でpreloadする",
    "posted_at": "2020-07-10",
    "tags": [getTagByName("JavaScript"), getTagByName("HTML")],
    "content": content17
  }
]

/**
 * 記事データの合計数を取得する
 */
export const getTotalArticleCount = () => {
  return articles.length
}

/**
 * 記事IDから記事データを取得する
 * @param {Number} id
 */
export const getArticleById = id => {
  const article = articles.filter(a => a.id === id)
  // 配列からオブジェクトを取り出す
  return article.shift()
}

/**
 * ページ番号から記事リストを取得する
 * @param {Number} page
 */
export const getArticlesByPage = page => {
  if (page === 1) {
    const start = 0
    const end = process.env.MAX_ARTICLE_COUNT_IN_LIST
    return sortArticlesByIdDesc(articles).slice(start, end)
  }

  // page = 2
  // start = 10 * (2 - 1) = 10
  // end = 10 * 2 = 20
  const start = process.env.MAX_ARTICLE_COUNT_IN_LIST * (page - 1)
  const end = process.env.MAX_ARTICLE_COUNT_IN_LIST * page
  return sortArticlesByIdDesc(articles).slice(start, end)
}

/**
 * タグIDから記事リストを取得する
 * @param {Number} tagId
 */
export const getArticlesByTagId = tagId => {
  const ret = []
  sortArticlesByIdDesc(articles).map(a => {
    a.tags.map(t => {
      if (t.id === tagId) {
        ret.push(a)
      }
    })
  })
  return ret
}

/**
 * 記事リストをIDの降順で並び替える
 * @param {Array} articles
 */
const sortArticlesByIdDesc = articles => {
  const compare = (a, b) => {
    // bをaの後ろに置く
    if (a.id > b.id) {
      return -1
    }
    // bをaの前に置く
    if (a.id < b.id) {
      return 1
    }
    // aとbの位置は変わらない
    return 0
  }
  return articles.sort(compare)
}
