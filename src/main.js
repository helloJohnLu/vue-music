import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from "fastclick"
import './assets/css/base.scss'
import VueLazyload from 'vue-lazyload'


Vue.config.productionTip = false
Vue.use(VueLazyload, {
  // 配置 loading 来设置图片还未加载好之前的占位图片
  // loading: require('./assets/images/loading.png')
})

fastclick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
