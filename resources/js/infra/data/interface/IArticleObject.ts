import { ITagObject } from "~/resources/js/infra/data/interface/ITagObject.ts"

export interface IArticleObject {
  id: number,
  title: string,
  posted_at: string,
  tags: ITagObject[],
  content: string
}
