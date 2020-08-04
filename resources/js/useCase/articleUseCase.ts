// useCaseのインスタンスを生成するとき domain/repository の具象クラスである infra/repository をDIする

import { Article } from "~/resources/js/domain/model/article.ts"
import { IArticleRepository } from "~/resources/js/domain/repository/IArticleRepository.ts"

export class ArticleUseCase {
  private readonly articleRepository: IArticleRepository

  constructor (articleRepository: IArticleRepository) {
    this.articleRepository = articleRepository
  }

  /**
   * 全ての記事データを取得する
   */
  getArticles = (): Article[] => {
    return this.articleRepository.getArticles()
  }

  /**
   * 記事IDから記事データを取得する
   */
  getArticleById = (id: number): Article | boolean => {
    return this.articleRepository.getArticleById(id)
  }

  /**
   * タグIDから記事リストを取得する
   */
  getArticlesByTagId = (tagId: number): Article[] | boolean => {
    return this.articleRepository.getArticlesByTagId(tagId)
  }

  /**
   * 記事データの合計数を取得する
   */
  getTotalArticleCount = (): number => {
    return this.articleRepository.getTotalArticleCount()
  }

  /**
   * ページ番号から記事リストを取得する
   */
  getArticlesByPage = (page: number): Article[] | boolean => {
    const maxArticleCountInList = parseInt(process.env.MAX_ARTICLE_COUNT_IN_LIST as string)

    let start, end
    if (page === 1) {
      start = 0
      end = maxArticleCountInList
    } else {
      // page = 2
      // start = 10 * (2 - 1) = 10
      // end = 10 * 2 = 20
      start = maxArticleCountInList * (page - 1)
      end = maxArticleCountInList * page
    }

    const articles = this.articleRepository.getArticles()

    const sliced = articles.slice(start, end)
    if (sliced.length === 0) {
      return false
    }

    const ret = sliced.map(article => {
      return new Article(article)
    })

    return ret
  }

  /**
   * 記事IDから次の記事リンクの表示有無を判定する
   */
  isVisibleNextArticle = (id: number): boolean => {
    const articles = this.articleRepository.getArticles()
    const firstArticle = articles[0]
    if (firstArticle.id === id) {
      // 最初の記事の場合は次の記事が存在しないのでfalseを返す
      return false
    }
    return true
  }

  /**
   * 記事IDから次の記事IDを取得する
   */
  getNextArticleId = (id: number): number | boolean => {
    if (!this.isVisibleNextArticle(id)) {
      return false
    }

    const articles = this.articleRepository.getArticles()
    const currentIndex = this._getArticlesIndex(articles, id)
    if (currentIndex === -1) {
      return false
    }

    return articles[currentIndex - 1].id
  }

  /**
   * 記事IDから前の記事リンクの表示有無を判定する
   */
  isVisiblePrevArticle = (id: number): boolean => {
    const articles = this.articleRepository.getArticles()
    const lastArticle = articles[articles.length - 1]
    if (lastArticle.id === id) {
      // 最後の記事の場合は前の記事が存在しないのでfalseを返す
      return false
    }
    return true
  }

  /**
   * 記事IDから前の記事IDを取得する
   */
  getPrevArticleId = (id: number): number | boolean => {
    if (!this.isVisiblePrevArticle(id)) {
      return false
    }

    const articles = this.articleRepository.getArticles()
    const currentIndex = this._getArticlesIndex(articles, id)
    if (currentIndex === -1) {
      return false
    }

    return articles[currentIndex + 1].id
  }

  /**
   * 記事IDから記事リストのインデックスを取得する
   */
  private _getArticlesIndex = (articles: Article[], id: number): number => {
    let targetIndex = -1
    articles.map((a, i) => {
      if (a.id === id) {
        targetIndex = i
      }
    })
    return targetIndex
  }
}
