const tags = [
  {
    id: 1,
    name: "CentOS"
  },
  {
    id: 2,
    name: "Tesseract"
  },
  {
    id: 3,
    name: "Chromium"
  },
  {
    id: 4,
    name: "Node.js"
  },
  {
    id: 5,
    name: "Puppeteer"
  },
  {
    id: 6,
    name: "Google Chrome"
  },
  {
    id: 7,
    name: "Selenium"
  },
  {
    id: 8,
    name: "Lighthouse"
  },
  {
    id: 9,
    name: "Alpine Linux"
  },
  {
    id: 10,
    name: "NLTK"
  },
  {
    id: 11,
    name: "Python"
  },
  {
    id: 12,
    name: "Homestead"
  },
  {
    id: 13,
    name: "HeidiSQL"
  },
  {
    id: 14,
    name: "PostgreSQL"
  },
  {
    id: 15,
    name: "PHP"
  },
  {
    id: 16,
    name: "VSCode"
  },
  {
    id: 17,
    name: "Xdebug"
  },
  {
    id: 18,
    name: "Marked.js"
  },
  {
    id: 19,
    name: "Nuxt.js"
  },
  {
    id: 20,
    name: "JavaScript"
  },
  {
    id: 21,
    name: "HTML"
  },
  {
    id: 22,
    name: "Postman"
  },
  {
    id: 23,
    name: "Disqus"
  },
  {
    id: 24,
    name: "cURL"
  },
  {
    id: 25,
    name: "Git for Windows"
  }
]

/**
 * タグ名称を句点で連結する
 * @param {Array} tags
 */
export const getJoinedTagsName = tags => {
  return tags.map(t => t.name).join(",")
}

/**
 * タグIDからタグデータを取得する
 * @param {Number} id
 */
export const getTagById = id => {
  const tag = tags.filter(t => t.id === id)
  if (tag.length === 0) {
    return false
  }
  // 配列からオブジェクトを取り出す
  return tag.shift()
}

/**
 * タグ名称からタグデータを取得する
 * @param {String} name
 */
export const getTagByName = name => {
  const tag = tags.filter(t => t.name === name)
  if (tag.length === 0) {
    return false
  }
  // 配列からオブジェクトを取り出す
  return tag.shift()
}

/**
 * 全てのタグを取得する
 */
export const getTagsAll = () => {
  return tags
}
