import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/views/LogIn') },
  { path: '/home', component: () => import('@/views/Home') }
]

const router = new VueRouter({
  routes
})
// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    const token = store.getters.token

    if (token === null || token === '') {
      next({ path: '/login' })
    } else {
      next()
    }
  }
})
export default router
