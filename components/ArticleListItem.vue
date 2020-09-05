<template>
  <div class="py-3" @mouseover="mouseOverAction" @mouseleave="mouseLeaveAction">
    <nuxt-link :to="{ name: 'articles-id', params: { id: article.id } }">
      <h3>
        {{ article.title }}
      </h3>
    </nuxt-link>
    <div class="mt-3">
      <i class="far fa-clock mr-1" />
      {{ article.date }}
    </div>
    <div class="mt-2">
      <i class="fas fa-tag mr-1" />
      <!-- NOTE: 二個目のタグからマージンを設定する -->
      <nuxt-link
        v-for="(tag, i) in article.tags"
        :key="i"
        :to="{ name: 'tag-name', params: { name: tag } }"
        :class="{ 'ml-2': i > 0 }"
      >
        {{ tag }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isMouseOver: false
    }
  },
  methods: {
    mouseOverAction () {
      this.isMouseOver = true
    },
    mouseLeaveAction () {
      this.isMouseOver = false
    }
  }
}
</script>
