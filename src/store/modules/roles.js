import { getRoles } from '@/api/roles'
const state = {
  rolesList: []
}
const mutations = {
  updateRolesList (state, payload) {
    state.rolesList = payload
  }
}
const actions = {
  async getRoles (context) {
    const res = await getRoles()
    context.commit('updateRolesList', res)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
