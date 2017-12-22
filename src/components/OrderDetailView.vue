<template lang="html">
<view-box>
  <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
    订单详情
  </x-header>
  <b-loading v-if="!order"></b-loading>
  <div v-if="order" style="margin-top: 60px;">
    <group>
      <cell :title="order.statusText" is-link></cell>
      <address-item
        style="border-top: 1px solid #d9d9d9"
        :noHighLight="true"
        :data="order.address">
      </address-item>
    </group>

    <group>
      <order-package :products="order.products"></order-package>
      <cell title="商品合计：">
        <span style="color: #333">￥{{order.productsPrice}}</span>
      </cell>
      <cell title="运费：">
        <span style="color: #333">￥{{order.deliveryFee}}</span>
      </cell>
    </group>

    <group>
      <div class="order-info">
        <p>订单号：{{order._id}}</p>
        <p>创建时间：{{order.createDate | date}}</p>
        <p v-if="order.payDate">支付时间：{{order.payDate | date}}</p>
        <p v-if="order.sendDate">发货时间：{{order.sendDate | date}}</p>
        <p v-if="order.receiveDate">收货时间：{{order.receiveDate | date}}</p>
      </div>
    </group>
  </div>
</view-box>
</template>

<script>
import { ViewBox, XHeader, Group, Cell } from 'vux'
import AddressItem from '@/components/shared/AddressItem'
import BLoading from '@/components/shared/BLoading'
import OrderPackage from '@/components/shared/OrderPackage'
import { mapActions } from 'vuex'

export default {
  name: 'order-detail-view',
  components: {
    ViewBox,
    XHeader,
    Group,
    Cell,
    AddressItem,
    BLoading,
    OrderPackage
  },
  data () {
    return this.$store.state.orderDetail
  },
  methods: {
    ...mapActions(['fetchOrder'])
  },
  beforeMount () {
    this.fetchOrder(this.$route.params.id)
  }
}
</script>

<style lang="less">
.order-info {
  padding: 10px 15px;
  color: @desc-text;
  font-size: 12em / 16;
  line-height: 32em / 16;
}
</style>
