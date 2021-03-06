import {
  getAddresses,
  requestAddressCreate,
  requestAddressEdit,
  requestAddressDelete
} from './api'
import { ChinaAddressV3Data } from 'vux'
import { buildMutations4Action } from './helpers'
import auth from './auth'

const PHONE_REG = /^1[34578]\d{9}$/
const ZIPCODE_REG = /^\d{6}$/

const DEFAULT_ADDRESS = {
  addressId: '',
  location: [],
  detail: '',
  receiver: '',
  contactPhone: '',
  zipcode: '',
  isDefault: false
}

export default {
  state: {
    userId: '',
    addressList: null,
    err: null,
    loading: false,
    addressData: ChinaAddressV3Data,
    ...DEFAULT_ADDRESS
  },
  getters: {
  },
  actions: {
    fetchAddresses ({ commit, state }) {
      commit('ADDRESSES_REQUEST', {
        userId: auth.getUser().phone,
        addressList: null,
        loading: true
      })
      getAddresses({ userId: state.userId }, (err, data) => {
        if (err) {
          commit('ADDRESSES_FAILURE', { loading: false, err })
        } else {
          commit('ADDRESSES_SUCCESS', {
            loading: false,
            addressList: data,
            err: null
          })
        }
      })
    },
    createAddress ({ commit, state }) {
      return new Promise(function (resolve, reject) {
        commit('verfyAddressInputs')
        if (state.err) {
          commit('appAlert', state.err)
          return reject()
        }
        commit('ADDRESS_CREATE_REQUEST')
        commit('appLoading', true)
        let params = {
          userId: state.userId,
          address: {
            userId: state.userId,
            location: state.location,
            detail: state.detail,
            receiver: state.receiver,
            contactPhone: state.contactPhone,
            zipcode: state.zipcode,
            isDefault: state.isDefault
          }
        }
        requestAddressCreate(params, (err, data) => {
          if (err) {
            commit('ADDRESS_CREATE_FAILURE', { err })
            commit('appLoading', false)
            commit('appAlert', err)
            reject()
          } else {
            commit('ADDRESS_CREATE_SUCCESS', { err: null })
            commit('appLoading', false)
            resolve()
          }
        })
      })
    },
    editAddress ({ commit, state }) {
      return new Promise(function (resolve, reject) {
        commit('verfyAddressInputs')
        if (state.err) {
          commit('appAlert', state.err)
          return reject()// 验证失败
        }
        commit('ADDRESS_EDIT_REQUEST')
        commit('appLoading', true)
        let params = {
          id: state.addressId,
          userId: state.userId,
          address: {
            userId: state.userId,
            location: state.location,
            detail: state.detail,
            receiver: state.receiver,
            contactPhone: state.contactPhone,
            zipcode: state.zipcode,
            isDefault: state.isDefault
          }
        }
        requestAddressEdit(params, (err, data) => {
          if (err) {
            commit('ADDRESS_EDIT_FAILURE', { err })
            commit('appLoading', false)
            commit('appAlert', err)
            reject()
          } else {
            commit('ADDRESS_EDIT_SUCCESS', { err: null })
            commit('appLoading', false)
            resolve()
          }
        })
      })
    },
    deleteAddress ({ commit, state }) {
      return new Promise(function (resolve, reject) {
        commit('ADDRESS_DELETE_REQUEST')
        commit('appLoading', true)
        requestAddressDelete(state.addressId, (err, data) => {
          if (err) {
            commit('ADDRESS_DELETE_FAILURE', { err })
            commit('appLoading', false)
            commit('appAlert', err)
            reject()
          } else {
            commit('ADDRESS_DELETE_SUCCESS', { err: null })
            commit('appLoading', false)
            resolve()
          }
        })
      })
    }
  },
  mutations: {
    startEditAddress (state, address) {
      state.addressId = address._id
      state.location = address.location
      state.detail = address.detail
      state.receiver = address.receiver
      state.contactPhone = address.contactPhone
      state.zipcode = address.zipcode
      state.isDefault = address.isDefault
    },
    startCreateAddress (state) {
      state.addressId = ''
      state.location = []
      state.detail = ''
      state.receiver = ''
      state.contactPhone = ''
      state.zipcode = ''
      state.isDefault = false
    },
    verfyAddressInputs (state) {
      state.detail = state.detail.trim()
      state.receiver = state.receiver.trim()
      state.contactPhone = state.contactPhone.trim()
      state.zipcode = state.zipcode.trim()

      state.err = null
      if (state.location.length !== 3) {
        state.err = new Error('请选择收货的省市区')
      } else if (state.detail.length < 1) {
        state.err = new Error('请填写详细地址')
      } else if (state.receiver.length < 1) {
        state.err = new Error('请填写收货人')
      } else if (!PHONE_REG.test(state.contactPhone)) {
        state.err = new Error('请填写正确的手机号码')
      } else if (!ZIPCODE_REG.test(state.zipcode)) {
        state.err = new Error('请填写正确的邮编')
      }
    },
    ...buildMutations4Action('ADDRESSES'),
    ...buildMutations4Action('ADDRESS_CREATE'),
    ...buildMutations4Action('ADDRESS_EDIT'),
    ...buildMutations4Action('ADDRESS_DELETE')
  }
}
