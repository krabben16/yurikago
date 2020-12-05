<template>
  <div class="container px-5 bg-white rounded shadow-sm">
    <div class="row">
      <div class="col-12">
        <div
          class="min-vh-100 d-flex justify-content-center align-items-center"
        >
          <p v-if="error.statusCode === 404" class="display-4">
            {{ error.statusCode }} {{ error.message }}
          </p>
          <p v-else class="display-4">{{ error.message }}</p>
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
        items: [
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
