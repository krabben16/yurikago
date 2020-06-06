<template>
  <div class="container">
    <div v-for="article in articles" :key="article.id" class="row c-article-list">
      <div class="col-12 col-sm-10 mx-sm-auto">
        <h5>
          <nuxt-link :to="{ name: 'articles-id', params: { id: article.id } }" class="u-link-color">
            {{ article.title }}
          </nuxt-link>
        </h5>
        <p class="text-muted">{{ article.posted_at }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    articles: Array
  }
}
</script>
