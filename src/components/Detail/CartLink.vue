<template lang="html">
  <router-link slot="right" to="/shopcart">
    <i class="iconfont icon-shopcart" style="font-size: 22px; line-height: 0;" />
    <badge v-if="count" :text="count" class="detail-cart-badge"></badge>
  </router-link>
</template>

<script>
import { Badge } from 'vux'

export default {
  name: 'cart-link',
  components: {
    Badge
  },
  props: {
    count: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="less">
.detail-cart-badge {
  position: absolute;
  top: -8px;
  right: -12px;
}
</style>
