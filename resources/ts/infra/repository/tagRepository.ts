import { tagList } from "~/resources/ts/infra/data/tags/all"

import { Tag } from "~/resources/ts/domain/model/tag"
import { ITagRepository } from "~/resources/ts/domain/repository/ITagRepository"

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
