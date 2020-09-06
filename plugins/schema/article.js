import Vue from "vue"
import { createArticleSchemaObject } from "~/resources/js/schema/article.js"

Vue.prototype.$createArticleSchemaString = article => {
  const articleSchemaObject = createArticleSchemaObject(
    article.id,
    article.title,
    `${article.date}T00:00:00+09:00`,
    `${article.date}T00:00:00+09:00`
  )

  return JSON.stringify(articleSchemaObject)
}
