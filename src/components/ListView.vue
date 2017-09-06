<template lang="html">
  <view-box body-padding-bottom="0">
    <filter-drawer
      :displayed="filterDrawerDisplayed"
      :categories="currentSubCategories"
      @hide="showFilterDrawer(false)"
      @item-click="filterList">
    </filter-drawer>

    <div class="list-head" slot="header">
      <x-header>Best Goods</x-header>
      <b-search></b-search>
      <top-categories @item-click="gotoList"></top-categories>
      <div class="filter">
        <sorter @sort="sortList" :sortKey="filter.sortKey"></sorter>
        <div class="filter-btn" @click="showFilter">筛选</div>
      </div>
    </div>

    <b-loading v-show="fetching || !products" style="margin-top: 180px;"></b-loading>

    <div class="product-list">
      <list-item v-for="item in products" :product="item" :key="item.id"></list-item>
      <load-more
        v-show="loadMoreDisplayed || noMoreProducts"
        :showLoading="loadMoreDisplayed"
        :tip="noMoreProducts ? '没有更多产品' : '加载中...'">
      </load-more>
    </div>
  </view-box>
</template>

<script>
import { ViewBox, XHeader, LoadMore, debounce } from 'vux'
import BSearch from '@/components/shared/BSearch'
import BLoading from '@/components/shared/BLoading'
import ListItem from '@/components/shared/ListItem'
import TopCategories from '@/components/List/TopCategories'
import FilterDrawer from '@/components/List/FilterDrawer'
import Sorter from '@/components/List/Sorter'
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'list-view',
  components: {
    ViewBox,
    XHeader,
    LoadMore,
    BSearch,
    BLoading,
    ListItem,
    TopCategories,
    FilterDrawer,
    Sorter
  },
  data () {
    return this.$store.state.list
  },
  computed: {
    ...mapGetters(['currentSubCategories'])
  },
  watch: {
    filter: function (newValue, oldValue) {
      if (newValue.sortKey !== oldValue.sortKey ||
        newValue.sortValue !== oldValue.sortValue ||
        newValue.categoryId !== oldValue.categoryId) {
        let doc = document.getElementById('vux_view_box_body')
        doc.scrollTop = 0
      }
    }
  },
  beforeMount () {
    let categoryId = +this.$router.currentRoute.query.categoryId
    this.gotoList(categoryId)
  },
  mounted () {
    let doc = document.getElementById('vux_view_box_body')
    this._viewScrollHandler = debounce(() => {
      let distance = doc.scrollHeight - doc.scrollTop - doc.offsetHeight
      if (distance <= 0 && !this.loadMoreDisplayed && !this.noMoreProducts) {
        this.loadMoreProducts()
      }
    }, 200)
    doc.addEventListener('scroll', this._viewScrollHandler)
  },
  beforeDestory () {
    let doc = document.getElementById('vux_view_box_body')
    doc.removeEventListener('scroll', this._viewScrollHandler)
  },
  methods: {
    ...mapActions(['gotoList', 'showFilter', 'filterList', 'sortList', 'loadMoreProducts']),
    ...mapMutations(['showFilterDrawer'])
  }
}
</script>

<style lang="less" scoped>
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

  .weui-loadmore {
    margin: 0 auto;
    padding: 1.5em 0;
  }
}

.filter {
  display: flex;
  background-color: white;
  border-bottom: 1px solid #eee;
}
.filter-btn {
  font-size: 14px;
  text-align: center;
  line-height: 44px;
  width: 25%;
}
</style>
