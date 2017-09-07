import { get, set, remove } from './storage'

const isLogin = function () {
  return !!get('user')
}

const signOut = function () {
  remove('user')
}

const setUser = function (user) {
  set('user', user)
}

const getUser = function () {
  return get('user')
}

const getTempUser = function () {
  let temp = get('temp_user')
  if (temp) {
    return temp
  } else {
    temp = { phone: guid() }
    // Temporay user only exist for 3 days
    set('temp_user', temp, { timeout: 3 })
    return temp
  }
}

function guid () {
  function S4 () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}

export default { isLogin, signOut, getUser, setUser, getTempUser }
