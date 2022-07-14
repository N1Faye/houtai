import { logIn } from '@/api/user'
import { setToken, getToken } from '@/utiles/auth'

const state = {
  token: getToken()
}
const mutations = {
  updateToken (state, payload) {
    state.token = payload
  }
}
const actions = {
  async logIn (context, { username, password }) {
    const res = await logIn({ username, password })
    context.commit('updateToken', res.token)
    setToken(res.token)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
