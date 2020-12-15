import Vue from 'vue'
import App from './components/App.vue'

import settings from './settings'
import http from 'axios'

Vue.prototype.$settings = settings
Vue.prototype.$http = http

var app = new Vue({
    el: '#app',
    render: h => h(App),
})