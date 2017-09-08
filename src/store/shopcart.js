import cartStorage from './cartStorage'

export default {
  state: {
    productList: null,
    err: null,
    loading: false
  },
  getters: {
  },
  actions: {
    syncShopcart ({ commit, state }) {
      commit('syncCartStart', { loading: true })
      cartStorage.sync().then(
        () => commit('syncCartStart', { loading: false, productList: cartStorage.get() }),
        // 出错时，取本地数据，再提示用户没有同步成功
        err => commit('syncCartStart', { loading: false, productList: cartStorage.get(), err })
      )
    }
  },
  mutations: {
    syncCartStart (state, payload) {
      Object.assign(state, payload)
    },
    syncCartEnd (state, payload) {
      Object.assign(state, payload)
    }
  }
}
