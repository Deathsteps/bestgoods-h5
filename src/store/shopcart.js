import cartStorage from './cartStorage'

export default {
  state: {
    productList: null,
    err: null,
    loading: false,
    isManageMode: false,
    productCheckStatus: [],
    allChecked: true,
    confirmDisplayed: false
  },
  getters: {
    manageBtnText: state => state.isManageMode ? '完成' : '编辑',
    barBtnText: state => state.isManageMode ? '删除所选' : '下单',
    barBtnDisabled:
      state =>
        state.productCheckStatus.every(checked => !checked),
    selectedCount:
      state =>
        state.productCheckStatus.reduce((acc, cur) => {
          return cur ? (acc + 1) : acc
        }, 0),
    totalPrice:
      state =>
        (state.productList || []).reduce((acc, p, i) => {
          if (state.productCheckStatus[i]) {
            acc += p.retailPrice * p.count
          }
          return acc
        }, 0)
  },
  actions: {
    syncShopcart ({ commit, state }) {
      commit('syncCartStart', { loading: true })

      function complete (err) {
        let productList = cartStorage.get() || []
        commit('syncCartEnd', {
          loading: false,
          productList: productList,
          productCheckStatus: productList.map(p => true),
          err // 出错时，取本地数据，再提示用户没有同步成功
        })
      }
      cartStorage.sync().then(complete, complete)
    }
  },
  mutations: {
    syncCartStart (state, payload) {
      Object.assign(state, payload)
    },
    syncCartEnd (state, payload) {
      Object.assign(state, payload)
    },
    manageCartProducts (state) {
      if (state.isManageMode) {
        state.isManageMode = false
        state.allChecked = true
        state.productCheckStatus = state.productCheckStatus.map(checked => true)
      } else {
        state.isManageMode = true
        state.allChecked = false
        state.productCheckStatus = state.productCheckStatus.map(checked => false)
      }
    },
    checkCartProduct (state, { checked, value }) {
      state.productCheckStatus = [
        ...state.productCheckStatus.slice(0, value),
        checked,
        ...state.productCheckStatus.slice(value + 1)
      ]
      state.allChecked =
        state.productCheckStatus.every(checked => checked)
    },
    checkAllCartProducts (state, { checked }) {
      state.allChecked = checked
      state.productCheckStatus =
        state.productCheckStatus.map(s => checked)
    },
    changeCartProductCount (state, { i, count }) {
      state.productList[i].count = count
      cartStorage.edit(i, count)
    },
    confirmRemove (state) {
      state.confirmDisplayed = true
    },
    removeCartProduct (state) {
      let indexes = []
      state.productCheckStatus.forEach(
        (checked, i) => checked && indexes.push(i))
      cartStorage.remove(indexes)
      let products = cartStorage.get() || []
      state.productList = products
      state.productCheckStatus = products.map(p => false)
      state.allChecked = false
      if (!products.length) {
        // 没数据了，关闭管理模式
        state.isManageMode = true
      }
    }
  }
}
