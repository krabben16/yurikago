import type { Plugin } from '@nuxt/types'
import { ContentArticle } from '~/interfaces/ContentArticle'
import { ArticleSchemaArgs } from '~/interfaces/ArticleSchemaArgs'
import { createArticleSchemaObject } from '~/resources/schema/article'

function articleSchemaCreator(article: ContentArticle) {
  const args: ArticleSchemaArgs = {
    articleId: article.id,
    headlineValue: article.title,
    datePublishedValue: `${article.date}T00:00:00+09:00`,
    dateModifiedValue: `${article.date}T00:00:00+09:00`,
  }
  const articleSchemaObject = createArticleSchemaObject(args)
  return JSON.stringify(articleSchemaObject)
}

type ArticleSchemaCreator = (article: ContentArticle) => string

declare module 'vue/types/vue' {
  interface Vue {
    $createArticleSchema: ArticleSchemaCreator
  }
}

const articleSchemaPlugin: Plugin = (_context, inject) => {
  inject('createArticleSchema', articleSchemaCreator)
}

export default articleSchemaPlugin
