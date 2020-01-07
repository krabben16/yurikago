<template>
  <div class="container">
    <Header />
    <div class="main">
      <div class="main__wrapper">
        <nuxt />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss" scoped>
.container {
  // 背景色
  background-color: ghostwhite;
}

header {
  width: 100%;
  height: 10vh;

  margin-bottom: 5vh;

  // 背景色
  background-color: lightsteelblue;
}

.main {
  width: 60%;
  min-height: 75vh;

  margin: 0 auto;

  // 背景色
  background-color: white;

  &__wrapper {
    padding: 3em 5em;
  }
}

footer {
  width: 100%;
  height: 10vh;

  // 中央寄せ
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
