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
    // 分类
    path: '/kind',
    name: 'Kind',
    component: () => import(/* webpackChunkName: "king" */'@/views/kind')
  },
  {
    // 购物车
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "cart" */'@/views/cart')
  },
  {
    // 个人中心
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "user" */'@/views/user')
  },
  {
    // 商品详情
    path: '/detail/:proid',
    name: 'Detail',
    component: () => import(/* webpackChunkName: "detail" */'../views/detail/index.vue')
  },
  {
    // 注册
    path: '/register',
    name: 'register',
    redirect: '/register/step1',
    component: () => import(/* webpackChunkName: "registe" */'../views/register/index.vue'),
    children: [
      {
        path: 'step1',
        name: 'register1',
        component: () => import('../views/register/index1.vue')
      },
      {
        path: 'step2',
        name: 'register2',
        component: () => import('../views/register/index2.vue')
      },
      {
        path: 'step3',
        name: 'register3',
        component: () => import('../views/register/index3.vue')
      }
    ]
  },
  {
    // 登录
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */'../views/login/index.vue')
  },
  {
    // 订单
    path: '/order',
    name: 'Order',
    component: () => import(/* webpackChunkName: "order" */'../views/order/index.vue')
  },
  {
    // 地址
    path: '/address',
    name: 'Address',
    component: () => import(/* webpackChunkName: "address" */'../views/address/index.vue')
  },
  {
    // 搜索
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "search" */'../views/search/index.vue')
  },
  {
    // 搜索详情
    path: '/hresult/:keyword',
    name: 'Hresult',
    component: () => import(/* webpackChunkName: "hresult" */'../views/hresult/index.vue')
  },
  {
    // 用户设置
    path: '/settings',
    name: 'Settings',
    component: () => import(/* webpackChunkName: "settings" */'../views/settings/index.vue')
  },
  {
    // 404页面
    path: '/*',
    component: () => import(/* webpackChunkName: "error" */'@/views/error/NotFound.vue')
  }
]

const router = new VueRouter({
  // mode: 'history', // hash
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router

/**

    path: '/register',
    name: 'register',
    component: () => import('../views/register/index.vue'),
    children: [
      {
        path: 'step1',
        name: 'register1',
        component: () => import('../views/register/index1.vue')
      },
      {
        path: 'step2',
        name: 'register2',
        component: () => import('../views/register/index2.vue')
      },
      {
        path: 'step3',
        name: 'register3',
        component: () => import('../views/register/index3.vue')
      }
    ]
  }
**/
