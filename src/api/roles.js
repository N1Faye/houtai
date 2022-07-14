import request from '@/utiles/request'

/**
 *获取角色列表
 * @returns
 */
export const getRoles = () => {
  return request({
    url: 'roles'
  })
}
