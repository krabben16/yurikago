import { IBreadcrumbSchema, IArticleSchema } from '~/interfaces/schema'

export interface ICommonHead {
  title: string
  description: string
  path: string
  breadcrumbSchema: IBreadcrumbSchema
}

export interface IArticleHead extends ICommonHead {
  articleSchema: IArticleSchema
}
