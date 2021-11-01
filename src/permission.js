import router from './router'
import { getToken } from '@/utils/auth'

const whiteList = ['/login', '/auth-redirect']

router.beforeEach((to, from, next) => {
  if (getToken()) {
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

