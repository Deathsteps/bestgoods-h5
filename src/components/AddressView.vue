<template lang="html">
  <div class="">
    <div class="address-list" v-if="!isEdit">
      <address-item :link-displayed="false" :highlighted="true"></address-item>
      <address-item :link-displayed="false"></address-item>
      <address-item :link-displayed="false"></address-item>
      <address-item :link-displayed="false"></address-item>
      <div class="bottom-button" @click="handleClick">
        新增收货地址
      </div>
    </div>

    <div class="address-edit" v-if="isEdit">
      <!-- <cell title="上海上海市长宁区" is-link></cell> -->
      <x-address
        placeholder="请选择地址"
        value-text-align="left"
        :list="addressData"></x-address>
      <cell title="北砂路998号602" is-link></cell>
      <cell title="张三" is-link></cell>
      <cell title="136254178421" is-link></cell>
      <cell title="300021" is-link></cell>
      <x-switch title="设为默认地址"></x-switch>
      <cell>
        <span slot="title" style="color: red">删除收货地址</span>
      </cell>
      <div class="bottom-button" @click="handleClick">
        保存地址
      </div>
    </div>

  </div>
</template>

<script>
import { Cell, XSwitch, XAddress, ChinaAddressV3Data } from 'vux'
import AddressItem from '@/components/shared/AddressItem'

export default {
  name: 'address-view',
  components: {
    AddressItem,
    Cell,
    XSwitch,
    XAddress
  },
  data () {
    return {
      isEdit: false,
      addressData: ChinaAddressV3Data
    }
  },
  methods: {
    handleClick () {
      this.isEdit = !this.isEdit
    }
  }
}
</script>

<style lang="less">
.bottom-button {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 46px;
  line-height: 46px;
  text-align: center;
  background-color: lighten(@theme-color, 10%);
  color: white;
}

.address-edit {
  background-color: white;
}
</style>
