<template lang="html">
  <view-box>
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
      点评商品
    </x-header>
    <div class="view">
      <div class="comment-product-list" v-if="!succeeded && products">
        <div class="comment-product" v-for="p in products">
          <div class="product">
            <div class="img">
              <img :src="p.imgUrl | picUrl" alt="">
            </div>
            <div class="info">
              <h4>{{ p.name }}</h4>
              <p>{{ p.specText }} <span class="count">x{{ p.count }}</span></p>
            </div>
          </div>
          <cell title="你的满意度：">
            <rater v-model="p.rate" />
          </cell>
          <x-textarea
            placeholder="请填写您的使用感受"
            :show-clear="false"
            :max="180"
            v-model="p.commentContent" />
        </div>
      </div>

      <msg
        v-show="succeeded"
        icon="success"
        title="点评成功！"
        :buttons="[{
          'type': 'primary',
          'text': '查看订单详情',
          'link': '/order-detail/' + orderId
        }, {
          type: 'default',
          text: '返回首页',
          link: '/'
        }]">
      </msg>
    </div>
    <div class="bottom-button" @click="createComments">确认提交</div>
  </view-box>
</template>

<script>
import { mapActions } from 'vuex'
import { XHeader, ViewBox, Rater, XTextarea, Cell, Msg } from 'vux'

export default {
  name: 'create-comment-view',
  components: {
    XHeader,
    ViewBox,
    Rater,
    XTextarea,
    Cell,
    Msg
  },
  data () {
    return this.$store.state.comment
  },
  methods: {
    ...mapActions(['createComments'])
  }
}
</script>

<style lang="less">
.comment-product-list {
  padding-top: 12px;
}
.comment-product {
  background: white;
  margin-top: 12px;

  .product {
    display: flex;
    padding: 10px 0;
    margin-left: 15px;

    .img {
      background-color: #eee;
      width: 80px;
      height: 80px;

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
}
</style>
