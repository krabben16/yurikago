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
            <nuxt-link v-for="(tag, k) in tags" :key="k" class="dropdown-item" :to="{ name: 'tags-id', params: { id: tag.id } }">
              {{ tag.name }} ({{ tag.count }})
            </nuxt-link>
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
import { tagList } from '~/const/tagList'
import { articleList } from '~/const/articleList'

export default {
  data () {
    // キーを削除
    const tagValues = Object.values(tagList)

    // タグに紐付いた記事の数を集計
    tagValues.map(tag => {
      tag.count = 0
    })

    articleList.map(article => {
      article.tags.map(articleTag => {
        tagValues.map(tag => {
          if (tag.id == articleTag.id) {
            tag.count++
          }
        })
      })
    })

    return {
      tags: tagValues
    }
  }
}
</script>

<style lang="scss" scoped>
nav {
  background-color: lightslategray;
}
</style>
