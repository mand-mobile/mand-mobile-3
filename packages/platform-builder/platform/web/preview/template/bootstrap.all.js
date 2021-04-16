import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.all'
import routes from './route'

Vue.config.productionTip = false

Vue.use(VueRouter)

const isProd = process.env.NODE_ENV === 'production'

const router = new VueRouter({
  mode: 'hash',
  base: isProd ? '/mand-mobile/examples' : '',
  routes,
})

router.afterEach(route => {
  document.title = route.name ? `${route.name}-Mand Mobile` : 'Mand Mobile'
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
})
