<template lang="html">
  <view-box>
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
      订单管理
    </x-header>

    <div class="view">
      <status-filter
        @change="filterOrders"
      />

      <b-loading v-show="fetching || !orders" style="margin-top: 180px;"></b-loading>

      <p class="empty-data" v-if="orders && !orders.length">暂无订单数据</p>

      <div class="order-list" v-if="orders">
        <div class="order-list-item" v-for="order in orders">
          <div class="item-header">
            <span class="order-id">{{order._id}}</span>
            <span class="order-status">{{order.statusText}}</span>
          </div>
          <order-items :products="order.products"/>
          <div class="item-footer">
            <div class="price-cell">
              <span class="title">商品{{order.products.length}}件，共计</span>
              <span class="price">￥{{order.payAmount}}</span>
            </div>
            <div class="actions-cell">
              <x-button mini v-if="order.statusCode !== 0">查看物流</x-button>
              <x-button mini v-if="order.statusCode === 2">确认收货</x-button>
              <x-button mini v-if="order.statusCode === 0">去支付</x-button>
              <x-button mini v-if="order.statusCode === 3">点评商品</x-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </view-box>
</template>

<script>
import { mapActions } from 'vuex'
import { ViewBox, XHeader, XButton } from 'vux'
import BLoading from '@/components/shared/BLoading'
import OrderItems from '@/components/shared/OrderItems'
import StatusFilter from '@/components/OrderList/StatusFilter'

export default {
  name: 'orders-view',
  components: {
    ViewBox,
    XHeader,
    XButton,
    BLoading,
    StatusFilter,
    OrderItems
  },
  data () {
    return this.$store.state.orderList
  },
  beforeMount () {
    let status
    if (this.$router.currentRoute.query.status) {
      status = +this.$router.currentRoute.query.status
    }
    this.fetchOrders(status)
  },
  methods: {
    ...mapActions(['fetchOrders', 'filterOrders'])
  }
}
</script>

<style lang="less">
.order-list {
  margin: 12px 0;
}
.order-list-item {
  background: white;
  margin-bottom: 16px;

  .item-header {
    padding: 6px 15px;
    display: flex;
    .order-id {
      flex: 1
    }
    .order-status {
      color: @theme-color;
    }
  }
  .item-footer {
    padding: 0 15px 6px;
    > div {
      border-top: 1px solid @border-color;
      padding: 6px 0;
      text-align: right;
    }
    .price-cell {
      font-size: 1em;
    }
    .actions-cell {
      button {
        margin-top: 6px;
      }
    }
  }
  .order-items-wrapper {
    background-color: #fafafa;
    font-size: 14px;
    .img {
      width: 85px;
      height: 85px;
    }
  }
}
</style>
