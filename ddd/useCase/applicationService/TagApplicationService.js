import { TagEntity } from "~/ddd/domain/entity/TagEntity.js"

const tagList = [
  new TagEntity(1, "CentOS"),
  new TagEntity(2, "Tesseract"),
  new TagEntity(3, "Chromium"),
  new TagEntity(4, "Node.js"),
  new TagEntity(5, "Puppeteer"),
  new TagEntity(6, "Google Chrome"),
  new TagEntity(7, "Selenium"),
  new TagEntity(8, "Lighthouse"),
  new TagEntity(9, "Alpine Linux"),
  new TagEntity(10, "NLTK"),
  new TagEntity(11, "Python"),
  new TagEntity(12, "Homestead"),
  new TagEntity(13, "HeidiSQL"),
  new TagEntity(14, "PostgreSQL"),
  new TagEntity(15, "PHP"),
  new TagEntity(16, "VSCode"),
  new TagEntity(17, "Xdebug"),
  new TagEntity(18, "Marked.js"),
  new TagEntity(19, "Nuxt.js"),
  new TagEntity(20, "JavaScript"),
  new TagEntity(21, "HTML"),
  new TagEntity(22, "Postman"),
  new TagEntity(23, "Disqus"),
  new TagEntity(24, "cURL"),
  new TagEntity(25, "Git for Windows")
]

class TagApplicationService {
  constructor(tagList) {
    this.tags = tagList
  }

  /**
   * タグ名称を句点で連結する
   * @param {array} tags
   * @return {string}
   */
  getJoinedTagsName = tags => {
    return tags.map(t => t.name).join(",")
  }

  /**
   * タグIDからタグデータを取得する
   * @param {number} id
   * @return {(object|boolean)}
   */
  getTagById = id => {
    const tag = this.tags.filter(t => t.id === id)
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
    const tag = this.tags.filter(t => t.name === name)
    if (tag.length === 0) {
      return false
    }
    // 配列からオブジェクトを取り出す
    return tag.shift()
  }

  /**
   * 全てのタグを取得する
   * @return {object[]}
   */
  getTagsAll = () => {
    return this.tags
  }
}

export const tagApplicationService = new TagApplicationService(tagList)
