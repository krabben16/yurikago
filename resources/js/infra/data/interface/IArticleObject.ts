import { ITagObject } from "~/resources/js/infra/data/interface/ITagObject.ts"

export interface IArticleObject {
  id: number,
  title: string,
  postedAt: string,
  tags: ITagObject[],
  content: string
}
