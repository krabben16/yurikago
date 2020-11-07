import type { Plugin } from '@nuxt/types'
import { ArticleSchemaArgs } from '~/interfaces/ArticleSchemaArgs'
import { createArticleSchemaObject } from '~/resources/schema/article'

type ArticleSchemaCreator = (article: any) => string

declare module 'vue/types/vue' {
  interface Vue {
    $createArticleSchema: ArticleSchemaCreator
  }
}

const articleSchemaCreator: ArticleSchemaCreator = (article: any) => {
  const args: ArticleSchemaArgs = {
    articleId: article.id,
    headlineValue: article.title,
    datePublishedValue: `${article.date}T00:00:00+09:00`,
    dateModifiedValue: `${article.date}T00:00:00+09:00`,
  }
  const articleSchemaObject = createArticleSchemaObject(args)
  return JSON.stringify(articleSchemaObject)
}

const articleSchemaPlugin: Plugin = (_context, inject) => {
  inject('createArticleSchema', articleSchemaCreator)
}

export default articleSchemaPlugin
