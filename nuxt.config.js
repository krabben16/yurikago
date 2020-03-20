import { axios } from './plugins/axios.js'

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
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Noto+Sans+JP:300&display=swap&subset=japanese' },
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
  loading: { color: 'lightseagreen' },
  /*
  ** Global CSS
  */
  css: [
    'assets/css/default.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/breadcrumb.js',
    '~/plugins/disqus.js',
    '~/plugins/axios.js'
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
    hostname: 'https://www.yurikago-blog.com',
    routes: async () => {
      let path = []

      const articles = await axios.get('/articles')
      path.push(...articles.data.map(v => {
        return `/articles/${v.id}`
      }))

      const tags = await axios.get('/tags')
      path.push(...tags.data.map(v => {
        return `/articles/tag/${v.id}`
      }))

      const totalArticleCount = await axios.get('/articles/count')
      const maxArticleCount = 10
      const maxPageCount = Math.ceil(totalArticleCount.data / maxArticleCount)
      path.push(...Array.from(Array(maxPageCount).keys()).map(v => {
        return `/articles/list/${v + 1}`
      }))

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
    }
  },
  generate: {
    // 動的なパラメーターを用いたルートを生成
    routes: async () => {
      let path = []

      const articles = await axios.get('/articles')
      path.push(...articles.data.map(v => {
        return `/articles/${v.id}`
      }))

      const tags = await axios.get('/tags')
      path.push(...tags.data.map(v => {
        return `/articles/tag/${v.id}`
      }))

      const totalArticleCount = await axios.get('/articles/count')
      const maxArticleCount = 10
      const maxPageCount = Math.ceil(totalArticleCount.data / maxArticleCount)
      path.push(...Array.from(Array(maxPageCount).keys()).map(v => {
        return `/articles/list/${v + 1}`
      }))

      return path
    },
    // エラー発生時に 200.html ではなく 404.html を表示する
    fallback: true
  }
}
