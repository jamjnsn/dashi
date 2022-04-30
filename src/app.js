import Vue from 'vue'
import VueFeather from 'vue-feather'
import App from './components/App.vue'

import settings from './settings'
import http from 'axios'

// CSS resources
import 'modern-css-reset'
import '@fontsource/poppins'
import './css/app.css'

// Register components
Vue.use(VueFeather)

// Globals
Vue.prototype.$settings = settings
Vue.prototype.$http = http
Vue.prototype.$inEditMode = false
Vue.prototype.$showSettingsPanel = false

// Automatically import components
const files = require.context('./', true, /\.vue$/i)
files
	.keys()
	.map((key) =>
		Vue.component(key.split('/').pop().split('.')[0], files(key).default)
	)

// Load settings before rendering Vue
settings.load().then(() => {
	// Create app
	var app = new Vue({
		el: '#app',
		render: (h) => h(App),
	})
})
