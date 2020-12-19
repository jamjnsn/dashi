import Vue from 'vue'
import VueRouter from 'vue-router'
import VueFeather from 'vue-feather'
import App from './components/App.vue'

import settings from './settings'
import http from 'axios'
import { CompatSource } from 'webpack-sources'

// Register components
Vue.use(VueFeather)
Vue.use(VueRouter)

// Globals
Vue.prototype.$settings = settings
Vue.prototype.$http = http
Vue.prototype.$inEditMode = false
Vue.prototype.$showSettingsPanel = false

// Settings routes
import GeneralSettings from './components/settings/GeneralSettings.vue'

const routes = [
    { path: '/settings/general', component: GeneralSettings }
]

const router = new VueRouter({
    routes
})

// Automatically import components
const files = require.context('./', true, /\.vue$/i)
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

// Load settings before rendering Vue
settings
    .load()
    .then(() => {

        // Create app
        var app = new Vue({
            router,
            el: '#app',
            render: h => h(App),
        })
    })

