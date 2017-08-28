import { getTopCategories, getHotSale } from './api'
import { buildMutations4Action } from './helpers'

export default {
  state: {
    categories: null,
    hots: null,
    err: null,
    ads: [{
      url: 'javascript:',
      img: '/static/imgs/6e412cf16f64c54d76ce617f9f4f8f10.jpg'
    }, {
      url: 'javascript:',
      img: '/static/imgs/f1680a724b280c5abf9b2c89229d82c7.jpg'
    }, {
      url: 'javascript:',
      img: '/static/imgs/80b2663468434183b2e2a686327a4cf4.jpg'
    }, {
      url: 'javascript:',
      img: '/static/imgs/382e26b92c149b49363ad16a8ee4f97e.jpg'
    }]
  },
  actions: {
    fetchCategories ({ commit, state }) {
      // refactor the code with a Promise for the server rendering
      return new Promise((resolve, reject) => {
        commit('TOP_CATEGORIES_REQUEST', { categories: null })
        getTopCategories((err, data) => {
          if (err) {
            commit('TOP_CATEGORIES_FAILURE', { err })
            reject(err)
          } else {
            commit('TOP_CATEGORIES_SUCCESS', {
              categories: data,
              err: null
            })
            resolve()
          }
        })
      })
    },
    fetchHots ({ commit, state }) {
      // refactor the code with a Promise for the server rendering
      return new Promise((resolve, reject) => {
        commit('HOT_SALE_REQUEST', { hots: null })
        getHotSale((err, data) => {
          if (err) {
            commit('HOT_SALE_FAILURE', { err })
            reject(err)
          } else {
            commit('HOT_SALE_SUCCESS', {
              hots: data,
              err: null
            })
            resolve()
          }
        })
      })
    }
  },
  mutations: {
    ...buildMutations4Action('TOP_CATEGORIES'),
    ...buildMutations4Action('HOT_SALE')
  }
}
