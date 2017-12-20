<template lang="html">
  <div class="list-top-categories" ref="wrapper">
    <tab :animate="false" v-if="categories" class="tab-wrapper">
      <tab-item
        v-for="item in categories"
        :key="item.id"
        :selected="item.id === selected"
        @on-item-click="gotoList(item.id)">
        {{ item.name }}
      </tab-item>
    </tab>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions } from 'vuex'
import { Tab, TabItem } from 'vux'

export default {
  name: 'top-categories',
  components: {
    Tab,
    TabItem
  },
  data () {
    return {
      selected: 0
    }
  },
  computed: {
    categories () {
      // 要确保categories有值后再进行scroll操作
      Vue.nextTick(() => {
        if (this.categories) {
          // 本来是要根据这个scrollWidth与页面宽度算出来的，这里省了
          // this.$refs.wrapper.scrollWidth
          for (let i = 0; i < this.categories.length; i++) {
            if (this.categories[i].id === this.selected) {
              this.$refs.wrapper.scrollLeft = i * 25
              break
            }
          }
        }
      })
      return this.$store.state.home.categories
    }
  },
  beforeMount () {
    if (!this.categories) {
      this.fetchCategories()
    }
    this.selected = +this.$router.currentRoute.query.categoryId
  },
  methods: {
    gotoList (cateId) {
      // 用户在点击返回时，是想回到前页
      // 所以这里应该是replace当前history
      this.$router.replace('/list?categoryId=' + cateId)
      this.$emit('item-click', cateId)
    },
    ...mapActions(['fetchCategories'])
  }
}
</script>

<style lang="less">
.list-top-categories {
  width: 100%;
  overflow-x:scroll;
  -webkit-overflow-scrolling: touch;

  .tab-wrapper {
    width: 520px;
    border-bottom: 1px solid #eee;
  }

  @media screen and (min-width: 520px) {
    .tab-wrapper {
      width: 100%;
    }
  }
}
// 隐藏滚轮
.list-top-categories::-webkit-scrollbar {
  display: none;
}
</style>
