<template>
  <div class="text-center">
    <span v-if="error.statusCode === 404" class="text-lg">
      {{ error.statusCode }} {{ error.message }}
    </span>
    <span v-else class="text-lg">{{ error.statusCode }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext, useMeta } from '@nuxtjs/composition-api'
import { NuxtError } from '@nuxt/types'
import { IBreadcrumbSchema } from '~/interfaces/schema'
import { createHeadObject } from '~/lib/head/common'
import { findBreadcrumb } from '~/lib/breadcrumb'

export default defineComponent({
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

      const breadcrumbSchema: IBreadcrumbSchema = {
        items: [
          findBreadcrumb('/'),
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
  // You need to define an empty head to activate this functionality
  head: {},
})
</script>
