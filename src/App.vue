<template>
  <div style="height:100%;">
   <router-view></router-view>
   <loading :show="true" v-if="loading"></loading>
   <alert v-model="errAlertDisplayed" title="出错了">
     {{ err ? err.message : '' }}
   </alert>
 </div>
</template>

<script>
import { Loading, Alert } from 'vux'

export default {
  name: 'app',
  components: {
    Loading, Alert
  },
  data () {
    return this.$store.state.app
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
// @import '~vux/src/styles/1px.less';

html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  background-color: #efefef;
}

.view {
  margin-top: 46px;

  .weui-grid {
    padding: 15px 10px;
  }
  .weui-grid:before {
    border-right: none;
  }
  .weui-grid:after {
    border-bottom: none;
  }

  .cell-icon {
    font-size: 24px;
    line-height: 24px;
    margin-right: 5px;
  }
}

.weui-cell {
  line-height: 22em / 16;
  font-size: 14em / 16;
}
</style>
