export interface IBreadcrumbItem {
  name: string
  path: string
}

export interface IBreadcrumbSchema {
  items: IBreadcrumbItem[]
}

export interface IArticleSchema {
  articleId: number
  headlineValue: string
  datePublishedValue: string
  dateModifiedValue: string
}
