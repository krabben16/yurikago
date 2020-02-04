import axios from 'axios'

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
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Noto+Sans+JP:300&display=swap&subset=japanese' }
    ],
    script: [
      {
        src: 'https://code.jquery.com/jquery-3.3.1.min.js',
        integrity: 'sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=',
        crossorigin: 'anonymous',
        body: true
      },
      {
        src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js',
        integrity: 'sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy',
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
    'bootstrap/dist/css/bootstrap.min.css',
    'assets/css/default.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/breadcrumb.js',
    '~/plugins/disqus.js'
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
    '@nuxtjs/axios',
    '@nuxtjs/google-analytics',
    '@nuxtjs/sitemap'
  ],
  axios: {
    baseURL: process.env.NODE_ENV === 'production' ? 'https://api.yurikago-blog.com' : 'http://homestead.test'
  },
  googleAnalytics: {
    id: 'UA-155216702-1'
  },
  sitemap: {
    hostname: 'https://www.yurikago-blog.com',
    routes: async () => {
      let path = []

      // この関数はサーバーサイドで実行されるのでAPIサーバーのURLはクライアントから見えない
      const baseUrl = process.env.NODE_ENV === 'production' ? 'https://api.yurikago-blog.com' : 'http://homestead.test'

      const articles = await axios.get(`${baseUrl}/articles`)
      path.push(...articles.data.map(v => {
        return `/articles/${v.id}`
      }))

      const tags = await axios.get(`${baseUrl}/tags`)
      path.push(...tags.data.map(v => {
        return `/articles/tag/${v.id}`
      }))

      const totalArticleCount = await axios.get(`${baseUrl}/articles/count`)
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

      const baseUrl = process.env.NODE_ENV === 'production' ? 'https://api.yurikago-blog.com' : 'http://homestead.test'

      const articles = await axios.get(`${baseUrl}/articles`)
      path.push(...articles.data.map(v => {
        return `/articles/${v.id}`
      }))

      const tags = await axios.get(`${baseUrl}/tags`)
      path.push(...tags.data.map(v => {
        return `/articles/tag/${v.id}`
      }))

      const totalArticleCount = await axios.get(`${baseUrl}/articles/count`)
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
