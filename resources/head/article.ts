import { createBreadcrumbSchemaObject } from '~/resources/schema/breadcrumb'
import { createArticleSchemaObject } from '~/resources/schema/article'
import { ArticleHead } from '~/interfaces/Head'

export function createHeadObject(head: ArticleHead) {
  const breadcrumbSchema = JSON.stringify(
    createBreadcrumbSchemaObject(head.breadcrumbSchema)
  )
  const articleSchema = JSON.stringify(
    createArticleSchemaObject(head.articleSchema)
  )

  const headObject = {
    title: head.title,
    meta: [
      {
        name: 'description',
        content: head.description,
      },
      {
        property: 'og:title',
        content: `${head.title} | Yurikago Blog`,
      },
      {
        property: 'og:type',
        content: 'article',
      },
      {
        property: 'og:description',
        content: head.description,
      },
      {
        property: 'og:url',
        content: (process.env.FRONT_URL as string) + head.path,
      },
    ],
    script: [
      // 構造化マークアップ
      {
        hid: 'breadcrumbSchema',
        innerHTML: breadcrumbSchema,
        type: 'application/ld+json',
      },
      {
        hid: 'articleSchema',
        innerHTML: articleSchema,
        type: 'application/ld+json',
      },
    ],
    __dangerouslyDisableSanitizersByTagID: {
      breadcrumbSchema: ['innerHTML'],
      articleSchema: ['innerHTML'],
    },
  }

  return headObject
}
