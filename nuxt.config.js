import axios from 'axios'
import fs from 'fs'

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
        src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js',
        integrity: 'sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49',
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
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    'highlight.js/styles/zenburn.css',
    'assets/css/default.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/breadcrumb.js'
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
  googleAnalytics: {
    id: 'UA-155216702-1'
  },
  sitemap: {
    hostname: 'https://www.yurikago-blog.com',
    routes: async () => {
      let path = []

      const instance = axios.create({
        baseURL: process.env.NODE_ENV === 'production' ? 'http://ec2-54-92-76-213.ap-northeast-1.compute.amazonaws.com' : 'http://192.168.10.10'
      })

      // データ取得
      const articleList = await instance.get(`/articles`)
      const tagList = await instance.get(`/tags`)
      
      // 動的なパラメーターを用いたルートを生成
      path.push(...articleList.data.map(v => {
        return `/articles/${v.id}`
      }))
      
      path.push(...tagList.data.map(v => {
        return `/articles/tag/${v.id}`
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
    routes: async () => {
      let path = []

      const instance = axios.create({
        baseURL: process.env.NODE_ENV === 'production' ? 'http://ec2-54-92-76-213.ap-northeast-1.compute.amazonaws.com' : 'http://192.168.10.10'
      })

      const dir = './static/query/'

      // ディレクトリ存在チェック
      if (!fs.existsSync(dir)) fs.mkdirSync(dir)
      if (!fs.existsSync(`${dir}articles/`)) fs.mkdirSync(`${dir}articles/`)
      if (!fs.existsSync(`${dir}tags/`)) fs.mkdirSync(`${dir}tags/`)
      if (!fs.existsSync(`${dir}articles/tag/`)) fs.mkdirSync(`${dir}articles/tag/`)

      // データ取得
      const articleList = await instance.get(`/articles`)
      fs.writeFileSync(`${dir}articleList`, JSON.stringify(articleList.data))

      articleList.data.map(async v => {
        const article = await instance.get(`/articles/${v.id}`)
        fs.writeFileSync(`${dir}articles/${v.id}`, JSON.stringify(article.data))
      })

      const tagList = await instance.get(`/tags`)
      fs.writeFileSync(`${dir}tagList`, JSON.stringify(tagList.data))

      tagList.data.map(async v => {
        const tag = await instance.get(`/tags/${v.id}`)
        fs.writeFileSync(`${dir}tags/${v.id}`, JSON.stringify(tag.data))

        const articleList = await instance.get(`/articles/tag/${v.id}`)
        fs.writeFileSync(`${dir}articles/tag/${v.id}`, JSON.stringify(articleList.data))
      })

      const about = await instance.get(`/about`)
      fs.writeFileSync(`${dir}about`, JSON.stringify(about.data))

      const profile = await instance.get(`/profile`)
      fs.writeFileSync(`${dir}profile`, JSON.stringify(profile.data))

      const arigato = await instance.get(`/arigato`)
      fs.writeFileSync(`${dir}arigato`, JSON.stringify(arigato.data))

      // 動的なパラメーターを用いたルートを生成
      path.push(...articleList.data.map(v => {
        return `/articles/${v.id}`
      }))
      
      path.push(...tagList.data.map(v => {
        return `/articles/tag/${v.id}`
      }))

      return path
    },
    // エラー発生時に 200.html ではなく 404.html を表示する
    fallback: true
  }
}
