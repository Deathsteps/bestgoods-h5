<template>
  <div style="height:100%;">
   <view-box ref="viewBox">
     <router-view></router-view>
     <tabbar slot="bottom">
      <tabbar-item selected>
        <i slot="icon" class="iconfont icon-homefill"></i>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item>
        <i slot="icon" class="iconfont icon-cartfill"></i>
        <span slot="label">购物车</span>
      </tabbar-item>
      <tabbar-item link="/component/demo">
        <i slot="icon" class="iconfont icon-my_fill_light"></i>
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
   </view-box>
 </div>
</template>

<script>
import { ViewBox, Tabbar, TabbarItem } from 'vux'

export default {
  name: 'app',
  components: { ViewBox, Tabbar, TabbarItem }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  background-color: #efefef;
}
</style>
