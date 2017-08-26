<template lang="html">
  <view-box>
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
      购物车
    </x-header>
    <div class="cart">
      <div class="cart-item">
        <div class="checker">
          <checkbox :checked="true"></checkbox>
        </div>
        <div class="img"></div>
        <div class="info">
          <h4>黑凤梨 104升纯PC拉链斜纹拉杆箱</h4>
          <p>尼罗蓝</p>
          <x-number title="￥255"></x-number>
        </div>
      </div>
      <div class="cart-item">
        <div class="checker">
          <checkbox :checked="false"></checkbox>
        </div>
        <div class="img"></div>
        <div class="info">
          <h4>黑凤梨 104升纯PC拉链斜纹拉杆箱</h4>
          <p>尼罗蓝</p>
          <x-number title="￥255"></x-number>
        </div>
      </div>
      <div class="cart-item">
        <div class="checker">
          <checkbox :checked="true"></checkbox>
        </div>
        <div class="img"></div>
        <div class="info">
          <h4>黑凤梨 104升纯PC拉链斜纹拉杆箱</h4>
          <p>尼罗蓝</p>
          <x-number title="￥255"></x-number>
        </div>
      </div>
    </div>
    <b-tabbar slot="bottom"></b-tabbar>
  </view-box>
</template>

<script>
import { ViewBox, XNumber, XHeader } from 'vux'
import BTabbar from '@/components/shared/BTabbar'
import Checkbox from '@/components/shared/Checkbox'

export default {
  name: 'shopcart-view',
  components: {
    XHeader,
    ViewBox,
    BTabbar,
    XNumber,
    Checkbox
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
