<template>
  <div class="container px-5 bg-white rounded shadow-sm">
    <!-- パンくず -->
    <div v-if="meta" class="row pt-5">
      <div class="col-12">
        <Breadcrumb :items="meta.breadcrumbSchema.items" />
      </div>
    </div>
    <div class="row pt-5 pb-5">
      <div class="col-12">
        <div class="py-5 d-flex justify-content-center align-items-center">
          <p v-if="error.statusCode === 404" class="display-4">
            {{ error.statusCode }} {{ error.message }}
          </p>
          <p v-else class="display-4">{{ error.statusCode }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useAsync,
  useContext,
  useMeta,
} from '@nuxtjs/composition-api'
import { NuxtError } from '@nuxt/types'
import { BreadcrumbSchema } from '~/interfaces/Schema'
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

    const meta = useAsync(() => {
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

      return {
        title,
        description,
        path,
        breadcrumbSchema,
      }
    })

    useMeta(() => {
      if (!meta.value) return {}

      return createHeadObject({
        title: meta.value.title,
        description: meta.value.description,
        path: meta.value.path,
        breadcrumbSchema: meta.value.breadcrumbSchema,
      })
    })

    return {
      meta,
    }
  },
})
</script>
