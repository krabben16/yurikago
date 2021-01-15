import { IContentDocument } from '@nuxt/content/types/content'

export interface ContentArticleTag {
  id: number
  name: string
}

export interface ContentArticleToc {
  id: string
  depth: number
  text: string
}

export interface ContentArticle extends IContentDocument {
  id: number
  title: string
  date: string
  tags: ContentArticleTag[]
  toc: ContentArticleToc[]
}

export interface ContentSurround extends IContentDocument {
  id: number
  title: string
}

export interface ContentArticleListItem extends IContentDocument {
  id: number
  title: string
  date: string
  tags: ContentArticleTag[]
}
