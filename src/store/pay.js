export default {
  state: {
    isAliChecked: true,
    isWeixinChecked: false
  },
  actions: {

  },
  mutations: {
    selectPayTool (state, which) {
      if (which === 'alipay') {
        state.isAliChecked = true
        state.isWeixinChecked = false
      } else {
        state.isAliChecked = false
        state.isWeixinChecked = true
      }
    }
  }
}
