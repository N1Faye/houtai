import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import dayjs from 'dayjs'
import ZkTable from 'vue-table-with-tree-grid'
Vue.use(ZkTable)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$dayjs = dayjs
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
