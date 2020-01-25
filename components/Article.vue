<template>
  <div
    class="card"
    v-bind:class="{ shadow: isActive }"
    @mouseenter="isActive = true"
    @mouseleave="isActive = false"
    @click="changeRoute(article.id)"
  >
    <picture v-if="hasImages">
      <source :srcset="'/images/articles/' + article.id + '/thumbnail.webp'" type="image/webp">
      <img class="card-img-top" :src="'/images/articles/' + article.id + '/thumbnail.png'" alt="thumbnail">
    </picture>
    <picture v-else>
      <source srcset="/images/articles/dummy.webp" type="image/webp">
      <img class="card-img-top" src="/images/articles/dummy.png" alt="thumbnail">
    </picture>
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
  computed: {
    hasImages () {
      return this.article.images.length > 0
    }
  },
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
a {
  text-decoration: none;
}

.card {
  cursor: pointer;
}

.card-title {
  height: 80px;
}
</style>
