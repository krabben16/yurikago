<template>
  <nav class="navbar navbar-expand-sm navbar-dark">
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
            <nuxt-link v-for="tag in tags" :key="tag.id" class="dropdown-item" :to="{ name: 'tags-id', params: { id: tag.id } }">{{ tag.name }}</nuxt-link>
          </div>
        </li>
        <li class="nav-item">
          <nuxt-link :to="{ name: 'arigato' }" class="nav-link">&#x1f64f;</nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import articleList from '~/assets/json/articleList.json'

export default {
  data () {
    // タグ一覧
    const tags = articleList.reduce((pre, current) => {
      pre.push(...current.tags)
      return pre
    }, [])
    
    // タグの重複を削除
    let uniqTags = []
    tags.map(tag => {
      if (uniqTags.filter(v => v.id == tag.id).length == 0) {
        uniqTags.push(tag)
      }
    })

    return {
      tags: uniqTags
    }
  }
}
</script>

<style lang="scss" scoped>
nav {
  background-color: lightslategray;
}
</style>
