/**
 * ドキュメント
 * https://developers.google.com/search/docs/data-types/breadcrumb?hl=ja
 */

/**
 * パンくずの構造化データを作成する
 * @param {object[]}
 * @return {object}
 */
export const createBreadcrumbSchemaObject = breadcrumbItemList => {
  const itemList = breadcrumbItemList.map((v, k) => {
    return {
      "@type": "ListItem",
      "position": k + 1,
      "name": v.name,
      "item": process.env.FRONT_URL + v.path
    }
  })

  return {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": itemList
  }
}
