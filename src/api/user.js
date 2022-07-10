import request from '@/utiles/request'

/**
 *登录
 * @param {*} param0
 * @returns
 */
export const logIn = ({ username, password }) => {
  return request({
    method: 'POST',
    url: 'login',
    data: {
      username, password
    }
  })
}
