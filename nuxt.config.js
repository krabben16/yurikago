import articleList from './assets/json/articleList.json'

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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
      hostname: 'https://yurikago-blog.netlify.com',
      routes () {
        let path = []

        // 記事一覧
        path.push(...articleList.map(v => {
          return `/articles/${v.id}/`
        }))
  
        // タグ一覧
        const tags = articleList.reduce((pre, current) => {
          pre.push(...current.tags)
          return pre
        }, [])
  
        // ユニークなタグを取得
        const uniqTags = Array.from(new Set(tags))
        path.push(...uniqTags.map(tag => {
          return `/tags/${tag}/`
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
      const tags = articleList.reduce((pre, current) => {
        pre.push(...current.tags)
        return pre
      }, [])

      // ユニークなタグを取得
      const uniqTags = Array.from(new Set(tags))
      path.push(...uniqTags.map(tag => {
        return `/tags/${tag}/`
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
