<template lang="html">
  <div class="comment-item">
    <div class="title">
      <div class="img">
        <img
          v-if="comment.frontUserAvatar"
          :src="comment.frontUserAvatar | picUrl"
          :alt="comment.frontUserName"
        />
      </div>
      <span class="name">{{comment.frontUserName}}</span>
      <rater v-model="comment.rate" disabled :font-size="14"></rater>
    </div>
    <p class="buy-info">
      {{comment.createTime | date}}
      {{comment.skuInfo.join(';')}}
    </p>
    <p class="content">
      {{comment.content}}
    </p>
    <div class="photo-list" v-if="comment.picList">
      <div class="photo" v-for="photo in comment.picList">
        <img :src="photo | picUrl" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { Rater } from 'vux'
export default {
  name: 'comment-item',
  props: {
    comment: Object
  },
  components: {
    Rater
  }
}
</script>

<style lang="less">
.comment-item {
  padding: 15px;
  border-top: 1px solid @border-color;

  .title {
    display: flex;
    align-items: center;

    .img {
      width: 42px;
      height: 42px;
      overflow: hidden;
      border-radius: 21px;
      background-color: #eee;
    }
    img {
      width: 100%;
      height: 100%;
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
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
