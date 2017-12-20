<template lang="html">
  <div class="status-filter">
    <tab :animate="false" class="tab-wrapper">
      <tab-item
        v-for="status in statusList"
        :key="status.id"
        :selected="status.id === selected"
        @on-item-click="handleClick(status.id)">
        {{ status.name }}
      </tab-item>
    </tab>
  </div>
</template>

<script>
import { Tab, TabItem } from 'vux'

export default {
  name: 'status-filter',
  components: {
    Tab,
    TabItem
  },
  data () {
    let status = +this.$router.currentRoute.query.status
    status = isNaN(status) ? -1 : status
    return {
      selected: status,
      statusList:
        ['全部', '待支付', '待发货', '待收货', '待评价'].map(
          (text, i) => ({
            id: i - 1, // 全部应该是-1
            name: text
          })
        )
    }
  },
  methods: {
    handleClick (statusCode) {
      if (statusCode !== -1) {
        this.$router.replace('/order-list?status=' + statusCode)
        this.$emit('change', statusCode)
      } else {
        // 全部， -1 的值不外抛
        this.$router.replace('/order-list')
        this.$emit('change')
      }
    }
  }
}
</script>

<style lang="css">
</style>
