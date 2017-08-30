import { getProduct } from './api'
import { buildMutations4Action } from './helpers'

const picUrl = value => value.indexOf('http') > -1 ? value : ('/static/' + value)

export default {
  state: {
    product: null,
    err: null,
    productId: 0
  },
  getters: {
    pics: state => {
      if (state.product) {
        let ret = []
        for (var i = 1; i < 5; i++) {
          ret.push({
            // url: 'javascript:',
            img: picUrl(state.product.itemDetail['picUrl' + i])
          })
        }
        return ret
      } else {
        return null
      }
    }
  },
  actions: {
    fetchProduct ({ commit, state }, productId) {
      commit('PRODUCT_REQUEST', { productId })
      getProduct(productId, (err, data) => {
        if (err) {
          commit('PRODUCT_FAILUE', { err })
        } else {
          commit('PRODUCT_SUCCESS', {
            product: data[0],
            err: null
          })
        }
      })
    }
  },
  mutations: {
    ...buildMutations4Action('PRODUCT')
  }
}
