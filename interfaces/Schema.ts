export interface BreadcrumbSchemaItem {
  name: string
  path: string
}

export interface BreadcrumbSchema {
  breadcrumbItemList: BreadcrumbSchemaItem[]
}

export interface ArticleSchema {
  articleId: number
  headlineValue: string
  datePublishedValue: string
  dateModifiedValue: string
}
