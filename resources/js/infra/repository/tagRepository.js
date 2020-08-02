import { tagList } from "~/resources/js/infra/data/tags/all.js"
import { Tag } from "~/resources/js/domain/model/tag.js"

export class TagRepository {
  /**
   * タグIDからタグデータを取得する
   * @param {number} id
   * @return {(object|boolean)}
   */
  getTagById = id => {
    const filtered = tagList.filter(t => t.id === id)
    if (filtered.length === 0) {
      return false
    }

    // 配列からオブジェクトを取り出す
    const tag = filtered.shift()

    const ret = new Tag({
      id: tag.id,
      name: tag.name
    })

    return ret
  }

  /**
   * タグ名称からタグデータを取得する
   * @param {string} name
   * @return {(object|boolean)}
   */
  getTagByName = name => {
    const filtered = tagList.filter(t => t.name === name)
    if (filtered.length === 0) {
      return false
    }

    // 配列からオブジェクトを取り出す
    const tag = filtered.shift()

    const ret = new Tag({
      id: tag.id,
      name: tag.name
    })

    return ret
  }
}
