/**
 * 本地存储。
 * 隔离localStorage, 可以方便做IndexedDB localStorage sessionStorage的切换
 *
 * 像登入时的 Remember Me 功能就要用sessionStorage来做，但如何做到无缝切换是个问题
 */

// 存储结构，便于过期管理
// const STORAGE = {
//   timeout: 0,
//   value: null
// }

export function get (key) {
  let value = window.localStorage.getItem(key)
  if (value) {
    try {
      value = JSON.parse(value)
      if (Date.now() < value.timeout) {
        return value.value
      } else {
        window.localStorage.removeItem(key)
        return null
      }
    } catch (e) {
      return null
    }
  }
  return null
}

export function set (key, value, opts = { timeout: 7 }) {
  let today = new Date()
  // 默认一周过期
  let timeout = today.setDate(today.getDate() + opts.timeout)
  value = { timeout, value }
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function remove (key) {
  window.localStorage.removeItem(key)
}
