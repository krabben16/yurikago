// domain/repository の処理を実装する

import { articleList } from "~/resources/js/infra/data/articles/all.ts"
import { IArticleObject } from "~/resources/js/infra/data/interface/IArticleObject.ts"

import { Article } from "~/resources/js/domain/model/article.ts"
import { IArticleRepository } from "~/resources/js/domain/repository/IArticleRepository.ts"

export class ArticleRepository implements IArticleRepository {
  /**
   * 全ての記事データを取得する
   */
  getArticles = (): Article[] => {
    const sortedArticles = this._sortArticlesByIdDesc(articleList)

    const ret = sortedArticles.map(article => {
      return new Article(article)
    })

    return ret
  }

  /**
   * 記事IDから記事データを取得する
   */
  getArticleById = (id: number): Article | boolean => {
    const filtered = articleList.filter(a => a.id === id)
    if (filtered.length === 0) {
      return false
    }

    // 配列からオブジェクトを取り出す
    const article: IArticleObject = filtered[0]

    return new Article(article)
  }

  /**
   * タグIDから記事リストを取得する
   */
  getArticlesByTagId = (tagId: number): Article[] => {
    const sortedArticles = this._sortArticlesByIdDesc(articleList)

    const matched: IArticleObject[] = []
    sortedArticles.map(article => {
      article.tags.map(tag => {
        if (tag.id === tagId) {
          matched.push(article)
        }
      })
    })

    const ret = matched.map(article => {
      return new Article(article)
    })

    return ret
  }

  /**
   * 記事データの合計数を取得する
   */
  getTotalArticleCount = (): number => {
    return articleList.length
  }

  /**
   * 記事リストをIDの降順で並び替える
   */
  private _sortArticlesByIdDesc = (articles: IArticleObject[]): IArticleObject[] => {
    const compare = (a: IArticleObject, b: IArticleObject) => {
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
