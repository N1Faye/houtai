// 手机号验证
export function validMobile (mobile) {
  const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
  return reg.test(mobile)
}
// 值不能为空
export function validQuantity (quantity) {
  const reg = /^\+?[1-9]\d*$/
  return reg.test(quantity)
}
// 金额/重量 只能支持正数
export function validNum (num) {
  const reg = /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/
  return reg.test(num)
}
