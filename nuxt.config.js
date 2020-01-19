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
    '@nuxtjs/axios',
    '@nuxtjs/google-analytics',
    '@nuxtjs/proxy',
    '@nuxtjs/sitemap'
  ],
  googleAnalytics: {
    id: 'UA-155216702-1'
  },
  proxy: {
    '/api/': {
      target: process.env.NODE_ENV == 'production' ? 'http://192.168.10.10' : 'http://192.168.10.10',
      pathRewrite: {
        '^/api/' : '/'
      }
    }
  },
  sitemap: {
    hostname: 'https://yurikago-blog.netlify.com',
    routes () {
      let path = []

      // 記事一覧
      axios.get('/api/articles')
        .then(response => {
          path.push(...response.data.map(v => {
            return `/articles/${v.id}/`
          }))
        })

      // タグ一覧
      axios.get('/api/tags')
        .then(response => {
          path.push(...response.data.map(v => {
            return `/tags/${v.id}/`
          }))
        })

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
      axios.get('/api/articles')
        .then(response => {
          path.push(...response.data.map(v => {
            return `/articles/${v.id}/`
          }))
        })

      // タグ一覧
      axios.get('/api/tags')
        .then(response => {
          path.push(...response.data.map(v => {
            return `/tags/${v.id}/`
          }))
        })

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
