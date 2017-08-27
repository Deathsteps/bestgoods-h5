<template lang="html">
  <tabbar>
   <tabbar-item selected>
     <i slot="icon" class="iconfont icon-homefill"></i>
     <span slot="label">首页</span>
   </tabbar-item>
   <tabbar-item>
     <i slot="icon" class="iconfont icon-shopcart"></i>
     <span slot="label">购物车</span>
   </tabbar-item>
   <tabbar-item link="/component/demo">
     <i slot="icon" class="iconfont icon-myfill"></i>
     <span slot="label">我的</span>
   </tabbar-item>
 </tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'

export default {
  name: 'b-tabbar',
  components: {
    Tabbar, TabbarItem
  }
}
</script>

<style lang="less">
</style>
