// domain/repository の処理を実装する

import { articleList } from "~/resources/js/infra/data/articles/all.js"
import { Article } from "~/resources/js/domain/model/article.js"

export class ArticleRepository {
  /**
   * 全ての記事データを取得する
   * @return {object[]}
   */
  getArticles = () => {
    const sortedArticles = this._sortArticlesByIdDesc(articleList)

    const ret = sortedArticles.map(article => {
      return new Article({
        id: article.id,
        title: article.title,
        posted_at: article.posted_at,
        tags: article.tags,
        content: article.content
      })
    })

    return ret
  }

  /**
   * 記事IDから記事データを取得する
   * @param {number} id
   * @return {(object|boolean)}
   */
  getArticleById = id => {
    const filtered = articleList.filter(a => a.id === id)
    if (filtered.length === 0) {
      return false
    }

    // 配列からオブジェクトを取り出す
    const article = filtered.shift()

    const ret = new Article({
      id: article.id,
      title: article.title,
      posted_at: article.posted_at,
      tags: article.tags,
      content: article.content
    })

    return ret
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

    const sortedArticles = this._sortArticlesByIdDesc(articleList)

    const sliced = sortedArticles.slice(start, end)
    if (sliced.length === 0) {
      return false
    }

    const ret = sliced.map(article => {
      return new Article({
        id: article.id,
        title: article.title,
        posted_at: article.posted_at,
        tags: article.tags,
        content: article.content
      })
    })

    return ret
  }

  /**
   * タグIDから記事リストを取得する
   * @param {number} tagId
   * @return {object[]}
   */
  getArticlesByTagId = tagId => {
    const sortedArticles = this._sortArticlesByIdDesc(articleList)

    const matched = []
    sortedArticles.map(article => {
      article.tags.map(tag => {
        if (tag.id === tagId) {
          matched.push(article)
        }
      })
    })

    const ret = matched.map(article => {
      return new Article({
        id: article.id,
        title: article.title,
        posted_at: article.posted_at,
        tags: article.tags,
        content: article.content
      })
    })

    return ret
  }

  /**
   * 記事データの合計数を取得する
   * @return {number}
   */
  getTotalArticleCount = () => {
    return articleList.length
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
}
