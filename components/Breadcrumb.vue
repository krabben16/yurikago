<template>
  <nav aria-label="breadcrumb">
    <!-- NOTE: デフォルトのマージンをリセット -->
    <ol class="breadcrumb mt-5 mb-0">
      <li
        v-for="(v, k) in breadcrumbItemList"
        :key="k"
        class="breadcrumb-item"
        :class="{ active: k === breadcrumbItemList.length - 1 }"
        :aria-current="k === breadcrumbItemList.length - 1 ? 'page' : ''"
      >
        <span v-if="k === breadcrumbItemList.length - 1">{{ v.name }}</span>
        <nuxt-link v-else :to="v.path" class="c-link">{{ v.name }}</nuxt-link>
      </li>
    </ol>
  </nav>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters("breadcrumb", ["breadcrumbItemList"])
  }
}
</script>
