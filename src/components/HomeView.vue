<template lang="html">
  <view-box>
    <div class="view home-view">
      <b-search></b-search>
      <swiper :list="ads" :show-desc-mask="false" height="140px"></swiper>
      <div class="categories" v-if="categories">
        <grid :rows="4">
          <grid-item
            :label="item.name" v-for="item in categories"
            :key="item.id"
            @on-item-click="gotoList(item.id)">
            <img slot="icon" :src="item.iconUrl | picUrl">
          </grid-item>
        </grid>
      </div>
      <div class="hot-sale" v-if="hots">
        <h3 class="hot-head">热卖好货</h3>
        <list-item v-for="item in hots" :product="item" :key="item.id"></list-item>
      </div>
    </div>
    <b-tabbar slot="bottom"></b-tabbar>
  </view-box>
</template>

<script>
import { mapActions } from 'vuex'
import { ViewBox, Swiper, Grid, GridItem } from 'vux'
import BSearch from '@/components/shared/BSearch'
import BTabbar from '@/components/shared/BTabbar'
import ListItem from '@/components/shared/ListItem'

export default {
  name: 'home-view',
  components: {
    ViewBox,
    Swiper,
    Grid,
    GridItem,
    BSearch,
    BTabbar,
    ListItem
  },
  data () {
    return this.$store.state.home
  },
  beforeMount () {
    if (!this.categories) {
      this.fetchCategories()
    }
    if (!this.hots) {
      this.fetchHots()
    }
  },
  methods: {
    gotoList (cateId) {
      this.$router.push('/list?categoryId=' + cateId)
    },
    ...mapActions(['fetchCategories', 'fetchHots'])
  }
}
</script>

<style lang="less">
.home-view {
  margin-top: 0;
}
.categories {
  background-color: white;
}

.hot-sale {
  margin: 10px auto;
  background-color: white;
  height: 100%;
  width: 100%;
}
.hot-head {
  font-size: 1em;
  padding: 10px;
  margin: 0;
  border-bottom: 1px solid @border-color;
}
</style>
