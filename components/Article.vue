<template>
  <div
    class="link-wrapper"
    @mouseenter="isActive = true"
    @mouseleave="isActive = false"
    @click="changeRoute(article.id)"
  >
    <h5 :class="{ 'text-theme': isActive }">{{ article.title }}</h5>
    <h6 class="text-muted">{{ article.posted_at }}</h6>
  </div>
</template>

<script>
export default {
  props: ["article"],
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    changeRoute(id) {
      this.$router.push(`/articles/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.link-wrapper {
  cursor: pointer;
}
</style>
