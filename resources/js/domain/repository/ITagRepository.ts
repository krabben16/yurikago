import { Tag } from "~/resources/js/domain/model/tag.js"

export interface ITagRepository {
  getTagById(id: number): Tag | boolean,
  getTagByName(name: string): Tag | boolean
}
