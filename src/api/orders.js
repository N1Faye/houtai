import request from '@/utiles/request'

/**
 *获取订单列表
 * @param {pagenum 当前页码  pagesize 每页显示条数 query查询参数可以为空}
 * @returns
 */
export const getOrders = ({ query, pagenum, pagesize }) => {
  return request({
    url: 'orders',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}

/**
 *添加用户
 * @param {username,password 不能为空 email,mobile 可以为空}
 * @returns
 */
export const addUser = ({ username, password, email, mobile }) => {
  return request({
    method: 'POST',
    url: 'users',
    data: { username, password, email, mobile }
  })
}

/**
 *修改用户状态
 * @param {*} uId 用户 ID 不能为空
 * @param {*} type 用户状态 不能为空
 * @returns
 */
export const changeUserStatus = (uId, type) => {
  return request({
    method: 'PUT',
    url: `users/${uId}/state/${type}`
  })
}

/**
 *编辑用户资料
 * @param {*} id 不能为空
 * @param {*}
 * @returns
 */
export const editUser = ({ id, email, mobile }) => {
  return request({
    method: 'PUT',
    url: `users/${id}`,
    data: {
      email, mobile
    }
  })
}

/**
 * 删除单个用户
 * id:用户id不能为空
 */
export const deleteUser = (id) => {
  return request({
    method: 'DELETE',
    url: `users/${id}`
  })
}

/**
 *修改用户角色
 * @param {*} id 用户id 不能为空
 * @param {*} rid 角色id 不能为空
 * @returns
 */
export const setUserRole = (id, rid) => {
  return request({
    method: 'PUT',
    url: `users/${id}/role`,
    data: {
      rid
    }
  })
}

/**
 *根据id获取用户信息
 * @param
 * @returns
 */
export const getUserById = (id) => {
  return request({
    url: `users/${id}`
  })
}
