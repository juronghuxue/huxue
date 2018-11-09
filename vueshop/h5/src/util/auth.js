/**
 * @author FengXing
 * token操作工具函数
 */
// import Cookies from 'js-cookie'

/**
 * Token存储key值
 * @const
 * @type {string}
 * @default
 */
const TokenKey = 'Access-Token'
const Key = 'aa-'
const UserPdt = "UserPdt"
const Type='Type'

/**
 * 获取token
 * @returns {string} - 返回的token值
 */
export function getToken () {
  // return Cookies.get(TokenKey)
  return localStorage.getItem(TokenKey)
}

/**
 * 设置token
 * @param {string} token - 要设置的token值
 */
export function setToken (token) {
  // return Cookies.set(TokenKey, token)
  return localStorage.setItem(TokenKey, token)
}

/**
 * 删除保存的token值
 */
export function removeToken () {
  // return Cookies.remove(TokenKey)
  localStorage.removeItem(TokenKey)
}

/**
 * 設置的userinfo值
 */
export function setUserPdt (obj) {
  return localStorage.setItem(UserPdt, JSON.stringify(obj))
}

/**
 * 設置的userinfo值
 */
export function getUserPdt () {
  return JSON.parse(localStorage.getItem(UserPdt))
}

/**
 * 删除保存的token值
 */
export function removeUserPdt () {
  localStorage.removeItem(UserPdt)
}

export function setType (obj) {
  return localStorage.setItem(Type, JSON.stringify(obj))
}

/**
 * 設置的userinfo值
 */
export function getType () {
  return JSON.parse(localStorage.getItem(Type))
}

/**
 * 删除保存的token值
 */
export function removeType () {
  localStorage.removeItem(Type)
}

