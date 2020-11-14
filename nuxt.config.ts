import type { NuxtConfig } from '@nuxt/types'

const frontUrl = 'https://www.yurikago-blog.com'
const githubUrl = 'https://github.com/krabben16/yurikago'
const maxArticleCountInList = 10
const articleAuthor = 'Hiroki Kawaguchi'
const articleOrganization = 'Yurikago Blog'
const siteOwner = 'Hiroki Kawaguchi'
const siteName = 'Yurikago Blog'
const disqusShortname = 'yurikago-blog'

const config: NuxtConfig = {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    // title: process.env.npm_package_name || "",
    titleTemplate: '%s | Yurikago Blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { property: 'og:image', content: frontUrl + '/images/ogp.jpg' },
      { property: 'og:site_name', content: siteName },
      { property: 'og:locale', content: 'ja_JP' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      /**
       * BootstrapCDN
       * https://www.bootstrapcdn.com/
       */
      {
        rel: 'stylesheet',
        href:
          'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
        integrity:
          'sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk',
        crossorigin: 'anonymous',
      },
      /**
       * Font Awesome CDN
       * https://fontawesome.com/account/cdn
       */
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.13.1/css/all.css',
        integrity:
          'sha384-xxzQGERXS00kBmZW/6qxqJPyxW3UR0BPsL4c8ILaIWXva5kFi7TxkIIaMiKtqV1Q',
        crossorigin: 'anonymous',
      },
      /**
       * github-markdown-css CDN
       * https://cdnjs.com/libraries/github-markdown-css/4.0.0
       */
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css',
        integrity:
          'sha512-Oy18vBnbSJkXTndr2n6lDMO5NN31UljR8e/ICzVPrGpSud4Gkckb8yUpqhKuUNoE+o9gAb4O/rAxxw1ojyUVzg==',
        crossorigin: 'anonymous',
      },
    ],
    script: [
      /**
       * jQuery CDN
       * https://code.jquery.com/
       */
      {
        src: 'https://code.jquery.com/jquery-3.5.1.slim.min.js',
        integrity: 'sha256-4+XzXVhsDmqanXGHaHvgh1gMQKX40OUvDEBTu8JcmNs=',
        crossorigin: 'anonymous',
        body: true,
      },
      {
        src:
          'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js',
        integrity:
          'sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI',
        crossorigin: 'anonymous',
        body: true,
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/scss/app.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/disqus'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/composition-api'],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['@nuxtjs/google-analytics', '@nuxtjs/sitemap', '@nuxt/content'],

  googleAnalytics: {
    id: 'UA-155216702-1',
  },

  sitemap: {
    hostname: frontUrl,
    routes: async () => {
      const routeList = []

      // https://content.nuxtjs.org/ja/advanced#%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9E%E3%83%86%E3%82%A3%E3%83%83%E3%82%AF%E3%81%AA%E5%88%A9%E7%94%A8%E6%96%B9%E6%B3%95
      const { $content } = require('@nuxt/content')
      const articles = await $content('articles').only(['id', 'tags']).fetch()

      for (let i = 0; i < articles.length; i++) {
        const article = articles[i]

        // 記事詳細
        routeList.push(`/articles/${article.id}`)

        for (let j = 0; j < article.tags.length; j++) {
          // 記事一覧 タグ
          routeList.push(`/tags/${article.tags[j].id}`)
        }
      }

      // 記事一覧 ページ
      const maxPageCount = Math.ceil(articles.length / maxArticleCountInList)

      for (let i = 0; i < maxPageCount; i++) {
        routeList.push(`/articles/list/${i + 1}`)
      }

      return routeList
    },
  },

  content: {
    nestedProperties: ['tags.id'],
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-nord.css',
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module?.rules.push({
          enforce: 'pre',
          test: /\.(ts|js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
  },

  // Customize the progress-bar color
  loading: { color: '#0366d6' },

  // NOTE: クライアントサイドで使用できる環境変数を定義する
  env: {
    FRONT_URL: frontUrl,
    GITHUB_URL: githubUrl,
    MAX_ARTICLE_COUNT_IN_LIST: maxArticleCountInList.toString(),
    ARTICLE_AUTHOR: articleAuthor,
    ARTICLE_ORGANIZATION: articleOrganization,
    SITE_OWNER: siteOwner,
    SITE_NAME: siteName,
    DISQUS_SHORTNAME: disqusShortname,
  },

  // NOTE: v2.13 から内部クローラーが実装されたのでroutesプロパティは不要
  generate: {
    // https://github.com/nuxt-community/composition-api/issues/44
    interval: 2000,
    // エラー発生時に 200.html ではなく 404.html を表示する
    fallback: true,
  },
}

export default config
