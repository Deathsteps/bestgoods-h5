import { buildMutations4Action } from './helpers'
import { getOrderList, requestOrderProductsReceive } from './api'
import auth from './auth'

export default {
  state: {
    fetching: false,
    orders: null,
    err: null,
    currenctFilterStatus: -1,

    receiveConfirmDisplayed: false,
    receiving: false,
    receiveSuccessDisplayed: false,
    receiveOrderId: -1
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
      // orderStatus -1状态只显示用，请求时不传
      dispatch('fetchOrders', orderStatus === -1 ? undefined : orderStatus)
    },
    receiveProducts ({ dispatch, commit, state }) {
      commit('ORDER_PRODUCT_RECEIVE_REQUEST', { receiving: true })
      requestOrderProductsReceive(state.receiveOrderId, (err, data) => {
        if (err) {
          commit('ORDER_PRODUCT_RECEIVE_FAILURE', { receiving: false, err })
        } else {
          // 收货成功后刷新订单数据
          dispatch('filterOrders', state.currenctFilterStatus)
          // Fetching的时候通知用户
          commit('ORDER_PRODUCT_RECEIVE_SUCCESS', {
            receiving: false,
            receiveSuccessDisplayed: true
          })
        }
      })
    }
  },
  mutations: {
    setCurrentFilterStatus (state, newStatusCode) {
      state.currenctFilterStatus = newStatusCode
    },
    confirmReceive (state, orderId) {
      state.receiveOrderId = orderId
      state.receiveConfirmDisplayed = true
    },
    closeReceiveConfirm (state) {
      state.receiveOrderId = -1
      state.receiveConfirmDisplayed = false
    },
    ...buildMutations4Action('ORDER_LIST'),
    ...buildMutations4Action('ORDER_PRODUCT_RECEIVE')
  }
}
