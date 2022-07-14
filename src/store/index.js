import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import roles from './modules/roles'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
  },
  getters,
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    roles
  }
})
export default store
