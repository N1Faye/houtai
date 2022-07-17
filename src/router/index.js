import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/views/LogIn') },
  {
    path: '/home',
    component: () => import('@/views/Home'),
    children: [
      { path: '/users', component: () => import('@/views/Users') },
      { path: '/roles', component: () => import('@/views/Roles') },
      { path: '/power', component: () => import('@/views/Power') },
      { path: '/goodslist', component: () => import('@/views/GoodsList') },
      { path: '/goodslist/add', component: () => import('@/views/GoodsList/AddGoods') },
      { path: '/sortsparams', component: () => import('@/views/SortsParams') },
      { path: '/goodssorts', component: () => import('@/views/GoodsSorts') },
      { path: '/orderlist', component: () => import('@/views/OrderList') },
      { path: '/datareport', component: () => import('@/views/DataReport') }

    ]
  }

]

const router = new VueRouter({
  routes
})
// 路由守卫
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     next()
//   } else {
//     const token = store.getters.token

//     if (token === null || token === '') {
//       next({ path: '/login' })
//     } else {
//       next()
//     }
//   }
// })
export default router
