import Vue from 'vue'
import App from './App'

import '_shared/lib/style/global.styl'


// #ifdef H5
// import webPlugin from './platform/web'
// Vue.use(webPlugin)
// #endif 

// #ifdef  MP
import uniPlugin from '_platform/lib/uni/runtime'

Vue.use(uniPlugin)
// #endif

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()