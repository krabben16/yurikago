export class TagUseCase {
  constructor(tagRepository) {
    this.tagRepository = tagRepository
  }

  /**
   * タグIDからタグデータを取得する
   * @param {number} id
   * @return {(object|boolean)}
   */
  getTagById = id => {
    return this.tagRepository.getTagById(id)
  }

  /**
   * タグ名称からタグデータを取得する
   * @param {string} name
   * @return {(object|boolean)}
   */
  getTagByName = name => {
    return this.tagRepository.getTagByName(name)
  }

  /**
   * タグ名称を句点で連結する
   * @param {array} tags
   * @return {string}
   */
  getJoinedTagsName = tags => {
    return tags.map(t => t.name).join(",")
  }
}
