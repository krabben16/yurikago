<template>
  <nav aria-label="breadcrumb">
    <ol v-if="$route.path != '/'" class="breadcrumb">
      <li class="breadcrumb-item">
        <nuxt-link :to="{ name: 'index' }" class="breadcrumb-item">サイトトップ</nuxt-link>
      </li>
      <li class="breadcrumb-item active" aria-current="page">{{ pageName }}</li>
    </ol>
  </nav>
</template>

<script>
export default {
  props: [
    'pageName'
  ]
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  background-color: inherit;
  // デフォルトのマージンをリセット
  margin-bottom: 0;
}
</style>
