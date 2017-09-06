import { get, remove } from './storage'

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
    signOut (state) {
      remove('user')
      state.isLogin = false
    },
    initLoginStatus (state) {
      state.isLogin = !!get('user')
    }
  }
}
