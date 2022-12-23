import Vue from "vue"
import App from "@/App"
import responsive from 'vue-responsive'
import "@/assets/styles/global.less"

import quasarConfig from "@/Quasar"
Vue.use(...quasarConfig)
Vue.use(responsive)

new Vue({
    el: "#app",
    render: h => h(App)
})
