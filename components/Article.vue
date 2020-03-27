<template>
  <div
    class="c-article-link"
    @mouseenter="isActive = true"
    @mouseleave="isActive = false"
    @click="changeRoute(article.id)"
  >
    <h5 :class="{ 'u-link-color': isActive }">{{ article.title }}</h5>
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
