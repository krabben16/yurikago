import Vue from "vue"
import constant from "~/plugins/constant.js"

const getJoinedTagName = article_tags => {
  return article_tags
    .map(article_tag => {
      return article_tag.tag.name
    })
    .join(",")
}

Vue.prototype.$getJoinedTagName = getJoinedTagName

Vue.prototype.$getArticleSchema = article => {
  const joinedTagName = getJoinedTagName(article.article_tags)

  const articleSchema = {
    "@context": "http://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${constant.FRONT_URL}/articles/${article.id}`
    },
    "headline": article.title,
    "image": [`${constant.FRONT_URL}/icon.jpg`],
    "datePublished": `${article.posted_at}T00:00:00+09:00`,
    "dateModified": `${article.posted_at}T00:00:00+09:00`,
    "author": {
      "@type": "Person",
      "name": constant.ARTICLE_AUTHOR
    },
    "publisher": {
      "@type": "Organization",
      "name": constant.ARTICLE_ORGANIZATION,
      "logo": {
        "@type": "ImageObject",
        "url": `${constant.FRONT_URL}/icon.jpg`
      }
    },
    "description": `「${article.title}」についてまとめた記事です。この記事には以下のキーワード「${joinedTagName}」が含まれます。`
  }

  return JSON.stringify(articleSchema)
}
