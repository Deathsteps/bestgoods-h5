import { getProduct } from './api'
import { buildMutations4Action } from './helpers'
import cartStorage from './cartStorage'

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
      commit('PRODUCT_REQUEST', {
        // 由于fetchProduct会在页开始的时候调用
        // 这里顺便初始化shopcartCount
        shopcartCount: cartStorage.get() ? cartStorage.get().length : 0,
        productId
      })
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
    }
  },
  mutations: {
    showSkuPanel (state, displayed) {
      state.skuPanelDisplayed = displayed
    },
    add2Shopcart (state, productSku) {
      let product = {
        ...productSku,
        id: state.product.id,
        name: state.product.name
      }
      cartStorage.add(product)
      state.shopcartCount = cartStorage.get().length
      state.skuPanelDisplayed = false
    },
    ...buildMutations4Action('PRODUCT'),
    ...buildMutations4Action('SHOPCART_ADD')
  }
}
