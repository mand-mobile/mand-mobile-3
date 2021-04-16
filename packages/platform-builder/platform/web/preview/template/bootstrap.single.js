import Vue from 'vue'

import App from './App.single'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
})