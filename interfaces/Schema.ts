export interface SchemaBreadcrumbItem {
  name: string
  path: string
}

export interface SchemaBreadcrumb {
  breadcrumbItemList: SchemaBreadcrumbItem[]
}

export interface SchemaArticle {
  articleId: number
  headlineValue: string
  datePublishedValue: string
  dateModifiedValue: string
}
