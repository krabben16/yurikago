import { tagList } from "~/resources/js/infra/data/tags/all.js"

export class TagRepository {
  /**
   * タグIDからタグデータを取得する
   * @param {number} id
   * @return {(object|boolean)}
   */
  getTagById = id => {
    const tag = tagList.filter(t => t.id === id)
    if (tag.length === 0) {
      return false
    }
    // 配列からオブジェクトを取り出す
    return tag.shift()
  }

  /**
   * タグ名称からタグデータを取得する
   * @param {string} name
   * @return {(object|boolean)}
   */
  getTagByName = name => {
    const tag = tagList.filter(t => t.name === name)
    if (tag.length === 0) {
      return false
    }
    // 配列からオブジェクトを取り出す
    return tag.shift()
  }
}
