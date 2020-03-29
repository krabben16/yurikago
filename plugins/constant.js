import Vue from "vue"

const constant = {
  FRONT_URL: "https://www.yurikago-blog.com",
  API_URL: process.env.NODE_ENV === "production" ? "https://api.yurikago-blog.com" : "http://192.168.10.10",
  GITHUB_URL: "https://github.com/w9uZDFEYnT/yurikago",
  DISQUS_SHORTNAME: "yurikago-blog",
  MAX_ARTICLE_COUNT_IN_LIST: 10,
  ARTICLE_AUTHOR: "Hiroki Kawaguchi",
  ARTICLE_ORGANIZATION: "Yurikago Blog"
}

Vue.prototype.$constant = constant

export default constant
