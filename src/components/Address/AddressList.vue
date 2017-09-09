<template lang="html">
  <div class="address-list">
    <b-loading v-if="loading || !addressList"></b-loading>
    <p class="empty-data" v-if="addressList && !addressList.length">暂无数据</p>
    <address-item
      v-for="item in addressList"
      :link-displayed="false"
      :data="item"
      :key="item._id"
      @click="handleItemClick">
    </address-item>
    <div class="bottom-button" @click="handleButtonClick">
      新增收货地址
    </div>
  </div>
</template>

<script>
import AddressItem from '@/components/shared/AddressItem'
import BLoading from '@/components/shared/BLoading'
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'address-list',
  components: {
    AddressItem,
    BLoading
  },
  data () {
    return this.$store.state.address
  },
  methods: {
    handleButtonClick () {
      this.startCreateAddress()
      this.$router.push('/address/create')
    },
    handleItemClick (address) {
      let from = this.$route.query.from
      if (from && from === 'order') {
        this.pickAddress4Order(address)
        this.$router.back()
      } else {
        this.startEditAddress(address)
        this.$router.push('/address/edit')
      }
    },
    ...mapActions(['fetchAddresses']),
    ...mapMutations(['startEditAddress', 'startCreateAddress', 'pickAddress4Order'])
  },
  beforeMount () {
    this.fetchAddresses()
  }
}
</script>

<style lang="less">
</style>
