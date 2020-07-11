<template>
  <div class="container">
    <div v-for="(article, i) in articles" :key="article.id" class="row">
      <div class="col-12 col-sm-10 mx-sm-auto">
        <!-- NOTE: 二個目の記事からマージンを設定する -->
        <div :class="{ 'mt-5': i > 0 }">
          <h5>
            <nuxt-link :to="{ name: 'articles-id', params: { id: article.id } }" class="u-link-color">
              {{ article.title }}
            </nuxt-link>
          </h5>
          <p class="text-muted">{{ article.posted_at }}</p>
        </div>
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
