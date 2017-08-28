<template lang="html">
  <div class="comment-item">
    <div class="title">
      <div class="img">

      </div>
      <span class="name">Sk***d</span>
      <rater v-model="rate"></rater>
    </div>
    <p class="buy-info">
      2017-07-30 15:20:23浅麻灰; L（175/100）
    </p>
    <p class="content">
      某服，久闻严选的包装高大上，今日一见果然不同凡响，实在令某耳目一新，虎躯一震！使某于网易之大气豪爽愈加佩服，使得某再看某宝之包装，蔑视之情不觉油然而生充斥肺腑。又觉网易之速度快如风，然某宝之速度慢如龟，某大怒！胜怒之下，速速取来手机，欲将某宝除之而后快……欲知后事如何，且听下回分解
    </p>
    <div class="photo-list">
      <div class="photo"></div>
      <div class="photo"></div>
      <div class="photo"></div>
    </div>
  </div>
</template>

<script>
import { Rater } from 'vux'
export default {
  name: 'comment-item',
  components: {
    Rater
  },
  data () {
    return { rate: 5 }
  }
}
</script>

<style lang="less">
.comment-item {
  padding: 15px;
  border-top: 1px solid #ccc;

  .title {
    display: flex;
    align-items: center;

    .img {
      width: 42px;
      height: 42px;
      background-color: #eee;
    }
    .name {
      padding: 5px 10px;
    }
  }
  .buy-info {
    color: #999;
    margin: 5px 0;
    font-size: 12em / 16;
  }
  .content {
    color: #333;
    margin: 5px 0;
    font-size: 14em / 16;
  }
  .photo-list {
    display: flex;
    .photo {
      width: 80px;
      height: 80px;
      background-color: #eee;
      margin-right: 15px;
    }
  }
}
</style>
