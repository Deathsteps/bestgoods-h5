<template lang="html">
  <div class="">
    <div class="tag-list">
      <span class="active">全部(999+)</span>
      <span>有图(590)</span>
      <span>追评(59)</span>
      <span>很舒服(422)</span>
      <span>质量好(999+)</span>
      <span>性价比高(999+)</span>
    </div>
    <div class="comments">
      <comment-item></comment-item>
      <comment-item></comment-item>
      <comment-item></comment-item>
    </div>
  </div>
</template>

<script>
import CommentItem from '@/components/Comments/CommentItem'

export default {
  name: 'comments-view',
  components: {
    CommentItem
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
