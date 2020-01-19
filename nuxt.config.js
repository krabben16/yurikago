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
  axios: {
    baseURL: process.env.NODE_ENV == 'production' ? 'https://www.yurikago-blog.com' : 'http://localhost:3000'
  },
  googleAnalytics: {
    id: 'UA-155216702-1'
  },
  proxy: {
    '/api': {
      target: process.env.NODE_ENV == 'production' ? 'http://ec2-54-92-76-213.ap-northeast-1.compute.amazonaws.com' : 'http://192.168.10.10',
      pathRewrite: {
        '^/api' : '/'
      }
    }
  },
  sitemap: {
    hostname: 'https://www.yurikago-blog.com',
    async routes () {
      let path = []

      // axios ベースURLのデフォルト http://[HOST]:[PORT][PREFIX]
      // develop server http://localhost:3000/sitemap.xml => OK ベースURL http://localhost:3000
      // develop client http://localhost:3000/sitemap.xml => NG ベースURL http://localhost:80

      const api = axios.create( {
        baseURL: process.env.NODE_ENV == 'production' ? 'https://www.yurikago-blog.com' : 'http://localhost:3000'
      })

      const response1 = await api.get(`/api/articles`)
      path.push(...response1.data.map(v => {
        return `/articles/${v.id}`
      }))

      const response2 = await api.get(`/api/tags`)
      path.push(...response2.data.map(v => {
        return `/tags/${v.id}`
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
  }
}
