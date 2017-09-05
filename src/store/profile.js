import { get } from './storage'

export default {
  state: {
    isLogin: !!get('user')
  },
  getters: {
    profileButton: state => state.isLogin ? '登入' : '退出'
  },
  actions: {

  },
  mutations: {

  }
}
