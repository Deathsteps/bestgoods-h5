import { getListProducts, getSubCategories } from './api'
import { buildMutations4Action } from './helpers'

const DEFAULT_FILTER = {
  categoryId: 0,
  sortKey: '',
  sortValue: 0,
  pageIndex: 1
}
const PAGE_SIZE = 15

export default {
  state: {
    fetching: false,
    products: null,
    err: null,
    filterDrawerDisplayed: false,

    topCategoryId: 0,
    categories: {},

    filter: DEFAULT_FILTER,

    loadMoreDisplayed: false,
    noMoreProducts: false
  },
  getters: {
    currentSubCategories: state =>
      state.categories[state.topCategoryId]
  },
  actions: {
    fetchSubCategories ({ commit, state }) {
      commit('SUB_CATEGORIES_REQUEST')
      getSubCategories(state.topCategoryId, (err, data) => {
        if (err) {
          commit('SUB_CATEGORIES_FAILURE', { err })
        } else {
          // 构造新的categories
          let newCategories = {
            [state.topCategoryId]: Object.freeze(data),
            ...state.categories
          }
          commit('SUB_CATEGORIES_SUCCESS', {
            categories: newCategories,
            err: null
          })
        }
      })
    },
    fetchListProducts ({ commit, state }, payload) {
      payload.pageSize = PAGE_SIZE
      commit('LIST_PRODUCTS_REQUEST', { fetching: true })
      getListProducts(payload, (err, data) => {
        if (err) {
          commit('LIST_PRODUCTS_FAILURE', {
            fetching: false,
            err
          })
        } else {
          commit('LIST_PRODUCTS_SUCCESS', {
            fetching: false,
            products: Object.freeze(data), // 不会更新的数据freeze提高性能
            noMoreProducts: false,
            err: null
          })
        }
      })
    },
    showFilter ({ dispatch, commit, state }) {
      commit('showFilterDrawer', true)
      if (!state.categories[state.topCategoryId]) {
        dispatch('fetchSubCategories')
      }
    },
    // the following actions will invoke fetchListProducts action
    // 靠前的操作会重置后面操作对filter的影响
    gotoList ({ dispatch, commit }, categoryId) {
      commit('setTopCategory', categoryId)
      commit('setFilter', DEFAULT_FILTER)
      dispatch('fetchListProducts', { pageIndex: 1, categoryId })
    },
    filterList ({ dispatch, commit }, categoryId) {
      commit('showFilterDrawer', false)
      commit('setFilter', { ...DEFAULT_FILTER, categoryId })
      dispatch('fetchListProducts', { pageIndex: 1, categoryId })
    },
    sortList ({ dispatch, commit, state }, sortQuery) {
      commit('setFilter', { ...sortQuery, pageIndex: 1 })
      let query = {
        pageIndex: 1,
        categoryId: state.filter.categoryId || state.topCategoryId
      }
      if (sortQuery.sortKey) {
        Object.assign(query, sortQuery)
      }
      dispatch('fetchListProducts', query)
    },
    loadMoreProducts ({ commit, state }) {
      let params = {
        ...state.filter,
        pageIndex: state.filter.pageIndex + 1,
        pageSize: PAGE_SIZE
      }
      if (!params.sortKey) {
        delete params.sortKey
        delete params.sortValue
      }
      if (!params.categoryId) {
        params.categoryId = state.topCategoryId
      }

      commit('setFilter', { pageIndex: params.pageIndex })
      commit('LOAD_MORE_REQUEST', {
        loadMoreDisplayed: true
      })

      getListProducts(params, (err, data) => {
        if (err) {
          commit('LOAD_MORE_FAILURE', {
            loadMoreDisplayed: false,
            err
          })
        } else {
          if (!data.length) {
            commit('LOAD_MORE_SUCCESS', {
              loadMoreDisplayed: false,
              noMoreProducts: true,
              err: null
            })
          } else {
            commit('LOAD_MORE_SUCCESS', {
              loadMoreDisplayed: false,
              products: Object.freeze(state.products.concat(data)),
              err: null
            })
          }
        }
      })
    }
  },
  mutations: {
    showFilterDrawer (state, displayed) {
      state.filterDrawerDisplayed = displayed
    },
    setFilter (state, filter) {
      state.filter = { ...state.filter, ...filter }
    },
    setTopCategory (state, categoryId) {
      state.topCategoryId = categoryId
    },
    ...buildMutations4Action('LIST_PRODUCTS'),
    ...buildMutations4Action('SUB_CATEGORIES'),
    ...buildMutations4Action('LOAD_MORE')
  }
}
