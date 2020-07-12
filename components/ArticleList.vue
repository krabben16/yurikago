<template>
  <div>
    <!-- NOTE: 二個目の記事からマージンを設定する -->
    <div v-for="(article, i) in articles" :key="article.id" :class="{ 'mt-5': i > 0 }">
      <h5>
        <nuxt-link :to="{ name: 'articles-id', params: { id: article.id } }" class="u-link-color">
          {{ article.title }}
        </nuxt-link>
      </h5>
      <p class="text-muted">{{ article.posted_at }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    articles: {
      type: Array,
      required: true
    }
  }
}
</script>
