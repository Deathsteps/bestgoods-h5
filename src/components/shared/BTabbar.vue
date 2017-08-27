<template lang="html">
  <tabbar>
   <tabbar-item :selected="selected === 'home'" link="/">
     <i slot="icon" class="iconfont icon-homefill"></i>
     <span slot="label">首页</span>
   </tabbar-item>
   <tabbar-item :selected="selected === 'shopcart'" link="/shopcart">
     <i slot="icon" class="iconfont icon-shopcart"></i>
     <span slot="label">购物车</span>
   </tabbar-item>
   <tabbar-item :selected="selected === 'profile'" link="/profile">
     <i slot="icon" class="iconfont icon-myfill"></i>
     <span slot="label">我的</span>
   </tabbar-item>
 </tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'

export default {
  name: 'b-tabbar',
  data () {
    return {
      selected: ''
    }
  },
  components: {
    Tabbar, TabbarItem
  },
  beforeMount () {
    let path = this.$router.currentRoute.path
    if (path === '/') {
      this.selected = 'home'
    } else if (path === '/shopcart') {
      this.selected = 'shopcart'
    } else if (path === '/profile') {
      this.selected = 'profile'
    }
  }
}
</script>

<style lang="less">
</style>
