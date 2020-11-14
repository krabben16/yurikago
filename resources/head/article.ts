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
    link: [
      // https://www.jsdelivr.com/package/npm/github-markdown-css
      {
        rel: 'stylesheet',
        href:
          'https://cdn.jsdelivr.net/npm/github-markdown-css@4.0.0/github-markdown.css',
        integrity: 'sha256-cf0utJyD3jlnqw2/IdG9Ai3UyTLsW10Z8nXcCbHhfDI=',
        crossorigin: 'anonymous',
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
