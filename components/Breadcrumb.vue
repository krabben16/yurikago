<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li
        v-for="(v, k) in breadcrumbItemList"
        :key="k"
        class="breadcrumb-item"
        :class="{ active: k === breadcrumbItemList.length - 1 }"
        :aria-current="k === breadcrumbItemList.length - 1 ? 'page' : ''"
      >
        <span v-if="k === breadcrumbItemList.length - 1">{{ v.name }}</span>
        <nuxt-link v-else :to="v.path" class="u-link-color">{{ v.name }}</nuxt-link>
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
