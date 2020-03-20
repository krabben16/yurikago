<template>
  <nav class="navbar navbar-expand-sm navbar-light">
    <nuxt-link :to="{ name: 'index' }" class="navbar-brand">Yurikago Blog</nuxt-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <nuxt-link :to="{ name: 'about' }" class="nav-link">About</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link :to="{ name: 'profile' }" class="nav-link">Profile</nuxt-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Tags
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <nuxt-link v-for="(tag, k) in tags" :key="k" class="dropdown-item" :to="{ name: 'articles-tag-id', params: { id: tag.id } }">
              {{ tag.name }} ({{ tag.article_count }})
            </nuxt-link>
          </div>
        </li>
        <li class="nav-item">
          <nuxt-link :to="{ name: 'arigato' }" class="nav-link">Arigato</nuxt-link>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item nav-item-github">
          <a href="https://github.com/w9uZDFEYnT/yurikago" target="_blank">
            <picture>
              <source srcset="/images/common/GitHub-Mark-32px.webp" type="image/webp">
              <img src="/images/common/GitHub-Mark-32px.png" alt="GitHub">
            </picture>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    async fetchTags () {
      const tags = await this.$axios.get('/tags')
      this.tags = tags.data
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
nav {
  margin-bottom: 50px;

  @media screen and (max-width: 575px) {
    .nav-item-github {
      display: none;
    }
  }
}
</style>
