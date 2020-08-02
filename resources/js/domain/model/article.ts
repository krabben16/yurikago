import { IArticleObject } from "~/resources/js/infra/data/interface/IArticleObject.ts"
import { Tag } from "~/resources/js/domain/model/tag.ts"

export class Article {
  id: number
  title: string
  posted_at: string
  tags: Tag[]
  content: string

  constructor(obj: IArticleObject) {
    this.id = obj.id
    this.title = obj.title
    this.posted_at = obj.posted_at
    this.tags = obj.tags
    this.content = obj.content
  }
}
