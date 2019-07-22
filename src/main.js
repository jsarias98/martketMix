import Vue from 'vue'
import VueRouter from 'vue-router'
import './plugins/vuetify'
import routes from './router'
import App from './App.vue'
import store from './store/store'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({ mode: 'history', routes })

new Vue({
  store,
  render: h => h(App),
  router
}).$mount('#app')
