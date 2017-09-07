export default {
  state: {
    loading: false,
    err: null,
    errAlertDisplayed: false
  },
  mutations: {
    appAlert (state, err) {
      state.err = err
      state.errAlertDisplayed = true
    },
    appLoading (state, loading) {
      state.loading = loading
    }
  }
}
