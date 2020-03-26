import Vue from "vue"

const constant = {
  FRONT_URL: "https://www.yurikago-blog.com",
  API_URL: process.env.NODE_ENV === "production" ? "https://api.yurikago-blog.com" : "http://192.168.10.10",
  GITHUB_URL: "https://github.com/w9uZDFEYnT/yurikago"
}

Vue.prototype.$constant = constant

export default constant
