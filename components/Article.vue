<template>
  <nuxt-link :to="{ name: 'articles-id', params: { id: article.id } }">
    <div class="card">
      <picture v-if="hasImages">
        <source :srcset="article.images[0].src + '_t.webp'" type="image/webp">
        <img class="card-img-top" :src="article.images[0].src + '_t.png'" :alt="article.images[0].alt">
      </picture>
      <div class="card-body">
        <h5 class="card-title">{{ article.title }}</h5>
        <h6 class="card-subtitle text-muted">{{ article.posted_at }}</h6>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: [
    'article'
  ],
  computed:{
    hasImages () {
      return this.article.images.length > 0
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>
