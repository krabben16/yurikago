<template>
  <div>
    <div class="p-article">
      <div>{{ article.posted_at }}</div>
      <div class="clearfix">
        <div class="tags">
          <nuxt-link
            v-for="tag in article.tags"
            :key="tag.id"
            :to="{ name: 'articles-tag-id', params: { id: tag.id } }"
            class="badge badge-light"
          >
            {{ tag.name }}
          </nuxt-link>
        </div>
      </div>
      <h2>{{ article.title }}</h2>
      <Markdown :markdown-content="article.content" />
    </div>
    <div class="c-disqus">
      <vue-disqus :shortname="disqusShortname" :identifier="$route.path" :url="frontUrl + $route.path" />
    </div>
  </div>
</template>

<script>
import Markdown from "~/components/Markdown.vue"

export default {
  components: {
    Markdown
  },
  props: {
    article: Object
  },
  created() {
    this.disqusShortname = process.env.DISQUS_SHORTNAME
    this.frontUrl = process.env.FRONT_URL
  }
}
</script>
