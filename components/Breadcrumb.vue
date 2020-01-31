<template>
  <nav aria-label="breadcrumb">
    <ol v-if="$route.path === '/'" class="breadcrumb">
      <li class="breadcrumb-item" aria-current="page">
        トップページ
      </li>
    </ol>
    <ol v-else class="breadcrumb">
      <li class="breadcrumb-item">
        <nuxt-link :to="{ name: 'index' }" class="text-info">トップページ</nuxt-link>
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
  // デフォルトのマージンをリセット
  margin-bottom: 0;
  
  background-color: inherit;
  margin-top: 50px;

  a {
    text-decoration: none;
  }
}
</style>
