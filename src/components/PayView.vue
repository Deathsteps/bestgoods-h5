<template lang="html">
  <div class="pay-view">
    <group title="请选择支付方式">
      <cell>
        <checkbox
          slot="icon"
          :radio="true"
          @change="selectPayTool('alipay')"
          :checked="isAliChecked">
        </checkbox>
        <span class="pay-cell-title" slot="title">
          <i slot="icon" class="iconfont icon-ziyuan" style="color: #009FE9"></i>
          <span>支付宝</span>
        </span>
      </cell>
      <cell>
        <checkbox
          slot="icon"
          :radio="true"
          @change="selectPayTool('weixinpay')"
          :checked="isWeixinChecked">
        </checkbox>
        <span class="pay-cell-title" slot="title">
          <i slot="icon" class="iconfont icon-weixin_Pay" style="color: #00C901"></i>
          <span>微信支付</span>
        </span>
      </cell>
    </group>
    <div class="bottom-button">确定</div>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'
import Checkbox from '@/components/shared/Checkbox'
import { mapMutations } from 'vuex'

export default {
  name: 'pay-view',
  components: {
    Group,
    Cell,
    Checkbox
  },
  data () {
    return this.$store.state.pay
  },
  methods: {
    ...mapMutations(['selectPayTool'])
  }
}
</script>

<style lang="less">
.pay-cell-title {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 10px;

  .iconfont {
    font-size: 28px;
  }
  span {
    flex: 1;
    padding-left: 10px;
  }
}
</style>
