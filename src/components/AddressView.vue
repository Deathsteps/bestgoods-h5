<template lang="html">
  <div class="">
    <div class="address-list" v-if="!isEditMode">
      <b-loading v-if="loading || !addressList"></b-loading>
      <p class="empty-data" v-if="addressList && !addressList.length">暂无数据</p>
      <address-item
        v-for="item in addressList"
        :link-displayed="false"
        :data="item"
        :key="item._id"
        @click="startEditAddress">
      </address-item>
      <div class="bottom-button" @click="startCreateAddress">
        新增收货地址
      </div>
    </div>

    <loading :show="true" v-if="modalLoading"></loading>
    <alert v-model="errAlertDisplayed" title="提示">
      {{ err ? err.message : '' }}
    </alert>

    <div class="address-edit" v-if="isEditMode">
      <x-address
        title=""
        placeholder="请选择地址"
        value-text-align="left"
        v-model="location"
        :list="addressData">
      </x-address>
      <x-input v-model="detail" placeholder="收货详细地址" :show-clear="false"></x-input>
      <x-input v-model="receiver" placeholder="收货人" :show-clear="false"></x-input>
      <x-input v-model="contactPhone" placeholder="联系电话" :show-clear="false"></x-input>
      <x-input v-model="zipcode" placeholder="邮编" :show-clear="false"></x-input>
      <x-switch v-model="isDefault" title="设为默认地址"></x-switch>
      <cell v-show="addressId">
        <span slot="title" style="color: red" @click="deleteAddress">删除收货地址</span>
      </cell>
      <div class="bottom-button"
        @click="addressId ? editAddress() : createAddress()">
        保存地址
      </div>
    </div>

  </div>
</template>

<script>
import { Cell, XInput, XSwitch, XAddress, Alert, Loading } from 'vux'
import AddressItem from '@/components/shared/AddressItem'
import BLoading from '@/components/shared/BLoading'
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'address-view',
  components: {
    AddressItem,
    Cell,
    XInput,
    XSwitch,
    XAddress,
    Alert,
    Loading,
    BLoading
  },
  data () {
    return this.$store.state.address
  },
  watch: {
    isEditMode (newValue, oldValue) {
      if (newValue !== oldValue && !newValue) {
        this.fetchAddresses()
      }
    }
  },
  methods: {
    ...mapActions(['fetchAddresses', 'fetchAddress', 'createAddress', 'editAddress', 'deleteAddress']),
    ...mapMutations(['startEditAddress', 'startCreateAddress'])
  },
  beforeMount () {
    this.fetchAddresses()
  }
}
</script>

<style lang="less">
.empty-data {
  color: @theme-color;
  margin-top: 30px;
  text-align: center;
}

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
