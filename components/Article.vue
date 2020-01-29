<template>
  <div
    class="card"
    v-bind:class="{ shadow: isActive }"
    @mouseenter="isActive = true"
    @mouseleave="isActive = false"
    @click="changeRoute(article.id)"
  >
    <div class="card-body">
      <h5 class="card-title">{{ article.title }}</h5>
      <h6 class="card-subtitle text-muted">{{ article.posted_at }}</h6>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'article'
  ],
  methods: {
    changeRoute (id) {
      this.$router.push(`/articles/${id}`)
    }
  },
  data () {
    return {
      isActive: false
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  cursor: pointer;
}
</style>
