import Vue from 'vue'
import Vuex from 'vuex'

import home from './home'
import list from './list'
import detail from './detail'
import sign from './sign'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    home,
    list,
    detail,
    sign
  }
})
