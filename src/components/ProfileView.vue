<template lang="html">
  <div class="view profile-view">
    <div class="profile-head">
      <div class="background"></div>
      <div class="info">
        <div class="avater-wrapper">
          <div class="avater">
            <i class="iconfont icon-myfill" style="font-size: 45px;"></i>
          </div>
        </div>
        <span class="credit vux-1px-r">积分(900)</span>
        <span class="coupon">优惠券(10)</span>
      </div>
    </div>
    <group class="profile-order-status">
      <grid :rows="5">
        <grid-item
          label="待付款">
          <i slot="icon" class="iconfont icon-pay" />
        </grid-item>
        <grid-item
          label="待发货">
          <i slot="icon" class="iconfont icon-send" />
        </grid-item>
        <grid-item
          label="待收货">
          <i slot="icon" class="iconfont icon-deliver" />
        </grid-item>
        <grid-item
          label="待评价">
          <i slot="icon" class="iconfont icon-comment" />
        </grid-item>
        <grid-item
          label="待退款">
          <i slot="icon" class="iconfont icon-refund" />
        </grid-item>
      </grid>
      <cell title="全部订单" is-link>
        <i slot="icon" class="iconfont icon-form cell-icon" />
      </cell>
    </group>
    <group>
      <cell title="我的收藏" is-link>
        <i slot="icon" class="iconfont icon-collections cell-icon" />
      </cell>
      <cell title="我的地址" is-link link="/address">
        <i slot="icon" class="iconfont icon-location cell-icon" />
      </cell>
    </group>
    <div class="profile-exit">
      <x-button @click.native="signOut">{{profileButton}}</x-button>
    </div>
    <b-tabbar></b-tabbar>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { Group, Cell, Grid, GridItem, XButton } from 'vux'
import BTabbar from '@/components/shared/BTabbar'

export default {
  name: 'profile-view',
  components: {
    Group,
    Cell,
    Grid,
    GridItem,
    XButton,
    BTabbar
  },
  data () {
    return this.$store.state.profile
  },
  computed: {
    ...mapGetters(['profileButton'])
  },
  methods: {
    ...mapMutations(['signOut', 'initLoginStatus'])
  },
  beforeMount () {
    this.initLoginStatus()
  }
}
</script>

<style lang="less">
.profile-view {
  margin-top: 0;
}

.profile-head {
  height: 264px;
  background-color: white;

  .background {
    height: 200px;
    background-color: @yellow;
  }
  .info {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .avater-wrapper, .credit, .coupon {
    position: relative;
    flex: 1;
    display: inline-block;
    height: 64px;
    line-height: 64px;
    text-align: center;
  }
  .avater {
    position: absolute;
    top: -64px / 2;
    left: 25px;
    background-color: #eee;
    width: 64px;
    height: 64px;
    border-radius: 64px / 2;
  }
}

.profile-order-status {
  i {
    font-size: 32px;
    line-height: 32px;
    color: #333;
  }
}
.profile-exit {
  margin: 20px;
}

</style>
