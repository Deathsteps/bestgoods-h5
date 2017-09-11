import Vue from 'vue'
import Vuex from 'vuex'

import app from './app'
import home from './home'
import list from './list'
import detail from './detail'
import sign from './sign'
import profile from './profile'
import address from './address'
import shopcart from './shopcart'
import order from './order'
import pay from './pay'
import orderDetail from './orderDetail'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    app,
    home,
    list,
    detail,
    sign,
    profile,
    address,
    shopcart,
    order,
    pay,
    orderDetail
  }
})
