/* eslint-disable camelcase */
import request from '@/utiles/request'

/**
 *获取商品列表
 * @param {pagenum 当前页码  pagesize 每页显示条数 query查询参数可以为空}
 * @returns
 */
export const getGoodsList = ({ query, pagenum, pagesize }) => {
  return request({
    url: 'goods',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}

/**
 *添加商品
 * @param {goods_name, goods_cat, goods_price, goods_number, goods_weight, goods_introduce(可空), pics(可空), attrs(可空)}
 * @returns
 */
export const addGoods = (data) => {
  return request({
    method: 'POST',
    url: 'goods',
    data
  })
}

/**
 *获取商品分类列表
 * @param {type}值：1，2，3 分别表示显示一层二层三层分类列表 如果不传递，则默认获取所有级别的分类
 * @param { pagenum 当前页码，可空  pagesize 每页显示条数，可空 }
 * @returns
 */
export const getSortsList = ({ type, pagenum, pagesize }) => {
  return request({
    url: 'categories',
    params: {
      type,
      pagenum,
      pagesize
    }
  })
}

/**
 *获取商品分类参数列表
 * @param {id}分类ID不能为空
 * @param {sel} only,many 不能为空,通过 only 或 many 来获取分类静态参数还是动态参数
 * @returns
 */
export const getParmasList = ({ id, sel }) => {
  return request({
    url: `categories/${id}/attributes`,
    params: {
      sel
    }
  })
}

/**
 *添加动态参数或者静态属性
 * @param {id}分类 ID不能为空携带在url中
 * @param {attr_name}参数名称不能为空
 * @param {attr_sel}[only,many]不能为空
 * @param {attr_vals}如果是 many 就需要填写值的选项，以逗号分隔【可选参数】
 * @returns
 */
export const addParmas = ({ id, attr_name, attr_sel, attr_vals }) => {
  return request({
    method: 'POST',
    url: `categories/${id}/attributes`,
    data: { attr_name, attr_sel, attr_vals }
  })
}

/**
 *编辑提交参数
 * @param {id}  分类ID 不能为空
 * @param {attrId} 属性id 不能为空
 * @param {attr_name} 新属性名称 不能为空
 * @param {attr_sel} 属性的类型[many 或 only] 不能为空
 * @returns
 */
export const editParams = ({ id, attrId, attr_name, attr_sel, attr_vals }) => {
  return request({
    method: 'PUT',
    url: `categories/${id}/attributes/${attrId}`,
    data: {
      attr_name,
      attr_sel,
      attr_vals
    }
  })
}

/**
 * 删除参数
 * @param {id}  分类ID 不能为空
 * @param {attrId} 属性id 不能为空
 */
export const deleteParams = (id, attrid) => {
  return request({
    method: 'DELETE',
    url: `categories/${id}/attributes/${attrid}`
  })
}

/**
 *添加分类
 * @param {cat_pid}不能为空，如果要添加 1 级分类，则父分类 Id 应该设置为 0
 * @param {cat_name}参数名称不能为空
 * @param {cat_level}不能为空，0表示一级分类；1表示二级分类；2表示三级分类
 * @returns
 */
export const addCats = ({ cat_pid, cat_name, cat_level }) => {
  return request({
    method: 'POST',
    url: 'categories',
    data: { cat_pid, cat_name, cat_level }
  })
}

/**
 * 删除分类
 * @param {id}  分类ID 不能为空
 * @param {attrId} 属性id 不能为空
 */
export const deleteCat = (id) => {
  return request({
    method: 'DELETE',
    url: `categories/${id}`
  })
}
