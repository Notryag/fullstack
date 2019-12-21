import Vue from 'vue'
import axios from 'axios'

import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element'
import './plugins/avue'

const http = axios.create({
  baseURL:'http://localhost:3000'
})

Vue.prototype.$http = http



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
