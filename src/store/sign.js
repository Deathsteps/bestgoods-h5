import { requestUserRegister, userLogin, sendVerfyCode } from './api'
import { buildMutations4Action } from './helpers'
import auth from './auth'

const PHONE_REG = /^1[34578]\d{9}$/
const PASSWORD_REG = /(?=.*\d)(?=.*[a-zA-Z]).{8,30}/
const VERFYCODE_REG = /^\d{5}$/

export default {
  state: {
    signUpDisplayed: false,
    registering: false,
    logining: false,
    registered: false, // 完成标志，用来做跳转
    logined: false,
    user: null,
    err: null,
    codeSended: false,
    codeReSendCounter: 0,
    phone: '',
    password: '',
    verfycode: ''
  },
  getters: {
    signSwitchText: state => state.signUpDisplayed ? '用户登入' : '账号注册',
    codeText: state => state.codeReSendCounter > 0
      ? `等待${state.codeReSendCounter}秒` : state.codeSended ? '重新发送' : '发送验证码',
    signButton: state => state.signUpDisplayed ? '注册' : '登入'
  },
  actions: {
    registerUser ({ commit, state }) {
      commit('verfySignInputs')
      if (state.err) {
        commit('appAlert', state.err)
        return // 验证失败
      }
      let params = {
        phone: state.phone,
        password: state.password,
        verfycode: state.verfycode
      }
      commit('USER_REGIST_REQUEST', { registering: true })
      requestUserRegister(params, (err, data) => {
        if (err) {
          commit('USER_REGIST_FAILURE', { err, registering: false })
          commit('appAlert', err)
        } else {
          // 用户信息保存在storage里
          auth.setUser({ phone: state.phone })
          commit('USER_REGIST_SUCCESS', {
            err: null,
            registering: false,
            registered: true
          })
        }
      })
    },
    login ({ commit, state }) {
      commit('verfySignInputs')
      if (state.err) {
        commit('appAlert', state.err)
        return // 验证失败
      }
      let params = {
        phone: state.phone,
        password: state.password
      }
      commit('USER_LOGIN_REQUEST', { logining: true })
      userLogin(params, (err, data) => {
        if (err) {
          commit('USER_LOGIN_FAILURE', { err, logining: false })
          commit('appAlert', err)
        } else {
          // 用户信息保存在storage里
          auth.setUser({ phone: state.phone })
          commit('USER_LOGIN_SUCCESS', {
            err: null,
            logining: false,
            logined: true
          })
        }
      })
    },
    sendCode ({ commit, state }) {
      if (state.codeReSendCounter > 0) {
        return
      }
      sendVerfyCode()
      let counter = 60
      commit('updateResendCounter', counter--)
      let timer =
        setInterval(function () {
          if (counter <= 0) {
            clearInterval(timer)
          }
          commit('updateResendCounter', counter--)
        }, 1000)
    }
  },
  mutations: {
    switchSignView (state, signUpDisplayed) {
      if (typeof signUpDisplayed === 'boolean') {
        state.signUpDisplayed = signUpDisplayed
      } else {
        state.signUpDisplayed = !state.signUpDisplayed
      }
    },
    updateResendCounter (state, counter) {
      state.codeSended = true
      state.codeReSendCounter = counter
    },
    verfySignInputs (state) {
      state.phone = state.phone.trim()
      state.password = state.password.trim()
      state.verfycode = state.verfycode.trim()

      state.err = null
      if (state.signUpDisplayed && !VERFYCODE_REG.test(state.verfycode)) {
        state.err = new Error('请填写5位验证码')
      } else if (!PHONE_REG.test(state.phone)) {
        state.err = new Error('请填写正确的手机号码')
      } else if (!PASSWORD_REG.test(state.password)) {
        state.err = new Error('请填写密码，密码至少包含一位数字和字母，长度不少8位。')
      }
    },
    ...buildMutations4Action('USER_REGIST'),
    ...buildMutations4Action('USER_LOGIN')
  }
}
