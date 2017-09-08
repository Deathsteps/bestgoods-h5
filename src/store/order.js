import { buildMutations4Action } from './helpers'
import { getUserDefaultAddress } from './api'
import auth from './auth'

export default {
  state: {
    loading: false,
    err: null,
    address: null
  },
  actions: {
    fetchUserDefaultAddress ({ commit, state }) {
      return new Promise(function (resolve, reject) {
        commit('USER_DEFAULT_ADDRESS_REQUEST')
        getUserDefaultAddress(auth.getUser().phone, (err, data) => {
          if (err) {
            commit('USER_DEFAULT_ADDRESS_FAILURE', { err })
            reject(err)
          } else {
            commit('USER_DEFAULT_ADDRESS_FAILURE', { err: null, address: data })
            resolve(data)
          }
        })
      })
    }
  },
  mutations: {
    ...buildMutations4Action('USER_DEFAULT_ADDRESS')
  }
}
