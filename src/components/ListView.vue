<template lang="html">
  <view-box body-padding-bottom="0">
    <div class="list-head" slot="header">
      <x-header>Best Goods</x-header>
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
    </div>
    <div class="product-list" v-if="products">
      <list-item v-for="item in products" :product="item" :key="item.id"></list-item>
    </div>
  </view-box>
</template>

<script>
import { Tab, TabItem, ViewBox, XHeader } from 'vux'
import BSearch from '@/components/shared/BSearch'
import ListItem from '@/components/shared/ListItem'
import { getHotSale } from '../store/api.js'

export default {
  name: 'list-view',
  components: {
    ViewBox,
    XHeader,
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
      getHotSale((err, data) => {
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

.list-head {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 100;
}

.product-list {
  background-color: white;
  width: 100%;
  margin-top: 179px;
}

.filter {
  display: flex;
  background-color: white;
  border-bottom: 1px solid #eee;
}
.filter-sort {
  flex: 1
}
.filter-sort .vux-tab-item {
  .vux-1px-r;
  position: relative;
  background: none;
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
