<template lang="html">
  <router-link tag="div"
    :to="'detail/'+product.id"
    class="list-item">
    <div class="item-img">
      <img :src="product.listPicUrl | picUrl" alt="">
    </div>
    <div class="item-content">
      <h3>{{product.name}}</h3>
      <p>{{product.simpleDesc}}</p>
      <span class="item-price">￥{{product.retailPrice}}</span>
      <div class="item-tags">
        <span>爆款</span>
        <span>限时购</span>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'list-item',
  props: {
    'product': Object
  }
}
</script>

<style lang="less">
.list-item {
  display: flex;
  border-bottom: 1px solid @border-color;
  padding: 10px;

  .item-img {
    width: 150px;
    height: 150px;
    background-color: #efefef;

    img {
      width: 100%;
    }
  }

  .item-content {
    flex: 1;
    padding-left: 10px;

    h3 {
      font-size: 1em;
    }

    p {
      font-size: 13em / 16;
      color: @desc-text;
      margin: 10px auto;
    }
  }

  .item-price {
    color: @theme-color;
  }

  .item-tags {
    margin-top: 5px;

    span {
      font-size: 12em / 16;
      background-color: @tag-color;
      color: white;
      padding: 3px 10px;
      border-radius: 3px;
    }
  }
}
</style>
