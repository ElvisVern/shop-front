import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

export const constantRoutes = [
  // 登陆
  {
    path: '/',
    component: () => import('@/views/login/index'),
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
  },
  {
    path: '/redirect',
    component: Layout,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
  },
  {
    path: '/home',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      },
      {
        path: 'goods/list',
        component: () => import('@/views/goods/list'),
        name: 'goodsList',
        meta: {
          title: '商品管理'
        }
      },
      {
        path: 'goods/create',
        component: () => import('@/views/goods/create'),
        name: 'goodsCreate',
        meta: {
          title: '商品上架'
        }
      },
      {
        path: 'goods/view',
        component: () => import('@/views/goods/view'),
        name: 'goodsVeiw',
        meta: {
          title: '商品浏览'
        }
      }
    ]
  }
]

const createRouter = () => new Router({
  routes: constantRoutes
})

const router = createRouter()

export default router
