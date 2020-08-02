// useCaseのインスタンスを生成するとき domain/repository の具象クラスである infra/repository をDIする

export class ArticleUseCase {
  constructor(articleRepository) {
    this.articleRepository = articleRepository
  }

  /**
   * 全ての記事データを取得する
   * @return {object[]}
   */
  getArticles = () => {
    return this.articleRepository.getArticles()
  }

  /**
   * 記事IDから記事データを取得する
   * @param {number} id
   * @return {(object|boolean)}
   */
  getArticleById = id => {
    return this.articleRepository.getArticleById(id)
  }

  /**
   * ページ番号から記事リストを取得する
   * @param {number} page
   * @return {(object[]|boolean)}
   */
  getArticlesByPage = page => {
    return this.articleRepository.getArticlesByPage(page)
  }

  /**
   * タグIDから記事リストを取得する
   * @param {number} tagId
   * @return {object[]}
   */
  getArticlesByTagId = tagId => {
    return this.articleRepository.getArticlesByTagId(tagId)
  }

  /**
   * 記事データの合計数を取得する
   * @return {number}
   */
  getTotalArticleCount = () => {
    return this.articleRepository.getTotalArticleCount()
  }

  /**
   * 記事IDから次の記事リンクの表示有無を判定する
   * @param {number} id
   * @return {boolean}
   */
  isVisibleNextArticle = id => {
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
   * @param {number} id
   * @return {(number|boolean)}
   */
  getNextArticleId = id => {
    if (!this.isVisibleNextArticle(id)) {
      return false
    }

    const articles = this.articleRepository.getArticles()
    const currentIndex = this._getArticlesIndex(articles, id)
    if (currentIndex === false) {
      return false
    }

    return articles[currentIndex - 1].id
  }

  /**
   * 記事IDから前の記事リンクの表示有無を判定する
   * @param {number} id
   * @return {boolean}
   */
  isVisiblePrevArticle = id => {
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
   * @param {number} id
   * @return {(number|boolean)}
   */
  getPrevArticleId = id => {
    if (!this.isVisiblePrevArticle(id)) {
      return false
    }

    const articles = this.articleRepository.getArticles()
    const currentIndex = this._getArticlesIndex(articles, id)
    if (currentIndex === false) {
      return false
    }

    return articles[currentIndex + 1].id
  }

  /**
   * 記事IDから記事リストのインデックスを取得する
   * @param {number} id
   * @return {(number|boolean)}
   */
  _getArticlesIndex = (articles, id) => {
    let targetIndex = false
    articles.map((a, i) => {
      if (a.id === id) {
        targetIndex = i
      }
    })
    return targetIndex
  }
}
