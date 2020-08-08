import { ITagObject } from "~/resources/ts/infra/data/interface/ITagObject"

export interface IArticleObject {
  id: number,
  title: string,
  postedAt: string,
  tags: ITagObject[],
  content: string
}
