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
    try {
      const res = await getRoles()
      console.log(res)
      if (res.data.meta.status === 200) {
        context.commit('updateRolesList', res.data.data)
      } else {
        return Promise.reject(new Error(res.data.meta.msg))
      }
    } catch (error) {
      return Promise.reject(new Error('获取角色列表失败，请重试~'))
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
