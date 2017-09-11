import { requestOrderPay } from './api'
import { buildMutations4Action } from './helpers'

export default {
  state: {
    isAliChecked: true,
    isWeixinChecked: false,
    succeeded: false
  },
  actions: {
    payOrder ({ commit, state }, orderId) {
      commit('ORDER_PAY_REQUEST')
      commit('appLoading', true)
      requestOrderPay(orderId, (err) => {
        commit('appLoading', false)
        if (err) {
          commit('ORDER_PAY_FAILURE', { succeeded: false, err })
          commit('appAlert', err)
          commit('appLoading', false)
        } else {
          commit('ORDER_PAY_FAILURE', { succeeded: true })
          commit('appLoading', false)
        }
      })
    }
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
    },
    ...buildMutations4Action('ORDER_PAY')
  }
}
