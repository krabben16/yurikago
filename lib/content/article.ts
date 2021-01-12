import { contentFunc, IContentDocument } from '@nuxt/content/types/content'
import {
  ContentArticle,
  ContentSurround,
  ContentArticleListItem,
  ContentArticleTag,
} from '~/interfaces/Content'

export class ContentFunctions {
  // タグIDから記事データを取得する
  public static async fetchArticlesByTagId(
    $content: contentFunc,
    tagId: number
  ) {
    const articles = await $content('articles')
      .only(['id', 'title', 'date', 'tags'])
      .where({ 'tags.id': { $contains: tagId } })
      .sortBy('id', 'desc')
      .fetch()

    return articles as ContentArticleListItem[]
  }

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

  // タグIDからタグデータを取得する
  public static async fetchTagById($content: contentFunc, id: number) {
    const articles = (await $content('articles')
      .only(['tags'])
      .fetch()) as IContentDocument[]

    for (let i = 0; i < articles.length; i++) {
      const article = articles[i]
      for (let j = 0; j < article.tags.length; j++) {
        const tag = article.tags[j]
        if (tag.id === id) {
          return tag as ContentArticleTag
        }
      }
    }

    return null
  }
}
