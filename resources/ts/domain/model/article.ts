import { IArticleObject } from "~/resources/ts/infra/data/interface/IArticleObject"
import { Tag } from "~/resources/ts/domain/model/tag"

export class Article {
  id: number
  title: string
  postedAt: string
  tags: Tag[]
  content: string

  constructor (obj: IArticleObject) {
    this.id = obj.id
    this.title = obj.title
    this.postedAt = obj.postedAt
    this.tags = obj.tags
    this.content = obj.content
  }
}
