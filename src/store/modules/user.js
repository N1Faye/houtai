import { logIn } from '@/api/user'

const state = {
  token: ''
}
const mutations = {
  setToken (state, payload) {
    state.token = payload
  }
}
const actions = {
  logIn (context, { username, password }) {
    return logIn({ username, password })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
