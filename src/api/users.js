import request from '@/utiles/request'

/**
 *获取用户列表
 * @param {pagenum 当前页码  pagesize 每页显示条数}
 * @returns
 */
export const getUsers = ({ pagenum, pagesize }) => {
  return request({
    url: 'users',
    params: {
      pagenum,
      pagesize
    }
  })
}
