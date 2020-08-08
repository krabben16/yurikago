import { Tag } from "~/resources/ts/domain/model/tag"
import { ITagRepository } from "~/resources/ts/domain/repository/ITagRepository"

export class TagUseCase {
  private readonly tagRepository: ITagRepository

  constructor (tagRepository: ITagRepository) {
    this.tagRepository = tagRepository
  }

  /**
   * タグIDからタグデータを取得する
   */
  getTagById = (id: number): Tag | boolean => {
    return this.tagRepository.getTagById(id)
  }

  /**
   * タグ名称からタグデータを取得する
   */
  getTagByName = (name: string): Tag | boolean => {
    return this.tagRepository.getTagByName(name)
  }

  /**
   * タグ名称を句点で連結する
   */
  getJoinedTagsName = (tags: Tag[]): string => {
    return tags.map(t => t.name).join(",")
  }
}
