import type { Plugin } from '@nuxt/types'
import { SchemaArticle } from '~/interfaces/Schema'
import { createArticleSchemaObject } from '~/resources/schema/article'

function createArticleSchema(args: SchemaArticle) {
  const articleSchemaObject = createArticleSchemaObject(args)
  return JSON.stringify(articleSchemaObject)
}

type ArticleSchemaCreator = typeof createArticleSchema

declare module 'vue/types/vue' {
  interface Vue {
    $createArticleSchema: ArticleSchemaCreator
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $createArticleSchema: ArticleSchemaCreator
  }
}

const articleSchemaPlugin: Plugin = (_context, inject) => {
  inject('createArticleSchema', createArticleSchema)
}

export default articleSchemaPlugin
