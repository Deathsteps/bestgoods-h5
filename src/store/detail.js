import { getProduct, requestShopcartAdd } from './api'
import { buildMutations4Action } from './helpers'
import auth from './auth'

const picUrl = value => value.indexOf('http') > -1 ? value : ('/static/' + value)

export default {
  state: {
    product: null,
    err: null,
    productId: 0,
    skuPanelDisplayed: false,
    shopcartCount: 0
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
            product: Object.freeze(data[0]),
            err: null
          })
        }
      })
    },
    add2Shopcart ({ commit, state }, productSku) {
      let params = {
        userId: auth.isLogin() ? auth.getUser().phone : auth.getTempUser().phone,
        product: {
          ...productSku,
          productId: state.product.id,
          productName: state.product.name
        }
      }
      commit('SHOPCART_ADD_REQUEST', { modalLoading: true })
      requestShopcartAdd(params, (err, data) => {
        if (err) {
          // 回头统一处理
          commit('SHOPCART_ADD_FAILURE', { modalLoading: false })
        } else {
          commit('SHOPCART_ADD_SUCCESS', {
            modalLoading: false,
            shopcartCount: state.shopcartCount + 1
          })
        }
      })
    }
  },
  mutations: {
    showSkuPanel (state, displayed) {
      state.skuPanelDisplayed = displayed
    },
    ...buildMutations4Action('PRODUCT'),
    ...buildMutations4Action('SHOPCART_ADD')
  }
}
