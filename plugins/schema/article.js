/**
 * 記事
 * https://developers.google.com/search/docs/data-types/article?hl=ja
 *
 * ロゴ
 * https://developers.google.com/search/docs/data-types/logo?hl=ja
 */

import Vue from "vue"
import { getJoinedTagsName } from "~/plugins/tags.js"

Vue.prototype.$getArticleSchema = article => {
  const joinedTagsName = getJoinedTagsName(article.tags)

  const articleSchema = {
    "@context": "http://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${process.env.FRONT_URL}/articles/${article.id}`
    },
    "headline": article.title,
    "image": [`${process.env.FRONT_URL}/16x9.jpg`],
    "datePublished": `${article.posted_at}T00:00:00+09:00`,
    "dateModified": `${article.posted_at}T00:00:00+09:00`,
    "author": {
      "@type": "Person",
      "name": process.env.ARTICLE_AUTHOR
    },
    "publisher": {
      "@type": "Organization",
      "name": process.env.ARTICLE_ORGANIZATION,
      "url": process.env.FRONT_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.FRONT_URL}/icon.jpg`
      }
    },
    "description": `「${article.title}」についてまとめた記事です。この記事には以下のキーワード「${joinedTagsName}」が含まれます。`
  }

  return JSON.stringify(articleSchema)
}
