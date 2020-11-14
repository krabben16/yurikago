import { contentFunc } from '@nuxt/content/types/content'
import { ContentArticle, ContentSurround } from '~/interfaces/Content'

async function fetchTotalArticleCount($content: contentFunc) {
  const articleIds = await $content('articles').only(['id']).fetch()
  return (articleIds as ContentArticle[]).length
}

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

async function fetchArticlesByTagId($content: contentFunc, tagId: number) {
  const articles = await $content('articles')
    .where({ 'tags.id': { $contains: tagId } })
    .sortBy('id', 'desc')
    .fetch()
  return articles as ContentArticle[]
}

async function fetchArticlesById($content: contentFunc, id: string) {
  const articles = await $content('articles')
    .where({ id: parseInt(id) })
    .fetch()

  return articles as ContentArticle[]
}

async function fetchSurround($content: contentFunc, id: string) {
  const surround = await $content('articles')
    .only(['id'])
    .sortBy('id')
    // articles以下のファイル名を指定する
    // CSRの場合はparams.idの型がnumberになるのでstringに変換する
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
