import Vue from 'vue'
import VueRouter from 'vue-router'
// 注意点：通过 import xxx from xxx 的方式加载组件，无论组件是否被使用，都会被加载
// import Recommend from "../views/Recommend";
// import Rank from "../views/Rank";
// import Search from "../views/Search";
// import Singer from "../views/Singer";

// 路由性能优化：组件按需加载
const Recommend = resolve => {
  import('../views/Recommend').then(module => resolve(module));
}
const Rank = resolve => {
  import('../views/Rank').then(module => resolve(module));
}
const Singer = resolve => {
  import('../views/Singer').then(module => resolve(module));
}
const Search = resolve => {
  import('../views/Search').then(module => resolve(module));
}

Vue.use(VueRouter)

const routes = [
  {path: '/', redirect: '/recommend'},
  {path: '/recommend', component: Recommend},
  {path: '/singer', component: Singer},
  {path: '/rank', component: Rank},
  {path: '/search', component: Search}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
