<template lang="html">
  <div class="address-edit">
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
      <span slot="title" style="color: red" @click="handleDelete">删除收货地址</span>
    </cell>
    <div class="bottom-button"
      @click="handleSave">
      保存地址
    </div>
  </div>
</template>

<script>
import { Cell, XInput, XSwitch, XAddress } from 'vux'
import { mapActions } from 'vuex'

export default {
  name: 'address-edit',
  components: {
    Cell, XInput, XSwitch, XAddress
  },
  data () {
    return this.$store.state.address
  },
  methods: {
    handleSave () {
      let promise = this.addressId ? this.editAddress() : this.createAddress()
      promise.then(
        // TODO: 根据前导页判断
        () => this.$router.push('/address'),
        // 不处理reject
        function () {}
      )
    },
    handleDelete () {
      this.deleteAddress()
        .then(() => this.$router.push('/address'))
    },
    ...mapActions(['createAddress', 'editAddress', 'deleteAddress'])
  }
}
</script>

<style lang="less">
</style>
