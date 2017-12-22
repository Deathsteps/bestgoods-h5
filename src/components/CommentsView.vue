<template lang="html">
  <view-box>
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
      用户点评
    </x-header>

    <div class="view">
      <b-loading v-show="fetching || !comments || receiving" style="margin-top: 180px;"></b-loading>
      <p class="empty-data" v-if="orders && !orders.length">暂无点评数据</p>

      <div class="tag-list"v-if="!fetching && tags">
        <span
          v-for="(tag, index) in tags"
          :class="index === 0 ? 'active' : ''">
          {{tag.name}}({{tag.strCount}})
        </span>
      </div>
      <div class="comments" v-if="!fetching && comments">
        <comment-item
          v-for="comment in comments"
          :comment="comment"
          :key="comment.productId"
        />
      </div>
    </div>
  </view-box>
</template>

<script>
import { mapActions } from 'vuex'
import { ViewBox, XHeader } from 'vux'
import BLoading from '@/components/shared/BLoading'
import CommentItem from '@/components/Comments/CommentItem'

export default {
  name: 'comments-view',
  components: {
    ViewBox,
    XHeader,
    BLoading,
    CommentItem
  },
  data () {
    return this.$store.state.commentList
  },
  methods: {
    ...mapActions(['fetchComments'])
  },
  beforeMount () {
    let productId = +this.$router.currentRoute.query.pid
    this.fetchComments(productId)
  }
}
</script>

<style lang="less">
.tag-list {
  background-color: white;
  padding: 20px 0;

  span {
    display: inline-block;
    font-size: 12em / 16;
    color: #666;
    padding: 3px 10px;
    border-radius: 3px;
    border: 1px solid #666;
    margin: 8px 15px;
  }
  .active {
    color: @theme-color;
    border: 1px solid @theme-color
  }
}
.comments {
  background-color: white;
}
</style>
