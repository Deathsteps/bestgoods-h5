import { buildMutations4Action } from './helpers'
import { getOrderList } from './api'
import auth from './auth'

export default {
  state: {
    fetching: false,
    orders: null,
    err: null,
    currenctFilterStatus: -1
  },
  actions: {
    fetchOrders ({ commit }, orderStatus) {
      commit('ORDER_LIST_REQUEST', { fetching: true })
      getOrderList({
        userId: auth.getUser().phone,
        statusCode: orderStatus
      },
      (err, data) => {
        if (err) {
          commit('ORDER_LIST_FAILURE', { fetching: false, err })
        } else {
          commit('ORDER_LIST_SUCCESS', { fetching: false, orders: Object.freeze(data) })
        }
      })
    },
    filterOrders ({ dispatch, commit }, orderStatus) {
      commit('setCurrentFilterStatus', orderStatus)
      dispatch('fetchOrders', orderStatus)
    }
  },
  mutations: {
    setCurrentFilterStatus (state, newStatusCode) {
      state.currenctFilterStatus = newStatusCode
    },
    ...buildMutations4Action('ORDER_LIST')
  }
}
