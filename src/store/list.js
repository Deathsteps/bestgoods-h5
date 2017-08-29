import { getListProducts, getSubCategories } from './api'
import { buildMutations4Action } from './helpers'

export default {
  state: {
    fetching: false,
    products: null,
    err: null,
    filterDrawerDisplayed: false,

    topCategoryId: 0,
    categories: {},

    filter: {}
  },
  getters: {
    currentSubCategories: state =>
      state.categories[state.topCategoryId]
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
              fetching: false,
              err
            })
            reject(err)
          } else {
            commit('LIST_PRODUCTS_SUCCESS', {
              fetching: false,
              products: Object.freeze(data), // 不会更新的数据freeze提高性能
              err: null
            })
            resolve()
          }
        })
      })
    },
    fetchSubCategories ({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SUB_CATEGORIES_REQUEST')
        getSubCategories(state.topCategoryId, (err, data) => {
          if (err) {
            commit('SUB_CATEGORIES_FAILURE', { err })
            reject(err)
          } else {
            // 构造新的categories
            let newCategories = Object.assign({
              [state.topCategoryId]: Object.freeze(data),
              ...state.categories
            })
            commit('SUB_CATEGORIES_SUCCESS', {
              categories: newCategories,
              err: null
            })
            resolve()
          }
        })
      })
    },
    showFilter ({ dispatch, commit, state }) {
      commit('showFilterDrawer', true)
      console.log(state.currentSubCategories)
      if (!state.currentSubCategories) {
        dispatch('fetchSubCategories')
      }
    },
    gotoList ({ dispatch, commit }, categoryId) {
      commit('setTopCategory', categoryId)
      dispatch('fetchListProducts', { pageIndex: 1, categoryId })
    },
    filterList ({ dispatch, commit }, categoryId) {
      commit('showFilterDrawer', false)
      commit('setFilter', { categoryId })
      dispatch('fetchListProducts', { pageIndex: 1, categoryId })
    },
    sortList ({ dispatch, commit, state }, sortQuery) {
      commit('setFilter', sortQuery)
      let query = {
        pageIndex: 1,
        categoryId: state.filter.categoryId || state.topCategoryId
      }
      if (sortQuery.sortKey) {
        Object.assign(query, sortQuery)
      }
      dispatch('fetchListProducts', query)
    }
  },
  mutations: {
    showFilterDrawer (state, displayed) {
      state.filterDrawerDisplayed = displayed
    },
    setFilter (state, filter) {
      state.filter = Object.assign({}, state.filter, filter)
    },
    setTopCategory (state, categoryId) {
      state.topCategoryId = categoryId
    },
    ...buildMutations4Action('LIST_PRODUCTS'),
    ...buildMutations4Action('SUB_CATEGORIES')
  }
}
