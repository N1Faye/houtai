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

/**
 *获取权限列表
 * @param {*} type 值 list 或 tree , list 列表显示权限, tree 树状显示权限,
 * @returns
 */
export const getPowerList = (type) => {
  return request({
    url: `rights/${type}`
  })
}
