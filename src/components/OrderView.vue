<template lang="html">
  <div class="">
    <address-item></address-item>
    <group>
      <div class="order-item">
        <div class="img"></div>
        <div class="info">
          <h4>黑凤梨 104升纯PC拉链斜纹拉杆箱</h4>
          <p>尼罗蓝 <span class="count">x1</span></p>
          <span class="price">￥233</span>
        </div>
      </div>
      <cell title="商品合计：">
        <span style="color: #333" slot="value">￥244</span>
      </cell>
      <cell title="运费：">
        <span style="color: #333" slot="value">￥24</span>
      </cell>
      <cell title="选择优惠券" is-link></cell>
      <x-switch title="开具发票"></x-switch>
      <div style="border-top: 1px solid #ccc">
        <cell title="发票类型" value="电子发票" is-link></cell>
        <cell title="发票内容" value="明细" is-link></cell>
        <cell title="发票抬头类型" value="个人" is-link></cell>
        <x-input title="发票抬头"></x-input>
      </div>
    </group>
    <tabbar class="order-tabbar">
       <tabbar-item class="order-actual-price">
         <span slot="label">应付： ￥244</span>
       </tabbar-item>
       <tabbar-item class="order-pay">
         <span slot="label">去付款</span>
       </tabbar-item>
     </tabbar>
  </div>
</template>

<script>
import { Group, Cell, XSwitch, XInput, Tabbar, TabbarItem } from 'vux'
import AddressItem from '@/components/shared/AddressItem'

export default {
  name: 'order-view',
  components: {
    AddressItem,
    Group,
    Cell,
    XSwitch,
    XInput,
    Tabbar,
    TabbarItem
  }
}
</script>

<style lang="less">

.order-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-top: 1px solid #ccc;
  padding-left: 15px;

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
      position: relative;
    }

    .count {
      font-size: 14em / 16;
      color: #333;
      position: absolute;
      top: 0;
      right: 10px;
    }
  }

}

.order-actual-price {
  >p {
    text-align: left;
    padding-left: 15px;
  }
  span {
    color: @theme-color;
    font-size: 1em;
  }
}
.order-pay {
  background-color: lighten(@theme-color, 10%);
  width: 35%;
  flex: none;

  span {
    color: white;
    font-size: 1em;
  }
}

</style>
