import { buildMutations4Action } from './helpers'
import { getOrder } from './api'

export default {
  state: {
    order: null,
    err: null,
    orderId: ''
  },
  actions: {
    fetchOrder ({ commit, state }, orderId) {
      commit('ORDER_REQUEST', { orderId })
      getOrder(orderId, (err, data) => {
        if (err) {
          commit('ORDER_FAILURE', { err })
        } else {
          commit('ORDER_SUCCESS', { order: Object.freeze(data) })
        }
      })
    }
  },
  mutations: {
    ...buildMutations4Action('ORDER')
  }
}
