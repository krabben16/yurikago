import constant from './plugins/constant.js'

const url = [
  "/",
  "/about",
  "/arigato",
  "/articles/1",
  "/articles/2",
  "/articles/3",
  "/articles/4",
  "/articles/5",
  "/articles/6",
  "/articles/7",
  "/articles/8",
  "/articles/9",
  "/articles/10",
  "/articles/11",
  "/articles/12",
  "/articles/13",
  "/articles/14",
  "/articles/15",
  "/articles/16",
  "/articles/list/1",
  "/articles/list/2",
  "/articles/tag/1",
  "/articles/tag/2",
  "/articles/tag/3",
  "/articles/tag/4",
  "/articles/tag/5",
  "/articles/tag/6",
  "/articles/tag/7",
  "/articles/tag/8",
  "/articles/tag/9",
  "/articles/tag/10",
  "/articles/tag/11",
  "/articles/tag/12",
  "/articles/tag/13",
  "/articles/tag/14",
  "/articles/tag/15",
  "/articles/tag/16",
  "/articles/tag/17",
  "/articles/tag/18",
  "/articles/tag/19",
  "/articles/tag/20",
  "/articles/tag/21",
  "/articles/tag/22",
  "/articles/tag/23",
  "/articles/tag/24",
]

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
    routes: url
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // mdファイルはraw-loaderで読み込む
      config.module.rules.push({
        test: /\.md$/,
        loader: 'raw-loader',
        exclude: /(node_modules)/,
      })
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
    routes: url,
    // エラー発生時に 200.html ではなく 404.html を表示する
    fallback: true
  }
}
