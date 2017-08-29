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
        <sorter @sort="sortList"></sorter>
        <div class="filter-btn" @click="showFilter">筛选</div>
      </div>
    </div>

    <loading v-show="fetching || !products" style="margin-top: 180px;"></loading>

    <div class="product-list" v-if="products">
      <list-item v-for="item in products" :product="item" :key="item.id"></list-item>
    </div>
  </view-box>
</template>

<script>
import { ViewBox, XHeader } from 'vux'
import BSearch from '@/components/shared/BSearch'
import Loading from '@/components/shared/Loading'
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
    BSearch,
    Loading,
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
  beforeMount () {
    let categoryId = +this.$router.currentRoute.query.categoryId
    this.gotoList(categoryId)
  },
  methods: {
    ...mapActions(['gotoList', 'showFilter', 'filterList', 'sortList']),
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
