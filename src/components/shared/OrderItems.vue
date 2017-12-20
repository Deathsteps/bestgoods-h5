<template lang="html">
  <div class="order-items-wrapper">
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
  name: 'order-items',
  props: {
    products: Array
  }
}
</script>

<style lang="less">
.order-items-wrapper {
  border-top: 1px solid @border-color;
  :first-child {
    border-top: none;
  }
}

.order-item {
  display: flex;
  align-items: center;
  border-top: 1px solid @border-color;
  padding: 10px 0;
  margin-left: 15px;

  .checker {
    margin: 0 8px;
  }
  .img {
    background-color: #eee;
    width: 110px;
    height: 110px;

    img {
      height: 100%;
      width: 100%;
    }
  }
  .info {
    flex: 1;
    padding: 0 15px;

    h4 {
      font-size: 1em;
      font-weight: normal;
    }
    >p {
      font-size: 12em / 16;
      color: @desc-text;
      margin: 5px 0;
      position: relative;
    }

    .count {
      font-size: 14em / 16;
      color: #333;
      position: absolute;
      top: 0;
      right: 10px;
    }
  }

}
</style>
