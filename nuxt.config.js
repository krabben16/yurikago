import { tagList } from './const/tagList'
import { articleList } from './const/articleList'

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
      { src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js',
        integrity: 'sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy',
        crossorigin: 'anonymous',
        body: true
      },
      {
        src: '/js/loading.js',
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
    ['@nuxtjs/google-analytics', {
      id: 'UA-155216702-1'
    }],
    ['@nuxtjs/sitemap', {
      path: '/sitemap.xml',
      hostname: 'https://www.yurikago-blog.com',
      routes () {
        let path = []

        // 記事一覧
        path.push(...articleList.map(v => {
          return `/articles/${v.id}/`
        }))
  
        // タグ一覧
        const tagValues = Object.values(tagList)
        path.push(...tagValues.map(tag => {
          return `/tags/${tag.id}/`
        }))
  
        return path
      }
    }]
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      config.module.rules.push({
        test: /\.md$/,
        loader: 'raw-loader',
        exclude: /(node_modules)/,
      });
    }
  },
  // generateコマンドを実行するとき動的なパラメーターを用いたルートを生成
  generate: {
    routes () {
      let path = []

      // 記事一覧
      path.push(...articleList.map(v => {
        return `/articles/${v.id}/`
      }))

      // タグ一覧
      const tagValues = Object.values(tagList)
      path.push(...tagValues.map(tag => {
        return `/tags/${tag.id}/`
      }))

      return path
    },
    // エラー発生時に 200.html ではなく 404.html を表示する
    fallback: true
  },
  router: {
    // URL末尾にスラッシュを付与する
    trailingSlash: true
  }
}
