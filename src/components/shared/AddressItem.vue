<template lang="html">
  <div :class="'address-item' + (data.isDefault ? ' highlight' : '')"
    @click="handleClick">
    <cell :is-link="linkDisplayed">
      <div class="wrapper" slot="title">
        <div class="title">
          <span class="receiver">收货人: {{ data.receiver }}</span>
          <span class="phone">{{ data.contactPhone }}</span>
        </div>
        <p class="address">收货地址: {{ addressText }}</p>
      </div>
      <i class="iconfont icon-check" v-if="data.isDefault" slot="value"></i>
    </cell>
  </div>
</template>

<script>
import { Cell, ChinaAddressV3Data, Value2nameFilter as value2name } from 'vux'
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
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    addressText () {
      return value2name(this.data.location, ChinaAddressV3Data) + ' ' + this.data.detail
    }
  },
  methods: {
    handleClick () {
      this.$emit('click', this.data)
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
