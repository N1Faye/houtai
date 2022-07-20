import { getSortsList } from '@/api/goods'
const state = {
  sortsList: []
}
const mutations = {
  updateSortsList (state, payload) {
    state.sortsList = payload
  }
}
const actions = {
  async getSortsList (context, { type, pagenum, pagesize }) {
    const res = await getSortsList({ type, pagenum, pagesize })
    console.log(res)
    context.commit('updateSortsList', res)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
