<template lang="html">
  <div class="">
    <b-search></b-search>
    <tab :animate="false">
      <tab-item selected @on-item-click="handleCategoryClick">居家</tab-item>
      <tab-item @on-item-click="handleCategoryClick">服饰</tab-item>
      <tab-item @on-item-click="handleCategoryClick">配件</tab-item>
      <tab-item @on-item-click="handleCategoryClick">杂货</tab-item>
    </tab>
    <div class="filter">
      <tab :animate="false" class="filter-sort" :line-width="0">
        <tab-item selected @on-item-click="handleCategoryClick">默认排序</tab-item>
        <tab-item @on-item-click="handleCategoryClick">价格排序</tab-item>
        <tab-item @on-item-click="handleCategoryClick">上架时间</tab-item>
      </tab>
      <div class="filter-btn">筛选</div>
    </div>
    <div class="product-list" v-if="products">
      <list-item v-for="item in products" :product="item" :key="item.id"></list-item>
    </div>
  </div>
</template>

<script>
import { fetchHotSale } from '../api.js'
import { Tab, TabItem } from 'vux'
import BSearch from '@/components/shared/BSearch'
import ListItem from '@/components/shared/ListItem'

export default {
  name: 'list-view',
  components: {
    Tab,
    TabItem,
    BSearch,
    ListItem
  },
  data () {
    return {
      products: null
    }
  },
  beforeMount () {
    // TODO: check data existence in fetchHomeProducts
    if (!this.products) {
      fetchHotSale((err, data) => {
        if (err) {
          alert(err.message)
        }
        this.products = data
      })
    }
  },
  methods: {
    handleCategoryClick () {
    }
  }
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/1px.less';

.product-list {
  margin: 10px auto;
  background-color: white;
  height: 100%;
  width: 100%;
}

.filter {
  display: flex;
  background-color: white;
}
.filter-sort {
  flex: 1
}
.filter-sort .vux-tab-item {
  position: relative;
  .vux-1px-r;
}
.filter-sort .vux-tab-item:after {
  height: 16px;
  top: (44px - 16px) / 2;
}
.filter-btn {
  font-size: 14px;
  text-align: center;
  line-height: 44px;
  width: 25%;
}
</style>
