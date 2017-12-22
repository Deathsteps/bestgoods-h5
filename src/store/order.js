import { buildMutations4Action, add, mul } from './helpers'
import { getUserDefaultAddress, getDeliveryFee, requestOrderCreate } from './api'
import auth from './auth'

export default {
  state: {
    err: null,
    address: null,
    products: null,
    deliveryFee: 0,
    receiptGiven: false,
    receipt: {
      type: '电子发票',
      content: '明细',
      titleType: '个人',
      title: ''
    }
  },
  getters: {
    productsPrice:
      state =>
        (state.products || []).reduce((acc, p) => {
          acc = add(acc, mul(p.retailPrice, p.count))
          return acc
        }, 0),
    payAmount: (state, getters) => add(getters.productsPrice, state.deliveryFee)
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
    },
    createOrder ({ commit, state, getters }) {
      return new Promise(function (resolve, reject) {
        commit('ORDER_CREATE_REQUEST')
        commit('appLoading', true)
        let order = {
          userId: auth.getUser().phone,
          address: state.address,
          products: state.products,
          deliveryFee: state.deliveryFee,
          receiptGiven: state.receiptGiven,
          productsPrice: getters.productsPrice,
          payAmount: getters.payAmount
          // TODO: couponPrice
        }
        if (state.receiptGiven) {
          order.receipt = state.receipt
        }
        requestOrderCreate(order, (err, data) => {
          if (err) {
            commit('appLoading', false)
            commit('appAlert', err)
            reject()
          } else {
            commit('appLoading', false)
            resolve(data)
          }
        })
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
    ...buildMutations4Action('DELIVERY_FEE'),
    ...buildMutations4Action('ORDER_CREATE')
  }
}
