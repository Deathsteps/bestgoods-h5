<template lang="html">
  <div class="list-item">
    <div class="item-img">
      <img src="../../assets/logo.png" alt="">
    </div>
    <div class="item-content">
      <h3>100年传世珐琅锅 全家系列</h3>
      <p>网易主厨精选，升级中式锅型</p>
      <span class="item-price">￥246</span>
      <div class="item-tags">
        <span>爆款</span>
        <span>限时购</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'list-item'
}
</script>

<style lang="less">
.list-item {
  display: flex;
  border-bottom: 1px solid #ccc;
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
      font-size: 14em / 16;
      color: #666;
      margin: 5px auto;
    }
  }

  .item-price {
    color: @theme-color;
  }

  .item-tags {
    margin-top: 5px;

    span {
      font-size: 12em / 16;
      background-color: #f48f18;
      color: white;
      padding: 3px 10px;
      border-radius: 3px;
    }
  }
}
</style>
