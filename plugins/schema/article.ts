import type { Plugin } from "@nuxt/types"
import { createArticleSchemaObject } from "~/resources/js/schema/article"

type ArticleSchemaStringCreator = (article: any) => string

declare module "vue/types/vue" {
  interface Vue {
    $createArticleSchema: ArticleSchemaStringCreator
  }
}

const articleSchemaStringCreator: ArticleSchemaStringCreator = (article: any) => {
  const articleSchemaObject = createArticleSchemaObject(
    article.id,
    article.title,
    `${article.date}T00:00:00+09:00`,
    `${article.date}T00:00:00+09:00`
  )
  return JSON.stringify(articleSchemaObject)
}

const articleSchemaPlugin: Plugin = (_context, inject) => {
  inject("createArticleSchema", articleSchemaStringCreator)
}

export default articleSchemaPlugin
