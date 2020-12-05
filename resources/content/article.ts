import { contentFunc } from '@nuxt/content/types/content'
import {
  ContentArticle,
  ContentSurround,
  ContentArticleTag,
} from '~/interfaces/Content'

// 記事の合計数を取得する
export async function fetchTotalArticleCount($content: contentFunc) {
  const articles = await $content('articles').fetch()
  return (articles as ContentArticle[]).length
}

// 直近の記事データを取得する
export async function fetchRecentlyArticles(
  $content: contentFunc,
  limitCount: number
) {
  const articles = await $content('articles')
    .sortBy('id', 'desc')
    .limit(limitCount)
    .fetch()

  return articles as ContentArticle[]
}

// ページ番号から記事データを取得する
export async function fetchArticlesByPage(
  $content: contentFunc,
  skipCount: number,
  limitCount: number
) {
  const articles = await $content('articles')
    .sortBy('id', 'desc')
    .skip(skipCount)
    .limit(limitCount)
    .fetch()

  return articles as ContentArticle[]
}

// タグIDから記事データを取得する
export async function fetchArticlesByTagId(
  $content: contentFunc,
  tagId: number
) {
  const articles = await $content('articles')
    .where({ 'tags.id': { $contains: tagId } })
    .sortBy('id', 'desc')
    .fetch()

  return articles as ContentArticle[]
}

// 記事IDから記事データを取得する
export async function fetchArticleById($content: contentFunc, id: number) {
  const article = await $content(`articles/${id}`).fetch()
  return article as ContentArticle
}

// 両隣の記事データを取得する
export async function fetchSurround($content: contentFunc, id: number) {
  const surround = await $content('articles')
    .sortBy('id')
    // articles以下のファイル名を指定する
    .surround(id.toString())
    .fetch()

  return surround as ContentSurround[]
}

// 記事IDから記事データの存在をチェックする
export async function existsArticleById($content: contentFunc, id: number) {
  try {
    await $content(`articles/${id}`).fetch()
    return true
  } catch {
    return false
  }
}

// タグIDからタグデータを取得する
export async function fetchTagById($content: contentFunc, id: number) {
  const articles = await $content('articles').fetch()

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
