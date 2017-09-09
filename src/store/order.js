import { buildMutations4Action } from './helpers'
import { getUserDefaultAddress, getDeliveryFee } from './api'
import auth from './auth'

export default {
  state: {
    err: null,
    address: null,
    products: null,
    receiptGiven: false,
    deliveryFee: 0
  },
  getters: {
    totalPrice:
      state =>
        (state.products || []).reduce((acc, p) => {
          acc += p.retailPrice * p.count
          return acc
        }, 0),
    payAmount: (state, getters) => getters.totalPrice - state.deliveryFee
  },
  actions: {
    fetchUserDefaultAddress ({ commit, state }) {
      return new Promise(function (resolve, reject) {
        commit('USER_DEFAULT_ADDRESS_REQUEST')
        getUserDefaultAddress(auth.getUser().phone, (err, data) => {
          if (err) {
            commit('USER_DEFAULT_ADDRESS_FAILURE', { err })
            reject(err)
          } else {
            commit('USER_DEFAULT_ADDRESS_SUCCESS', { err: null, address: data })
            resolve(data)
          }
        })
      })
    },
    fetchDeliveryFee ({ commit, state }) {
      getDeliveryFee({}, (err, data) => {
        err && console.log(err)
        commit('DELIVERY_FEE_SUCCESS', { deliveryFee: data })
      })
    }
  },
  mutations: {
    prepareOrder (state, products) {
      state.products = products
    },
    pickAddress4Order (state, address) {
      state.address = address
    },
    ...buildMutations4Action('USER_DEFAULT_ADDRESS'),
    ...buildMutations4Action('DELIVERY_FEE')
  }
}
