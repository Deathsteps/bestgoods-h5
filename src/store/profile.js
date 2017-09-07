import auth from './auth'

export default {
  state: {
    isLogin: auth.isLogin()
  },
  getters: {
    profileButton: state => state.isLogin ? '退出' : '登入'
  },
  actions: {

  },
  mutations: {
    signOut (state) {
      auth.signOut()
      state.isLogin = false
    },
    initLoginStatus (state) {
      state.isLogin = auth.isLogin()
    }
  }
}
