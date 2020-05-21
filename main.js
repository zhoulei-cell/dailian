import Vue from 'vue'
import App from './App'

import store from './store'

Vue.config.productionTip = false
import http from '@/common/http.js';
Vue.prototype.$http = http
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
