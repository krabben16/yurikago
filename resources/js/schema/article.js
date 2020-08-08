/**
 * ドキュメント
 * https://developers.google.com/search/docs/data-types/article?hl=ja
 * https://developers.google.com/search/docs/data-types/logo?hl=ja
 */

/**
 * 記事の構造化データを作成する
 * @param {number} articleId
 * @param {string} headlineValue
 * @param {string} datePublishedValue
 * @param {string} dateModifiedValue
 * @return {object}
 */
export const createArticleSchemaObject = (articleId, headlineValue, datePublishedValue, dateModifiedValue) => {
  return {
    "@context": "http://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${process.env.FRONT_URL}/articles/${articleId}`
    },
    "headline": headlineValue,
    "image": [`${process.env.FRONT_URL}/images/schema/16x9.jpg`],
    "datePublished": datePublishedValue,
    "dateModified": dateModifiedValue,
    "author": {
      "@type": "Person",
      "name": process.env.ARTICLE_AUTHOR
    },
    "publisher": {
      "@type": "Organization",
      "name": process.env.ARTICLE_ORGANIZATION,
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.FRONT_URL}/images/schema/logo.jpg`
      }
    }
  }
}
