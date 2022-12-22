import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from "vue-axios";
import axios from "axios";
import "../src/assets/Stock_txns_stylesheet.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"

// font awesome stuff
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, fas, faR } from '@fortawesome/free-solid-svg-icons'

// font awesome stuff
library.add(faUserSecret, fas, faR)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueAxios, axios);

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
