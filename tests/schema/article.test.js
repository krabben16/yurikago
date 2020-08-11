import dotenv from "dotenv"
dotenv.config()

import { createArticleSchemaObject } from "~/resources/js/schema/article.js"

// 記事の構造化データが正しく作成されているかテストする
test("schema_article", () => {
  const articleId = 1
  const headlineValue = "テスト"
  const datePublishedValue = "2020-08-07T00:00:00+09:00"
  const dateModifiedValue = "2020-08-08T00:00:00+09:00"

  const articleSchemaObject = createArticleSchemaObject(
    articleId,
    headlineValue,
    datePublishedValue,
    dateModifiedValue
  )

  expect(articleSchemaObject.mainEntityOfPage["@id"]).toBe(`${process.env.FRONT_URL}/articles/1`)
  expect(articleSchemaObject.headline).toBe("テスト")
  expect(articleSchemaObject.datePublished).toBe("2020-08-07T00:00:00+09:00")
  expect(articleSchemaObject.dateModified).toBe("2020-08-08T00:00:00+09:00")
})
