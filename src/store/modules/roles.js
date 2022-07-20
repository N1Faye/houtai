import { getPowerList } from '@/api/roles'
const state = {
  rolesList: []
}
const mutations = {
  updateRolesList (state, payload) {
    state.rolesList = payload
  }
}
const actions = {
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
