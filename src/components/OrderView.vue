<template lang="html">
  <view-box>
    <address-item
      v-if="address"
      :noHighLight="true"
      :data="address"
      @click="handleAddressClick">
    </address-item>
    <group>
      <div class="order-item-wrapper">
        <div class="order-item" v-for="p in products">
          <div class="img">
            <img :src="p.imgUrl | picUrl" alt="">
          </div>
          <div class="info">
            <h4>{{ p.name }}</h4>
            <p>{{ p.specText }} <span class="count">x{{ p.count }}</span></p>
            <span class="price">￥{{ p.retailPrice }}</span>
          </div>
        </div>
      </div>

      <cell title="商品合计：">
        <span style="color: #333">￥{{productsPrice}}</span>
      </cell>
      <cell title="运费：">
        <span style="color: #333">￥{{deliveryFee}}</span>
      </cell>
      <cell title="选择优惠券" is-link></cell>
      <x-switch title="开具发票" v-model="receiptGiven"></x-switch>
      <div style="border-top: 1px solid #d9d9d9" v-show="receiptGiven">
        <cell title="发票类型" v-model="receipt.type"></cell>
        <cell title="发票内容" v-model="receipt.content"></cell>
        <selector
          title="发票抬头类型"
          :options="['个人', '公司']"
          direction="rtl"
          v-model="receipt.titleType"
          is-link>
        </selector>
        <x-input
          title="发票抬头"
          text-align="right"
          v-model="receipt.title"
          placeholder="请输入抬头">
        </x-input>
      </div>
    </group>
    <tabbar class="order-tabbar" slot="bottom">
       <tabbar-item class="order-actual-price">
         <span slot="label">应付： ￥{{payAmount}}</span>
       </tabbar-item>
       <tabbar-item class="order-pay" @on-item-click="handlePayClick">
         <span slot="label">去付款</span>
       </tabbar-item>
     </tabbar>
  </view-box>
</template>

<script>
import { Group, Cell, XSwitch, XInput, Tabbar, TabbarItem, ViewBox, Selector } from 'vux'
import AddressItem from '@/components/shared/AddressItem'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'order-view',
  components: {
    ViewBox,
    AddressItem,
    Group,
    Cell,
    XSwitch,
    XInput,
    Selector,
    Tabbar,
    TabbarItem
  },
  data () {
    return this.$store.state.order
  },
  computed: {
    ...mapGetters(['productsPrice', 'payAmount'])
  },
  methods: {
    handleAddressClick () {
      this.$router.push('/address?from=order')
    },
    handlePayClick () {
      this.createOrder()
        .then(({ orderId }) => {
          this.$router.push(`/pay?orderId=${orderId}`)
        })
    },
    ...mapActions(['fetchUserDefaultAddress', 'fetchDeliveryFee', 'createOrder'])
  },
  beforeMount () {
    if (!this.address) {
      this.fetchUserDefaultAddress()
        .then(this.fetchDeliveryFee)
    }
  }
}
</script>

<style lang="less">

.order-item-wrapper {
  border-top: 1px solid @border-color;
  :first-child {
    border-top: none;
  }
}

.order-item {
  display: flex;
  align-items: center;
  border-top: 1px solid @border-color;
  padding: 10px 0;
  margin-left: 15px;

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
