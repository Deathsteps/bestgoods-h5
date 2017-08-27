<template lang="html">
  <div class="address-item">
    <cell-box is-link>
      <div class="wrapper">
        <div class="title">
          <span class="receiver">收货人: 张三</span>
          <span class="phone">13657120123</span>
        </div>
        <p class="address">收货地址:天津市 天津市 市辖区 和平区 德平道儒花园小区44号</p>
      </div>
    </cell-box>
  </div>
</template>

<script>
import { CellBox } from 'vux'
export default {
  name: 'address-item',
  components: {
    CellBox
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
</style>
