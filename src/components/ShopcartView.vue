<template lang="html">
  <view-box>
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
      购物车
    </x-header>
    <div class="cart">
      <div class="cart-item" v-for="item in productList">
        <div class="checker">
          <checkbox :checked="true"></checkbox>
        </div>
        <div class="img">
          <img :src="item.imgUrl | picUrl">
        </div>
        <div class="info">
          <h4>{{ item.name }}</h4>
          <p>{{ item.specText }}</p>
          <x-number :title="'￥' + item.retailPrice" :value="item.count"></x-number>
        </div>
      </div>
    </div>
    <div v-if="productList && !productList.length" class="empty-data" style="margin-top: 180px;">暂无商品</div>
    <b-loading v-show="loading || !productList" style="margin-top: 180px;"></b-loading>
    <b-tabbar slot="bottom"></b-tabbar>
  </view-box>
</template>

<script>
import { ViewBox, XNumber, XHeader } from 'vux'
import BLoading from '@/components/shared/BLoading'
import BTabbar from '@/components/shared/BTabbar'
import Checkbox from '@/components/shared/Checkbox'
import { mapActions } from 'vuex'

export default {
  name: 'shopcart-view',
  components: {
    XHeader,
    ViewBox,
    BLoading,
    BTabbar,
    XNumber,
    Checkbox
  },
  data () {
    return this.$store.state.shopcart
  },
  methods: {
    ...mapActions(['syncShopcart'])
  },
  beforeMount () {
    this.syncShopcart()
  }
}
</script>

<style lang="less">

.cart {
  background-color: white;
  margin-top: 46px;
}
.cart-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;

  .checker {
    margin: 0 8px;
  }
  .img {
    background-color: #eee;
    width: 110px;
    height: 110px;

    img {
      height: 100%;
      width: 100%;
    }
  }
  .info {
    flex: 1;
    padding: 0 15px;

    h4 {
      font-size: 1em;
      font-weight: normal;
    }
    >p {
      font-size: 12em / 16;
      color: @desc-text;
      margin: 5px 0;
    }

    .weui-cell {
      padding: 10px 0;
    }
  }

}
</style>
