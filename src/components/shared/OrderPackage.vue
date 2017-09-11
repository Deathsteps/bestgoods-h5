<template lang="html">
  <div class="order-item-wrapper">
    <div class="order-item" v-for="p in products">
      <div class="img">
        <img :src="p.imgUrl | picUrl" alt="">
      </div>
      <div class="info">
        <h4>{{ p.name }}</h4>
        <p>{{ p.specText }} <span class="count">x{{ p.count }}</span></p>
        <span class="price">￥{{ p.retailPrice }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'order-package',
  props: {
    products: Array
  }
}
</script>

<style lang="less">
</style>
