import { get, set, remove } from './storage'

function isLogin () {
  return !!get('user')
}

function signOut () {
  remove('user')
}

function getUser () {
  return get('user')
}

function getTempUser () {
  let temp = get('temp_user')
  if (temp) {
    return temp
  } else {
    temp = { phone: '' }
    // Temporay user only exist for 3 days
    set('temp_user', temp, { timeout: 3 })
    return temp
  }
}

export default { isLogin, signOut, getUser, getTempUser }
