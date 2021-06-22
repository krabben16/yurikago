import type { NuxtConfig } from '@nuxt/types'
import { contentFunc } from '@nuxt/content/types/content'
import dotenv from 'dotenv'
import { createTags } from './lib/tags'

dotenv.config()

async function fetchContent() {
  // https://content.nuxtjs.org/ja/advanced#%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9E%E3%83%86%E3%82%A3%E3%83%83%E3%82%AF%E3%81%AA%E5%88%A9%E7%94%A8%E6%96%B9%E6%B3%95
  const { $content }: { $content: contentFunc } = require('@nuxt/content')
  const res = await $content().fetch()
  return Array.isArray(res) ? res : [res]
}

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
      {
        property: 'og:image',
        content: process.env.FRONT_URL + '/images/ogp.jpg',
      },
      { property: 'og:site_name', content: process.env.SITE_NAME || '' },
      { property: 'og:locale', content: 'ja_JP' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/disqus'],

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api',
    '@nuxtjs/tailwindcss',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxt/content',
    '@nuxtjs/google-analytics',
    '@nuxtjs/sitemap',
    '@nuxtjs/dayjs',
    '@nuxtjs/dotenv',
  ],

  content: {
    markdown: {
      rehypePlugins: ['rehype-plugin-image-native-lazy-loading'],
      prism: {
        theme: 'prism-themes/themes/prism-vsc-dark-plus.css',
      },
    },
    liveEdit: false,
  },

  // NOTE: 動作確認する際はyarn startする
  googleAnalytics: {
    id: 'UA-155216702-1',
  },

  sitemap: {
    hostname: process.env.FRONT_URL || '',
    routes: async () => {
      const routeList = []
      const articles = await fetchContent()

      for (const article of articles) {
        // 記事詳細
        const articleRoute = `/articles/${article.id}`
        routeList.push(articleRoute)

        const tags = createTags(article.id)
        for (const tag of tags) {
          // 記事一覧 タグ
          const tagRoute = `/tags/${tag.id}`
          if (!routeList.includes(tagRoute)) {
            routeList.push(tagRoute)
          }
        }
      }

      return routeList
    },
  },

  dayjs: {
    locales: ['ja'],
    defaultLocale: 'ja',
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },

  // Customize the progress-bar color
  loading: { color: '#0366d6' },

  generate: {
    // https://github.com/nuxt-community/composition-api/issues/44
    interval: 2000,
    // エラー発生時に 200.html ではなく 404.html を表示する
    fallback: true,
  },
}

export default config
