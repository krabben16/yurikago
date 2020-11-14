<template>
  <div class="container-fluid bg-white">
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
import { createHeadObject } from '~/resources/head/common'

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
    const { route } = useContext()

    useMeta(() => {
      const title = 'エラー'
      const description = 'エラーページです！'
      const path = route.value.path

      const breadcrumbSchema = {
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
      }

      return createHeadObject({
        title,
        description,
        path,
        breadcrumbSchema,
      })
    })
  },
})
</script>
