/**
 * https://ktquez.github.io/vue-disqus/howto/nuxt.html
 */
import Vue from 'vue'
import VueDisqus from 'vue-disqus'

Vue.use(VueDisqus, {
  shortname: process.env.DISQUS_SHORTNAME,
})
