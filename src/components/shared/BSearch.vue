<template lang="html">
  <div :style="'height: ' + this.wrapperHeight" ref="wrapper">
    <search
      @result-click="handleResultClick"
      :results="results"
      v-model="value"
      @on-submit="handleSubmit">
    </search>
  </div>
</template>

<script>
import { Search } from 'vux'

export default {
  name: 'b-search',
  components: {
    Search
  },
  data () {
    let results = ['居家', '餐厨', '配件', '服装', '电器', '洗护', '杂货', '饮食', '婴童'].map(item => ({ title: item }))
    return {
      results,
      value: '',
      // 当Search position => fixed的时候，页面不会突然滚动
      wrapperHeight: 'auto'
    }
  },
  methods: {
    handleResultClick (item) {
      this.value = item.title
      this.handleSubmit()
    },
    handleSubmit () {
      alert(this.value)
    }
  },
  mounted () {
    this.wrapperHeight = this.$refs.wrapper.offsetHeight + 'px'
  }
}
</script>

<style lang="less">
</style>
