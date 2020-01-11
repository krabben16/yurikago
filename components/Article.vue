<template>
  <nuxt-link :to="{ name: 'articles-id', params: { id: article.id } }">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ article.title }}</h5>
        <h6 class="card-subtitle text-muted">{{ article.date }}</h6>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: [
    'article'
  ]
}
</script>
