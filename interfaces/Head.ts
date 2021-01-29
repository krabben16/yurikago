import { IBreadcrumbSchema, IArticleSchema } from '~/interfaces/Schema'

export interface ICommonHead {
  title: string
  description: string
  path: string
  breadcrumbSchema: IBreadcrumbSchema
}

export interface IArticleHead extends ICommonHead {
  articleSchema: IArticleSchema
}
