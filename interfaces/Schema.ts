export interface BreadcrumbItem {
  name: string
  path: string
}

export interface BreadcrumbSchema {
  items: BreadcrumbItem[]
}

export interface ArticleSchema {
  articleId: number
  headlineValue: string
  datePublishedValue: string
  dateModifiedValue: string
}
