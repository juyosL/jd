import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from /* webpackChunkName: "home" */ '../views/home/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // 重定向redirect
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    // 使用频率高,不使用懒加载
    component: Home
  },
  {
    path: '/kind',
    name: 'Kind',
    component: () => import(/* webpackChunkName: "king" */'@/views/kind')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "cart" */'@/views/cart')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "user" */'@/views/user')
  },
  {
    path: '/detail/:proid',
    name: 'Detail',
    component: () => import(/* webpackChunkName: "detail" */'../views/detail/index.vue')
  },
  {
    path: '/*',
    component: () => import(/* webpackChunkName: "error" */'@/views/error/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
