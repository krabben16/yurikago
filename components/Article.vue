<template>
  <div>
    <div class="p-article">
      <div>{{ article.posted_at }}</div>
      <div class="clearfix">
        <div class="tags">
          <!-- NOTE: 二個目のタグからマージンレフトを設定する -->
          <nuxt-link
            v-for="(tag, i) in article.tags"
            :key="tag.id"
            :to="{ name: 'articles-tag-id', params: { id: tag.id } }"
            class="badge badge-light"
            :class="{ 'ml-3': i > 0 }"
          >
            {{ tag.name }}
          </nuxt-link>
        </div>
      </div>
      <h2 class="my-5">{{ article.title }}</h2>
      <Markdown :markdown-content="article.content" />
    </div>
    <div class="mt-5">
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
