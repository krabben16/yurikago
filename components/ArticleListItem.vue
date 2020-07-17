<template>
  <div class="p-card py-2" @mouseover="mouseOverAction" @mouseleave="mouseLeaveAction">
    <nuxt-link :to="{ name: 'articles-id', params: { id: article.id } }" class="u-link-color">
      <div class="card shadow-sm">
        <div v-if="article.thumbnail" class="text-center py-5 text-dark" :class="article.thumbnail.bgClass">
          <span>
            <i class="p-card__image" :class="article.thumbnail.iconClass"></i>
          </span>
        </div>
        <div class="card-body">
          <h5 class="card-title p-card__title" :class="{ 'u-underline': isMouseOver === true }">
            {{ article.title }}
          </h5>
          <div class="text-muted">
            <i class="far fa-clock" />
            {{ article.posted_at }}
          </div>
        </div>
      </div>
    </nuxt-link>
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
  data() {
    return {
      isMouseOver: false
    }
  },
  methods: {
    mouseOverAction() {
      this.isMouseOver = true
    },
    mouseLeaveAction() {
      this.isMouseOver = false
    }
  }
}
</script>
