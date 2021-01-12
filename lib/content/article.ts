import { contentFunc } from '@nuxt/content/types/content'
import { ContentArticle, ContentSurround } from '~/interfaces/Content'

export class ContentFunctions {
  // 記事IDから記事データの存在をチェックする
  public static async existsArticleById($content: contentFunc, id: number) {
    try {
      await $content(`articles/${id}`).fetch()
      return true
    } catch {
      return false
    }
  }

  // 記事IDから記事データを取得する
  public static async fetchArticleById($content: contentFunc, id: number) {
    const article = await $content(`articles/${id}`).fetch()
    return article as ContentArticle
  }

  // 記事IDから両隣の記事データを取得する
  public static async fetchSurroundById($content: contentFunc, id: number) {
    const surround = await $content('articles')
      .only('id')
      .sortBy('id')
      // articles以下のファイル名を指定する
      .surround(id.toString())
      .fetch()

    return surround as ContentSurround[]
  }
}
