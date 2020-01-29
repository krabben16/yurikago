<template>
  <ul class="list-group">
    <nuxt-link :to="{ name: 'about' }" class="list-group-item list-group-item-action">About</nuxt-link>
    <nuxt-link :to="{ name: 'profile' }" class="list-group-item list-group-item-action">Profile</nuxt-link>
    <a href="#" class="list-group-item disabled list-group-item-action">Tags</a>
    <nuxt-link v-for="(tag, k) in tags" :key="k" :to="{ name: 'articles-tag-id', params: { id: tag.id } }" class="list-group-item list-group-item-action tag-link">
      {{ tag.name }}<span class="count">({{ tag.article_count }})</span>
    </nuxt-link>
    <nuxt-link :to="{ name: 'arigato' }" class="list-group-item list-group-item-action">Arigato</nuxt-link>
  </ul>
</template>

<script>
export default {
  methods: {
    async fetchTags () {
      const res = await this.$axios.$get('/api/tags')
      this.tags = res
    }
  },
  data () {
    return {
      tags: null
    }
  },
  mounted () {
    this.fetchTags()
  }
}
</script>

<style lang="scss" scoped>
.list-group {
  .tag-link {
    padding: .75rem 2.25rem;
  }

  .count {
    margin-left: 5px;
  }
}

/* SP */
@media screen and (max-width: 575px) {
  .list-group {
    margin-top: 40px;
  }
}
</style>
