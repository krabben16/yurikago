import { tagList } from "~/resources/js/infra/data/tags/all.ts"

import { Tag } from "~/resources/js/domain/model/tag.ts"
import { ITagRepository } from "~/resources/js/domain/repository/ITagRepository.ts"

export class TagRepository implements ITagRepository {
  /**
   * タグIDからタグデータを取得する
   */
  getTagById = (id: number): Tag | boolean => {
    const filtered = tagList.filter(t => t.id === id)
    if (filtered.length === 0) {
      return false
    }

    // 配列からオブジェクトを取り出す
    const tag = filtered[0]

    const ret = new Tag({
      id: tag.id,
      name: tag.name
    })

    return ret
  }

  /**
   * タグ名称からタグデータを取得する
   */
  getTagByName = (name: string): Tag | boolean => {
    const filtered = tagList.filter(t => t.name === name)
    if (filtered.length === 0) {
      return false
    }

    // 配列からオブジェクトを取り出す
    const tag = filtered[0]

    const ret = new Tag({
      id: tag.id,
      name: tag.name
    })

    return ret
  }
}
