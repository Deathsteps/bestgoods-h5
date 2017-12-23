import { buildMutations4Action } from './helpers'

export default {
  state: {
    products: null,
    orderId: -1, // for modify the order status after create comments
    succeeded: false
  },
  actions: {
    createComments ({ commit }) {
      // commit('COMMENT_CREATE_REQUEST')
      commit('COMMENT_CREATE_SUCCESS', { succeeded: true })
      // commit('COMMENT_CREATE_FAILURE')
    }
  },
  mutations: {
    setCommentProducts (state, order) {
      // Deep copy the data for modification
      // This action isnot needed when the data is from localStorage
      // TODO: save products in localStorage
      // to keep page avaliable
      let products = JSON.parse(JSON.stringify(order.products))
      state.products = products.map(p => ({ ...p, rate: 5, commentContent: '' }))
      state.orderId = order._id
      state.succeeded = false
    },
    ...buildMutations4Action('COMMENT_CREATE')
  }
}
