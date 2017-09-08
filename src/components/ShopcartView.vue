<template lang="html">
  <view-box>
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
      购物车
      <span slot="right" @click="manageCartProducts">{{ manageBtnText }}</span>
    </x-header>

    <b-loading v-show="loading || !productList" style="margin-top: 180px;"></b-loading>

    <p v-if="productList && !productList.length" class="empty-data" style="margin-top: 180px;">暂无商品</p>

    <div class="cart">
      <div class="cart-item" v-for="(item, i) in productList">
        <div class="checker">
          <checkbox
            :checked="productCheckStatus[i]"
            :value="i"
            @change="checkCartProduct">
          </checkbox>
        </div>
        <div class="img">
          <img :src="item.imgUrl | picUrl">
        </div>
        <div class="info">
          <h4>{{ item.name }}</h4>
          <p>{{ item.specText }}</p>
          <x-number
            :title="'￥' + item.retailPrice"
            :value="item.count"
            :min="1"
            @on-change="count => changeCartProductCount({ i, count })">
          </x-number>
        </div>
      </div>
    </div>

    <div class="cart-bar" v-show="productList && productList.length">
      <div class="checker">
        <checkbox :checked="allChecked"
          @change="checkAllCartProducts">
        </checkbox>
      </div>
      <div class="text">已选({{ selectedCount }})</div>
      <div class="price" v-show="!isManageMode">￥{{ totalPrice }}</div>
      <div :class="barBtnDisabled ? 'button disabled' : 'button' "
        @click="handleBarBtnClick">
        {{ barBtnText }}
      </div>
    </div>

    <confirm
      title="要删除所选的商品"
      v-model="confirmDisplayed"
      @on-confirm="removeCartProduct">
    </confirm>

    <b-tabbar slot="bottom"></b-tabbar>
  </view-box>
</template>

<script>
import { ViewBox, XNumber, XHeader, Confirm } from 'vux'
import BLoading from '@/components/shared/BLoading'
import BTabbar from '@/components/shared/BTabbar'
import Checkbox from '@/components/shared/Checkbox'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'shopcart-view',
  components: {
    XHeader,
    ViewBox,
    BLoading,
    BTabbar,
    XNumber,
    Confirm,
    Checkbox
  },
  data () {
    return this.$store.state.shopcart
  },
  computed: {
    ...mapGetters(['manageBtnText', 'barBtnDisabled', 'barBtnText', 'selectedCount', 'totalPrice'])
  },
  methods: {
    handleBarBtnClick () {
      if (this.barBtnDisabled) {
        return
      }
      this.isManageMode ? this.confirmRemove() : this.createOrderFromCart()
    },
    ...mapActions(['syncShopcart', 'createOrderFromCart']),
    ...mapMutations([
      'manageCartProducts', 'checkCartProduct', 'checkAllCartProducts',
      'changeCartProductCount', 'confirmRemove', 'removeCartProduct'
    ])
  },
  beforeMount () {
    this.syncShopcart()
  }
}
</script>

<style lang="less">

.cart {
  background-color: white;
  margin: 46px 0;
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

.cart-bar {
  position: absolute;
  bottom: 54px;
  left: 0;
  width: 100%;
  height: 46px;
  display: flex;
  align-items: center;
  background-color: white;

  .text {
    flex: 1;
    margin-left: 5px;
    font-size: 14em / 16;
  }
  .price {
    margin-right: 15px;
    color: @theme-color;
    font-size: 14em / 16;
  }
  .button {
    width: 100px;
    height: 44px;
    line-height: 44px;
    font-size: 14em / 16;
    color: #fefefe;
    background-color: @theme-color;
    text-align: center;
  }
  .button.disabled {
    background-color: #ccc;
  }
}

</style>
