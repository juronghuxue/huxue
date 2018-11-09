/**
 *@description 验证用户名格式 3-16个字母或数字
 * @param str
 */
export function isValidUsername (str) {
  const reg = /^[a-zA-Z0-9_]{3,16}$/
  return reg.test(str)
}

/**
 * @description 验证URL地址格式
 * @param str
 * @returns {boolean}
 */
export function isValidUrl (str) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(str)
}

/**
 * @description 判断是否全部小写
 * @param str
 * @returns {boolean}
 */
export function isLowerCase (str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @description 判断是否全部大写
 * @param str
 * @returns {boolean}
 */
export function isUpperCase (str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @description 判断是否全为字母
 * @param str
 * @returns {boolean}
 */
export function isAlphabets (str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @description 判断是否全为数字
 * @param str
 * @returns {boolean}
 */
export function isDigital (str) {
  const reg = /^[0-9]+$/
  return reg.test(str)
}

/**
 * @description 判断是否为电话号码
 * @param str
 * @returns {boolean}
 */
export function isPhoneNumber (str) {
  const reg = /^[1][3,4,5,6,7,8][0-9]{9}$/
  return reg.test(str)
}
/*
  判断是否是 固定电话
  @returns {boolean}
*/
export function isTelephoneNumber (str) {
  const reg = /^(0?(13[0-9]|15[012356789]|166|17[013678]|18[0-9]|14[57])[0-9]{8})|(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})(-| )?)?([0-9]{7,8})((-| |转)*([0-9]{1,4}))?$/
  return reg.test(str)
}
