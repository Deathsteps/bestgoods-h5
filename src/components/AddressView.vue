<template lang="html">
  <div class="">
    <x-header slot="header">地址管理</x-header>
    <router-view></router-view>
    <loading :show="true" v-if="modalLoading"></loading>
    <alert v-model="errAlertDisplayed" title="提示">
      {{ err ? err.message : '' }}
    </alert>
  </div>
</template>

<script>
import { Alert, Loading, XHeader } from 'vux'

export default {
  name: 'address-view',
  components: {
    Alert,
    Loading,
    XHeader
  },
  data () {
    return this.$store.state.address
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
