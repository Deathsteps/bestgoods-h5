<template lang="html">
  <tab :animate="false" class="filter-sort" :line-width="0">
    <tab-item :selected="!sortKey" @on-item-click="sort()">默认排序</tab-item>
    <tab-item :selected="sortKey === 'retailPrice'" @on-item-click="sort('price')">
      <div class="sort-item price-sort">
        价格排序
        <i :class="'iconfont icon-triangleupfill' + (priceOrder === -1 ? ' unselected' : '' )"></i>
        <i :class="'iconfont icon-triangledownfill' + (priceOrder === 1 ? ' unselected' : '' )"></i>
      </div>
    </tab-item>
    <tab-item :selected="sortKey === 'onSaleTime'" @on-item-click="sort('date')">
      <div class="sort-item">
        上架时间
        <i class="iconfont icon-triangledownfill"></i>
      </div>
    </tab-item>
  </tab>
</template>

<script>
import { Tab, TabItem } from 'vux'

export default {
  name: 'sorter',
  props: {
    sortKey: String
  },
  data () {
    return {
      priceOrder: 0 // -1 降序 1 升序
    }
  },
  watch: {
    sortKey: function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.priceOrder = 0
      }
    }
  },
  components: {
    Tab,
    TabItem
  },
  methods: {
    sort (type) {
      if (type === 'price') {
        if (this.priceOrder === 0) {
          this.priceOrder = 1
        } else if (this.priceOrder === 1) {
          this.priceOrder = -1
        } else { // priceOrder = -1
          this.priceOrder = 1
        }
      } else {
        this.priceOrder = 0
      }

      let sortQuery = {}
      if (type === 'price') {
        sortQuery.sortKey = 'retailPrice'
        sortQuery.sortValue = this.priceOrder
      } else if (type === 'date') {
        sortQuery.sortKey = 'onSaleTime'
        sortQuery.sortValue = -1
      } else { // 默认
        sortQuery.sortKey = ''
        sortQuery.sortValue = 0
      }
      this.$emit('sort', sortQuery)
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';

.filter-sort {
  flex: 1;

  .sort-item {
    position: relative;
  }
  .iconfont {
    font-size: 12px;
    position: absolute;
    transform: scale(.8,.8);
  }
  .price-sort {
    .icon-triangleupfill {
      top: -2px
    }
    .icon-triangledownfill {
      top: 3px
    }
  }
  .iconfont.unselected {
    color: #666;
  }
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
</style>
