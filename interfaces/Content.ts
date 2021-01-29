import { IContentDocument } from '@nuxt/content/types/content'

export interface IContentArticleToc {
  id: string
  depth: number
  text: string
}

export interface IContentArticle extends IContentDocument {
  id: number
  title: string
  date: string
}

export interface IContentSurround extends IContentDocument {
  id: number
  title: string
}

export interface IContentArticleListItem extends IContentDocument {
  id: number
  title: string
  date: string
}
