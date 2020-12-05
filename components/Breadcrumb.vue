<template>
  <div class="custom-breadcrumb">
    <span
      v-for="(v, k) in items"
      :key="k"
      class="custom-breadcrumb-item"
      :class="{ active: k === items.length - 1 }"
    >
      <nuxt-link v-if="k < items.length - 1" :to="v.path">{{
        v.name
      }}</nuxt-link>
      <template v-else>{{ v.name }}</template>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { BreadcrumbItem } from '~/interfaces/Schema'

export default defineComponent({
  props: {
    items: {
      type: Array as () => BreadcrumbItem[],
      required: true,
    },
  },
})
</script>
