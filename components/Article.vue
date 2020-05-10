<template>
  <div>
    <h5>
      <nuxt-link :to="{ name: 'articles-id', params: { id: article.id } }" class="u-link-color">
        {{ article.title }}
      </nuxt-link>
    </h5>
    <p class="text-muted">{{ article.posted_at }}</p>
  </div>
</template>

<script>
export default {
  props: {
    article: Array
  }
}
</script>
