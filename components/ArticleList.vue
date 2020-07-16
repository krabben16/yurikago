<template>
  <div :class="className">
    <!-- NOTE: 二個目の記事からマージンを設定する -->
    <div v-for="(article, i) in articles" :key="article.id" :class="{ 'mt-5': i > 0 }">
      <h2>
        <nuxt-link :to="{ name: 'articles-id', params: { id: article.id } }" class="u-link-color">
          {{ article.title }}
        </nuxt-link>
      </h2>
      <div>
        <i class="far fa-clock" />
        {{ article.posted_at }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      default: ""
    },
    articles: {
      type: Array,
      required: true
    }
  }
}
</script>
