import { getUsers } from '@/api/users'
const state = {}
const mutations = {}
const actions = {
  async getUsers (context, obj) {
    const res = await getUsers(obj)
    console.log(res)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
