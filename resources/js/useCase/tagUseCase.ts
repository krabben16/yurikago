import { Tag } from "~/resources/js/domain/model/tag.ts"
import { ITagRepository } from "~/resources/js/domain/repository/ITagRepository.ts"

export class TagUseCase {
  private readonly tagRepository: ITagRepository

  constructor(tagRepository: ITagRepository) {
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
