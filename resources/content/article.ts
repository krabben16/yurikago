import { contentFunc } from '@nuxt/content/types/content'
import { ContentArticle, ContentSurround } from '~/interfaces/Content'

// 合計
async function fetchTotalArticleCount($content: contentFunc) {
  const articles = await $content('articles').fetch()
  return (articles as ContentArticle[]).length
}

// 最新
async function fetchRecentlyArticles(
  $content: contentFunc,
  limitCount: number
) {
  const articles = await $content('articles')
    .sortBy('id', 'desc')
    .limit(limitCount)
    .fetch()

  return articles as ContentArticle[]
}

// ページ番号
async function fetchArticlesByPage(
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

// タグID
async function fetchArticlesByTagId($content: contentFunc, tagId: number) {
  const articles = await $content('articles')
    .where({ 'tags.id': { $contains: tagId } })
    .sortBy('id', 'desc')
    .fetch()

  return articles as ContentArticle[]
}

// 記事ID
async function fetchArticlesById($content: contentFunc, id: number) {
  const articles = await $content('articles').where({ id }).fetch()
  return articles as ContentArticle[]
}

async function fetchSurround($content: contentFunc, id: number) {
  const surround = await $content('articles')
    .sortBy('id')
    // articles以下のファイル名を指定する
    .surround(id.toString())
    .fetch()

  return surround as ContentSurround[]
}

export {
  fetchTotalArticleCount,
  fetchRecentlyArticles,
  fetchArticlesByPage,
  fetchArticlesByTagId,
  fetchArticlesById,
  fetchSurround,
}