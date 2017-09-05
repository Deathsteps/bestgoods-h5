<template lang="html">
  <div class="sign-view">
    <h1 class="logo">Best Goods</h1>
    <div class="main">
      <input type="text" placeholder="手机号" v-model="phone">
      <input type="password" placeholder="密码" v-model="password">
      <div class="code" v-show="signUpDisplayed">
        <input type="text" placeholder="验证码" v-model="verfycode">
        <a href="javascript:;" @click="sendCode">{{codeText}}</a>
      </div>
      <div style="width: 100%;">
        <x-button class="btn-sign"
          @click.native="signUpDisplayed ? registerUser() : login()">
          {{signButton}}
        </x-button>
        <span class="switch" @click="switchSignView">{{signSwitchText}}</span>
        <span class="forget">忘记密码</span>
      </div>
      <alert v-model="errAlertDisplayed" title="提示">
        {{ err ? err.message : '' }}
      </alert>
    </div>
    <div class="third-parties">
      <i class="iconfont icon-yingdaicon04" style="color: #259b24"></i>
      <i class="iconfont icon-weibo" style="color: #e51c23"></i>
    </div>
  </div>
</template>

<script>
import { XButton, Alert } from 'vux'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'sign-view',
  components: {
    XButton,
    Alert
  },
  data () {
    return this.$store.state.sign
  },
  computed: {
    ...mapGetters(['signSwitchText', 'codeText', 'signButton'])
  },
  watch: {
    registered: function (newValue) {
      if (newValue) {
        this.$router.replace(this.$router.currentRoute.query.redirect)
      }
    },
    logined: function (newValue) {
      if (newValue) {
        this.$router.replace(this.$router.currentRoute.query.redirect)
      }
    }
  },
  methods: {
    ...mapActions(['registerUser', 'login', 'sendCode']),
    ...mapMutations(['switchSignView'])
  }
}
</script>

<style lang="less">
.sign-view {
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;

  .logo {
    color: @theme-color;
    font-size: 48em / 16;
    font-weight: normal;
    margin-top: 40px;
  }

  .main, .third-parties {
    width: 80%;
  }

  input {
    box-sizing: border-box;
    width: 100%;
    border: 1px solid #ccc;
    box-shadow: 0px 0px 5px #999;
    height: 48px;
    padding-left: 8px;
    font-size: 14em / 16;
    margin-top: 20px;
  }

  .code {
    position: relative;

    a {
      position: absolute;
      top: 43px;
      right: 10px;
      text-decoration: underline;
      color: @desc-text;
      font-size: 14em / 16;
    }
  }

  .btn-sign {
    background-color: @theme-color;
    color: white;
    margin-top: 20px;
  }

  .switch, .forget {
    display: inline-block;
    width: 49%;
    color: @desc-text;
    font-size: 14em / 16;
    margin-top: 10px;
  }
  .forget {
    text-align: right;
  }

  .third-parties {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;

    .iconfont {
      font-size: 46px;
    }
  }

  @media screen and (min-width: 375px) {

    .logo {
      margin-top: 50px;
    }

    input, .btn-sign, .third-parties {
      margin-top: 30px
    }
  }

  @media screen and (min-width: 410px) {

    .logo {
      margin-top: 60px;
    }

    input, .btn-sign, .third-parties {
      margin-top: 40px
    }
  }
}
</style>
