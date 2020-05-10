import constant from './plugins/constant.js'

import axiosStatic from "axios"
const axiosInstance = axiosStatic.create({
  baseURL: constant.API_URL
})

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    // title: process.env.npm_package_name || '',
    titleTemplate: '%s | Yurikago Blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300&display=swap' },
      {
        rel: 'stylesheet',
        href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
        integrity: 'sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T',
        crossorigin: 'anonymous'
      }
    ],
    script: [
      {
        src: 'https://code.jquery.com/jquery-3.4.1.min.js',
        integrity: 'sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=',
        crossorigin: 'anonymous',
        body: true
      },
      {
        src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js',
        integrity: 'sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM',
        crossorigin: 'anonymous',
        body: true
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#0366d6' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/scss/app.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/constant.js',
    '~/plugins/axios.js',
    '~/plugins/disqus.js',
    '~/plugins/schema/breadcrumb.js',
    '~/plugins/schema/article.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/google-analytics',
    '@nuxtjs/sitemap'
  ],
  googleAnalytics: {
    id: 'UA-155216702-1'
  },
  sitemap: {
    hostname: constant.FRONT_URL,
    routes: async () => {
      const getMaxPageCount = async () => {
        const totalArticleCount = await axiosInstance.get('/articles/count')
        return Math.ceil(totalArticleCount.data / constant.MAX_ARTICLE_COUNT_IN_LIST)
      }

      const getArticlesListUrl = async maxPageCount  => {
        let url = []
        for (let i=1; i<=maxPageCount; i++) {
          url.push(`/articles/list/${i}`)
        }
        return url
      }

      const getArticlesUrl = async maxPageCount => {
        let url = []
        for (let i=1; i<=maxPageCount; i++) {
          const articles = await axiosInstance.get(`/articles?p=${i}`)
          for (let j=0; j<articles.data.length; j++) {
            const article = articles.data[j]
            url.push(`/articles/${article.id}`)
          }
        }
        return url
      }

      const getArticlesTagUrl = async () => {
        let url = []
        const tags = await axiosInstance.get('/tags')
        for (let i=0; i<tags.data.length; i++) {
          const tag = tags.data[i]
          url.push(`/articles/tag/${tag.id}`)
        }
        return url
      }

      let path = []
      const maxPageCount = await getMaxPageCount()
      path = path.concat(await getArticlesListUrl(maxPageCount))
      path = path.concat(await getArticlesUrl(maxPageCount))
      path = path.concat(await getArticlesTagUrl())

      return path
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }
    }
  },
  generate: {
    // 動的なパラメーターを用いたルートを生成
    routes: async () => {
      const getMaxPageCount = async () => {
        const totalArticleCount = await axiosInstance.get('/articles/count')
        return Math.ceil(totalArticleCount.data / constant.MAX_ARTICLE_COUNT_IN_LIST)
      }

      const getArticlesListUrl = async maxPageCount  => {
        let url = []
        for (let i=1; i<=maxPageCount; i++) {
          url.push(`/articles/list/${i}`)
        }
        return url
      }

      const getArticlesUrl = async maxPageCount => {
        let url = []
        for (let i=1; i<=maxPageCount; i++) {
          const articles = await axiosInstance.get(`/articles?p=${i}`)
          for (let j=0; j<articles.data.length; j++) {
            const article = articles.data[j]
            url.push(`/articles/${article.id}`)
          }
        }
        return url
      }

      const getArticlesTagUrl = async () => {
        let url = []
        const tags = await axiosInstance.get('/tags')
        for (let i=0; i<tags.data.length; i++) {
          const tag = tags.data[i]
          url.push(`/articles/tag/${tag.id}`)
        }
        return url
      }

      let path = []
      const maxPageCount = await getMaxPageCount()
      path = path.concat(await getArticlesListUrl(maxPageCount))
      path = path.concat(await getArticlesUrl(maxPageCount))
      path = path.concat(await getArticlesTagUrl())

      return path
    },
    // エラー発生時に 200.html ではなく 404.html を表示する
    fallback: true
  }
}
