import axios from 'axios'
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 8000
})
export default request
