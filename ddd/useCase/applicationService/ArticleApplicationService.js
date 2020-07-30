import { tagApplicationService } from "~/ddd/useCase/applicationService/TagApplicationService.js"
import { ArticleEntity } from "~/ddd/domain/entity/ArticleEntity.js"

import content1 from "~/resources/markdown/articles/1.md"
import content2 from "~/resources/markdown/articles/2.md"
import content3 from "~/resources/markdown/articles/3.md"
import content4 from "~/resources/markdown/articles/4.md"
import content5 from "~/resources/markdown/articles/5.md"
import content6 from "~/resources/markdown/articles/6.md"
import content7 from "~/resources/markdown/articles/7.md"
import content8 from "~/resources/markdown/articles/8.md"
import content9 from "~/resources/markdown/articles/9.md"
import content10 from "~/resources/markdown/articles/10.md"
import content11 from "~/resources/markdown/articles/11.md"
import content12 from "~/resources/markdown/articles/12.md"
import content13 from "~/resources/markdown/articles/13.md"
import content14 from "~/resources/markdown/articles/14.md"
import content15 from "~/resources/markdown/articles/15.md"
import content16 from "~/resources/markdown/articles/16.md"
import content17 from "~/resources/markdown/articles/17.md"
import content18 from "~/resources/markdown/articles/18.md"

const articleList = [
  new ArticleEntity(
    1,
    "CentOS7 Tesseract3.04をビルドして実行する",
    "2018-07-09",
    [tagApplicationService.getTagByName("CentOS"), tagApplicationService.getTagByName("Tesseract")],
    content1
  ),
  new ArticleEntity(
    2,
    "CentOS7 Puppeteerを実行してスクリーンショット画像を作成する",
    "2018-12-20",
    [
      tagApplicationService.getTagByName("CentOS"),
      tagApplicationService.getTagByName("Chromium"),
      tagApplicationService.getTagByName("Node.js"),
      tagApplicationService.getTagByName("Puppeteer")
    ],
    content2
  ),
  new ArticleEntity(
    3,
    "Chrome SeleniumIDE 配列を定義してループする",
    "2019-03-14",
    [tagApplicationService.getTagByName("Google Chrome"), tagApplicationService.getTagByName("Selenium")],
    content3
  ),
  new ArticleEntity(
    4,
    "CentOS7 CLIでLighthouseを実行する",
    "2019-07-28",
    [
      tagApplicationService.getTagByName("CentOS"),
      tagApplicationService.getTagByName("Node.js"),
      tagApplicationService.getTagByName("Puppeteer"),
      tagApplicationService.getTagByName("Lighthouse")
    ],
    content4
  ),
  new ArticleEntity(
    5,
    "Alpine Linux 3.10.3 Python3 NLTKを実行する",
    "2019-12-19",
    [
      tagApplicationService.getTagByName("Alpine Linux"),
      tagApplicationService.getTagByName("NLTK"),
      tagApplicationService.getTagByName("Python")
    ],
    content5
  ),
  new ArticleEntity(
    6,
    "Homestead PostgreSQLにHeidiSQLで接続する",
    "2019-12-30",
    [
      tagApplicationService.getTagByName("Homestead"),
      tagApplicationService.getTagByName("HeidiSQL"),
      tagApplicationService.getTagByName("PostgreSQL")
    ],
    content6
  ),
  new ArticleEntity(
    7,
    "CentOS6 Xdebug+VSCodeでPHP5.3をデバッグする",
    "2020-01-01",
    [
      tagApplicationService.getTagByName("CentOS"),
      tagApplicationService.getTagByName("PHP"),
      tagApplicationService.getTagByName("VSCode"),
      tagApplicationService.getTagByName("Xdebug")
    ],
    content7
  ),
  new ArticleEntity(
    8,
    "Googleクローラーが画像の遅延読み込みを認識できるかどうか検証する",
    "2020-01-03",
    [
      tagApplicationService.getTagByName("Chromium"),
      tagApplicationService.getTagByName("Node.js"),
      tagApplicationService.getTagByName("Puppeteer")
    ],
    content8
  ),
  new ArticleEntity(
    9,
    "Marked.jsを拡張してWebP画像を表示する",
    "2020-01-05",
    [tagApplicationService.getTagByName("Marked.js"), tagApplicationService.getTagByName("Nuxt.js")],
    content9
  ),
  new ArticleEntity(
    10,
    "JavaScriptはDOMツリーの構築中に実行される",
    "2020-01-14",
    [
      tagApplicationService.getTagByName("Google Chrome"),
      tagApplicationService.getTagByName("JavaScript"),
      tagApplicationService.getTagByName("HTML")
    ],
    content10
  ),
  new ArticleEntity(
    11,
    "Nuxt.js サイトマップXMLを動的に出力する",
    "2020-01-21",
    [tagApplicationService.getTagByName("Nuxt.js"), tagApplicationService.getTagByName("Postman")],
    content11
  ),
  new ArticleEntity(
    12,
    "Nuxt.js Disqusのコメントフォームを表示する",
    "2020-01-27",
    [
      tagApplicationService.getTagByName("Google Chrome"),
      tagApplicationService.getTagByName("Nuxt.js"),
      tagApplicationService.getTagByName("Disqus")
    ],
    content12
  ),
  new ArticleEntity(
    13,
    "Nuxt.js Homesteadにhttpsでリクエストしてレスポンスを取得する",
    "2020-02-02",
    [
      tagApplicationService.getTagByName("Node.js"),
      tagApplicationService.getTagByName("Homestead"),
      tagApplicationService.getTagByName("Nuxt.js")
    ],
    content13
  ),
  new ArticleEntity(
    14,
    "JavaScript 整数の連番を配列として取得する",
    "2020-02-05",
    [tagApplicationService.getTagByName("JavaScript")],
    content14
  ),
  new ArticleEntity(
    15,
    "PHP5.3 全角ひらがなの濁点を削除する",
    "2020-03-25",
    [tagApplicationService.getTagByName("PHP")],
    content15
  ),
  new ArticleEntity(
    16,
    "curlでHTTPステータスコードを取得する",
    "2020-04-27",
    [tagApplicationService.getTagByName("Git for Windows"), tagApplicationService.getTagByName("cURL")],
    content16
  ),
  new ArticleEntity(
    17,
    "画像をIE11でpreloadする",
    "2020-07-10",
    [tagApplicationService.getTagByName("JavaScript"), tagApplicationService.getTagByName("HTML")],
    content17
  ),
  new ArticleEntity(
    18,
    "debuggerやconsole.traceなどを使ってJavaScriptをデバッグする",
    "2020-07-28",
    [tagApplicationService.getTagByName("Google Chrome"), tagApplicationService.getTagByName("JavaScript")],
    content18
  )
]

class ArticleApplicationService {
  constructor(articleList) {
    this.sortedArticles = this._sortArticlesByIdDesc(articleList)
  }

  /**
   * 記事データの合計数を取得する
   * @return {number}
   */
  getTotalArticleCount = () => {
    return this.sortedArticles.length
  }

  /**
   * 記事IDから記事データを取得する
   * @param {number} id
   * @return {(object|boolean)}
   */
  getArticleById = id => {
    const article = this.sortedArticles.filter(a => a.id === id)
    if (article.length === 0) {
      return false
    }
    // 配列からオブジェクトを取り出す
    return article.shift()
  }

  /**
   * ページ番号から記事リストを取得する
   * @param {number} page
   * @return {(object[]|boolean)}
   */
  getArticlesByPage = page => {
    let start, end

    if (page === 1) {
      start = 0
      end = process.env.MAX_ARTICLE_COUNT_IN_LIST
    } else {
      // page = 2
      // start = 10 * (2 - 1) = 10
      // end = 10 * 2 = 20
      start = process.env.MAX_ARTICLE_COUNT_IN_LIST * (page - 1)
      end = process.env.MAX_ARTICLE_COUNT_IN_LIST * page
    }

    const sliced = this.sortedArticles.slice(start, end)
    if (sliced.length === 0) {
      return false
    }

    return sliced
  }

  /**
   * タグIDから記事リストを取得する
   * @param {number} tagId
   * @return {object[]}
   */
  getArticlesByTagId = tagId => {
    const ret = []
    this.sortedArticles.map(a => {
      a.tags.map(t => {
        if (t.id === tagId) {
          ret.push(a)
        }
      })
    })
    return ret
  }

  /**
   * 記事IDから次の記事リンクの表示有無を判定する
   * @param {number} id
   * @return {boolean}
   */
  isVisibleNextArticle = id => {
    const firstArticle = this.sortedArticles[0]
    if (firstArticle.id === id) {
      // 最初の記事の場合は次の記事が存在しないのでfalseを返す
      return false
    }
    return true
  }

  /**
   * 記事IDから次の記事IDを取得する
   * @param {number} id
   * @return {(number|boolean)}
   */
  getNextArticleId = id => {
    if (!this.isVisibleNextArticle(id)) {
      return false
    }
    const currentIndex = this._getSortedArticlesIndex(id)
    return this.sortedArticles[currentIndex - 1].id
  }

  /**
   * 記事IDから前の記事リンクの表示有無を判定する
   * @param {number} id
   * @return {boolean}
   */
  isVisiblePrevArticle = id => {
    const lastArticle = this.sortedArticles[this.sortedArticles.length - 1]
    if (lastArticle.id === id) {
      // 最後の記事の場合は前の記事が存在しないのでfalseを返す
      return false
    }
    return true
  }

  /**
   * 記事IDから前の記事IDを取得する
   * @param {number} id
   * @return {(number|boolean)}
   */
  getPrevArticleId = id => {
    if (!this.isVisiblePrevArticle(id)) {
      return false
    }
    const currentIndex = this._getSortedArticlesIndex(id)
    return this.sortedArticles[currentIndex + 1].id
  }

  /**
   * 記事リストをIDの降順で並び替える
   * @param {object[]} articles
   * @return {object[]}
   */
  _sortArticlesByIdDesc = articles => {
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

  /**
   * 記事IDから記事リストのインデックスを取得する
   * @param {number} id
   * @return {(number|boolean)}
   */
  _getSortedArticlesIndex = id => {
    let targetIndex = false
    this.sortedArticles.map((a, i) => {
      if (a.id === id) {
        targetIndex = i
      }
    })
    return targetIndex
  }
}

export const articleApplicationService = new ArticleApplicationService(articleList)
