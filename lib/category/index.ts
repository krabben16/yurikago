interface IArticleCategory {
  id: number
  name: string
}

interface ICategories {
  [key: number]: string
}

interface IRelations {
  [key: number]: number
}

const categories: ICategories = {
  1: 'サーバーサイド',
  2: 'フロントエンド',
  3: 'その他',
}

const relations: IRelations = {
  1: 1,
  2: 2,
  3: 3,
  4: 2,
  5: 1,
  6: 1,
  7: 1,
  8: 2,
  9: 2,
  10: 2,
  11: 2,
  12: 2,
  13: 2,
  14: 2,
  15: 1,
  16: 1,
  17: 2,
  18: 2,
  19: 2,
  20: 2,
  21: 1,
  22: 2,
  23: 2,
  24: 3,
  25: 2,
}

/**
 * 記事IDからカテゴリを生成する
 * @param articleId
 */
export function createCategory(articleId: number): IArticleCategory | null {
  const relationKey: keyof IRelations = articleId

  if (!Object.keys(relations).includes(articleId.toString())) {
    return null
  }

  const categoryId = relations[relationKey]

  return { id: categoryId, name: categories[categoryId] }
}
