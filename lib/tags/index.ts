interface IArticleTag {
  id: number
  name: string
}

interface ITags {
  [tagId: number]: string
}

interface IRelations {
  [articleId: number]: number[]
}

const tags: ITags = {
  1: 'CentOS',
  2: 'Tesseract',
  3: 'Chromium',
  4: 'Node.js',
  5: 'Puppeteer',
  6: 'Chrome',
  7: 'Selenium',
  8: 'Lighthouse',
  9: 'Alpine Linux',
  10: 'NLTK',
  11: 'Python',
  12: 'Homestead',
  13: 'HeidiSQL',
  14: 'PostgreSQL',
  15: 'PHP',
  16: 'VSCode',
  17: 'Xdebug',
  18: 'Marked.js',
  19: 'Nuxt.js',
  20: 'JavaScript',
  21: 'HTML',
  22: 'Postman',
  23: 'Disqus',
  24: 'Bash',
  25: 'TypeScript',
  26: 'Webpack',
  27: 'Highlight.js',
  28: 'Laravel',
  29: 'Docker',
  30: 'Nginx',
  31: 'Jest',
  32: 'Playwright',
  33: 'Homebrew',
}

const relations: IRelations = {
  1: [1, 2],
  2: [1, 3, 4, 5],
  3: [6, 7],
  4: [1, 4, 5, 8],
  5: [9, 10, 11],
  6: [12, 13, 14],
  7: [1, 15, 16, 17],
  8: [3, 4, 5],
  9: [18, 19],
  10: [6, 20, 21],
  11: [19, 22],
  12: [6, 19, 23],
  13: [4, 12, 19],
  14: [20],
  15: [15],
  16: [24],
  17: [20, 21],
  18: [6, 20],
  19: [19, 25],
  20: [19, 26, 27],
  21: [15, 28, 29, 30],
  22: [1, 4, 8],
  23: [19, 25],
  24: [6, 8],
  25: [5, 25, 31],
  26: [3, 25, 31, 32],
  27: [4, 33],
}

/**
 * 記事IDからタグ一覧を生成する
 * @param articleId
 */
export function createTags(articleId: number) {
  const relationKey: keyof IRelations = articleId

  if (!Object.keys(relations).includes(articleId.toString())) {
    return []
  }

  const tagIds = relations[relationKey]

  return tagIds.map((tagId) => {
    const tagKey: keyof ITags = tagId
    return { id: tagId, name: tags[tagKey] }
  })
}

/**
 * タグIDから記事ID一覧を生成する
 * @param tagId
 */
export function createArticleIds(tagId: number) {
  const ret: number[] = []
  Object.keys(relations).forEach((k) => {
    const articleId = parseInt(k)
    const relationKey: keyof IRelations = articleId
    if (relations[relationKey].includes(tagId)) {
      ret.push(articleId)
    }
  })
  return ret
}

/**
 * タグIDからタグを生成する
 * @param tagId
 */
export function createTag(tagId: number): IArticleTag {
  const tagKey: keyof ITags = tagId
  return { id: tagId, name: tags[tagKey] }
}
