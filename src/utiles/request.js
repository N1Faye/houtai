import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 8000
})
export default request

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = store.state.user.token
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
request.interceptors.response.use(function (response) {
  const { data, meta } = response.data
  // 对响应数据做点什么
  if (meta.status === 200 || meta.status === 201 || meta.status === 204) {
    return data
  } else {
    Message.error(meta.msg)
    return Promise.reject(new Error(meta.msg))
  }
}, function (error) {
  // 对响应错误做点什么
  Message.error(error.message)
  return Promise.reject(error)
})
