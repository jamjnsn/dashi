import Vue from 'vue'
import VueFeather from 'vue-feather'
import App from './components/App.vue'

import settings from './settings'
import http from 'axios'

// Register components
Vue.use(VueFeather)

const files = require.context('./', true, /\.vue$/i)
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

// Set globals
Vue.prototype.$settings = settings
Vue.prototype.$http = http

// Create app
var app = new Vue({
    el: '#app',
    render: h => h(App),
})