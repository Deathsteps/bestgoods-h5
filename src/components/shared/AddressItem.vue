<template lang="html">
  <div :class="'address-item' + (highlighted ? ' highlight' : '')">
    <cell :is-link="linkDisplayed">
      <div class="wrapper" slot="title">
        <div class="title">
          <span class="receiver">收货人: 张三</span>
          <span class="phone">13657120123</span>
        </div>
        <p class="address">收货地址:天津市 天津市 市辖区 和平区 德平道儒花园小区44号</p>
      </div>
      <i class="iconfont icon-check" v-if="highlighted" slot="value"></i>
    </cell>
  </div>
</template>

<script>
import { Cell } from 'vux'
export default {
  name: 'address-item',
  components: {
    Cell
  },
  props: {
    linkDisplayed: {
      type: Boolean,
      default: true
    },
    highlighted: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      linkDisplayed: true,
      highlighted: false
    }
  }
}
</script>

<style lang="less">
.address-item {
  background-color: white;
  width: 100%;
  border-bottom: 1px solid #ccc;

  .wrapper {
    margin-right: 28px;
  }
  .title {
    display: flex;
    margin: 10px 0;

    .receiver {
      font-size: 1em;
      flex: 1;
    }
    .phone {
      flex: 1;
      font-size: 1em;
      text-align: right;
    }
  }
  .address {
    color: @desc-text;
    font-size: 14em / 16;
  }
}
.address-item.highlight {
  background-color: #5e6b85;
  color: white;

  .address {
    color: white;
  }
  .iconfont {
    color: white;
    font-size: 24px;
  }
}
</style>
