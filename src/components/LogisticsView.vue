<template lang="html">
  <view-box>
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
      商品物流
    </x-header>
    <div class="view">
      <div class="flow-wrapper">
        <flow orientation="vertical" style="height:400px;">
          <flow-state state="1" title="商品待发货" is-done></flow-state>
          <flow-line is-done :line-span="5"></flow-line>
          <flow-state state="2" title="商品从上海发货" is-done></flow-state>
          <flow-line is-done :line-span="15"></flow-line>

          <flow-state state="3" title="商品已到上海分拣中心" is-done></flow-state>
          <flow-line :line-span="30" tip="分拣调度中"/>

          <flow-state state="4" title="商品递送中"></flow-state>
          <flow-line :line-span="45"></flow-line>

          <flow-state state="5" title="收货"></flow-state>
        </flow>
      </div>
    </div>
  </view-box>
</template>

<script>
import { XHeader, ViewBox, Flow, FlowState, FlowLine } from 'vux'

export default {
  name: 'logistics-view',
  components: {
    XHeader,
    ViewBox,
    Flow,
    FlowState,
    FlowLine
  }
}
</script>

<style lang="less">
.flow-wrapper {
  background: white;
  margin-top: 70px;

  [class^="weui-wepay-flow__info-"],
  .weui-wepay-flow__li_done .weui-wepay-flow__state,
  .weui-wepay-flow__process {
    background-color: @theme-color;
  }
  .weui-wepay-flow__info-left:after {
    border-left-color: @theme-color;
  }
}
</style>
