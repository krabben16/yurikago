import { IContentDocument } from '@nuxt/content/types/content'

export interface ContentArticleTag {
  id: number
  name: string
}

export interface ContentArticle extends IContentDocument {
  id: number
  title: string
  date: string
  tags: ContentArticleTag[]
}

export interface ContentSurround extends IContentDocument {
  id: number
}
