<template>
  <div
    class="card"
    v-bind:class="{ shadow: isActive }"
    @mouseenter="isActive = true"
    @mouseleave="isActive = false"
    @click="changeRoute(article.id)"
  >
    <picture v-if="hasThumbnail">
      <source :srcset="'/images/articles/' + article.id + '/thumbnail.webp'" type="image/webp">
      <img class="card-img-top" :src="'/images/articles/' + article.id + '/thumbnail.png'" alt="thumbnail">
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
    hasThumbnail () {
      // TODO バックエンドでサムネイル画像の存在を確認する
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
.card {
  cursor: pointer;
}
</style>
