import { Tag } from "~/resources/ts/domain/model/tag.js"

export interface ITagRepository {
  getTagById(id: number): Tag | boolean,
  getTagByName(name: string): Tag | boolean
}
