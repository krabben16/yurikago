/**
 * https://ktquez.github.io/vue-disqus/howto/nuxt.html
 */
import Vue from 'vue'
import VueDisqus, { VueDisqusOptions } from 'vue-disqus'

const option: VueDisqusOptions = {
  shortname: process.env.DISQUS_SHORTNAME,
}

Vue.use(VueDisqus, option)
