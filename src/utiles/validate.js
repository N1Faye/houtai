export function validMobile (mobile) {
  const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
  return reg.test(mobile)
}
