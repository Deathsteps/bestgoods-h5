import { getListProducts } from './api'
import { buildMutations4Action } from './helpers'

export default {
  state: {
    fetching: false,
    products: null,
    err: null
  },
  actions: {
    fetchListProducts ({ commit, state }, payload) {
      payload.pageSize = 15
      // refactor the code with a Promise for the server rendering
      return new Promise((resolve, reject) => {
        commit('LIST_PRODUCTS_REQUEST', { fetching: true })
        getListProducts(payload, (err, data) => {
          if (err) {
            commit('LIST_PRODUCTS_FAILURE', {
              fetching: true,
              err
            })
            reject(err)
          } else {
            commit('LIST_PRODUCTS_SUCCESS', {
              fetching: true,
              products: data,
              err: null
            })
            resolve()
          }
        })
      })
    }
  },
  mutations: {
    ...buildMutations4Action('LIST_PRODUCTS')
  }
}
