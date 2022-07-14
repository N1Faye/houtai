import { logIn } from '@/api/user'
import { Message } from 'element-ui'
import router from '@/router/index'
import { setToken, getToken } from '@/utiles/auth'

const state = {
  token: getToken() || ''
}
const mutations = {
  updateToken (state, payload) {
    state.token = payload
    setToken(payload)
  }
}
const actions = {
  async logIn (context, { username, password }) {
    // try {
    const res = await logIn({ username, password })
    context.commit('updateToken', res.token)
    Message.success('登录成功')
    router.push('/home')
    // if (res.data.meta.status === 200) {
    //   context.commit('updateToken', res.data.data.token)
    //   Message.success('登录成功')
    //   router.push('/home')
    // } else {
    //   Message.error('登录失败，请检查用户名或密码')
    // }
    // } catch (error) {
    //   console.log(error)
    // }
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
