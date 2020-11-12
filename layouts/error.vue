<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-sm-9 mx-sm-auto">
        <div
          class="min-vh-100 d-flex justify-content-center align-items-center"
        >
          <h1 v-if="error.statusCode === 404">
            {{ error.statusCode }} {{ error.message }}
          </h1>
          <h1 v-else>{{ error.statusCode }} Error</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext, useMeta } from '@nuxtjs/composition-api'
import { NuxtError } from '@nuxt/types'

export default defineComponent({
  // You need to define an empty head to activate this functionality
  head: {},
  props: {
    error: {
      type: Object as () => NuxtError,
      required: true,
    },
  },
  setup() {
    const { app, route } = useContext()

    useMeta(() => {
      const title = 'エラー'
      const description = 'エラーページです！'
      const path = route.value.path

      const breadcrumbSchema = app.$createBreadcrumbSchema({
        breadcrumbItemList: [
          {
            name: 'トップページ',
            path: '/',
          },
          {
            name: title,
            path,
          },
        ],
      })

      return {
        title,
        meta: [
          {
            name: 'description',
            content: description,
          },
          {
            property: 'og:title',
            content: `${title} | Yurikago Blog`,
          },
          {
            property: 'og:type',
            content: 'blog',
          },
          {
            property: 'og:description',
            content: description,
          },
          {
            property: 'og:url',
            content: process.env.FRONT_URL + path,
          },
        ],
        script: [
          // 構造化マークアップ
          {
            hid: 'breadcrumbSchema',
            innerHTML: breadcrumbSchema,
            type: 'application/ld+json',
          },
        ],
        __dangerouslyDisableSanitizersByTagID: {
          breadcrumbSchema: ['innerHTML'],
        },
      }
    })
  },
})
</script>
