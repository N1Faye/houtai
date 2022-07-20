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
/**
 *获取左侧权限
 */
export const getMenus = () => {
  return request({
    url: 'menus'
  })
}

/**
 * 删除分类
 * @param {roleId} 角色 ID不能为空
 * @param {rightId} 权限id不能为空
 */
export const deleteAuth = ({ roleId, rightId }) => {
  return request({
    method: 'DELETE',
    url: `roles/${roleId}/rights/${rightId}`
  })
}

/**
 *角色授权
 * @param {id}分类 ID不能为空携带在url中
 * @param {attr_name}参数名称不能为空
 * @param {attr_sel}[only,many]不能为空
 * @param {attr_vals}如果是 many 就需要填写值的选项，以逗号分隔【可选参数】
 * @returns
 */
export const addAuth = ({ roleId, rids }) => {
  return request({
    method: 'POST',
    url: `roles/${roleId}d/rights`,
    data: {
      rids
    }

  })
}
