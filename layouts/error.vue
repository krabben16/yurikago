<template>
  <div class="text-center text-light">
    <span v-if="error.statusCode === 404" class="h4">
      {{ error.statusCode }} {{ error.message }}
    </span>
    <span v-else class="h4">{{ error.statusCode }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext, useMeta } from '@nuxtjs/composition-api'
import { NuxtError } from '@nuxt/types'
import { BreadcrumbSchema } from '~/interfaces/Schema'
import { createHeadObject } from '~/lib/head/common'

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

      const breadcrumbSchema: BreadcrumbSchema = {
        items: [
          {
            name: 'トップページ',
            path: '/',
          },
          {
            name: title,
            path: route.value.path,
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

    return {}
  },
})
</script>
