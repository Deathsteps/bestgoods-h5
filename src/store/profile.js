import { get } from './storage'

export default {
  state: {
    isLogin: !!get('user')
  },
  getters: {
    profileButton: state => state.isLogin ? '退出' : '登入'
  },
  actions: {

  },
  mutations: {

  }
}
