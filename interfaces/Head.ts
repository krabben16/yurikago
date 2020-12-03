import { BreadcrumbSchema, ArticleSchema } from '~/interfaces/Schema'

export interface CommonHead {
  title: string
  description: string
  path: string
  breadcrumbSchema: BreadcrumbSchema
}

export interface ArticleHead extends CommonHead {
  articleSchema: ArticleSchema
}
