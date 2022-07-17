import { getRoles, getPowerList } from '@/api/roles'
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
    console.log(res)
  },
  async getPowerList (context, type) {
    const res = await getPowerList(type)
    console.log(res)
    return res
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
