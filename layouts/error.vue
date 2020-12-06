<template>
  <div class="container px-sm-5 py-5 bg-white rounded shadow-sm">
    <!-- パンくず -->
    <div v-if="meta" class="row">
      <div class="col-12">
        <Breadcrumb :items="meta.breadcrumbSchema.items" />
      </div>
    </div>
    <div class="row pt-5">
      <div class="col-12">
        <div
          class="d-flex justify-content-center align-items-center"
          style="height: 500px"
        >
          <span v-if="error.statusCode === 404" class="display-4">
            {{ error.statusCode }} {{ error.message }}
          </span>
          <span v-else class="display-4">{{ error.statusCode }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  useMeta,
} from '@nuxtjs/composition-api'
import { NuxtError } from '@nuxt/types'
import { CommonHead } from '~/interfaces/Head'
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

    const meta = ref<CommonHead | null>(null)

    function fetchMeta() {
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
    }

    meta.value = fetchMeta()

    useMeta(() => {
      if (!meta.value) return {}
      return createHeadObject(meta.value)
    })

    return {
      meta,
    }
  },
})
</script>
