<template lang="html">
  <view-box>
    <div class="view home-view">
      <b-search></b-search>
      <swiper :list="ads" :show-desc-mask="false"></swiper>
      <div class="categories" v-if="categories">
        <grid :rows="4">
          <grid-item
            :label="item.name" v-for="item in categories"
            :key="item.id"
            @on-item-click="handleItemClick">
            <img slot="icon" :src="'/static/' + item.iconUrl">
          </grid-item>
        </grid>
      </div>
      <div class="hot-sale" v-if="hotSale">
        <h3 class="hot-head">热卖好货</h3>
        <list-item v-for="item in hotSale" :product="item" :key="item.id"></list-item>
      </div>
    </div>
    <b-tabbar slot="bottom"></b-tabbar>
  </view-box>
</template>

<script>
import { fetchTopCategories, fetchHotSale } from '../api.js'
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
    return {
      categories: null,
      hotSale: null,
      ads: [{
        url: 'javascript:',
        img: '/static/imgs/6e412cf16f64c54d76ce617f9f4f8f10.jpg'
      }, {
        url: 'javascript:',
        img: '/static/imgs/f1680a724b280c5abf9b2c89229d82c7.jpg'
      }, {
        url: 'javascript:',
        img: '/static/imgs/80b2663468434183b2e2a686327a4cf4.jpg'
      }, {
        url: 'javascript:',
        img: '/static/imgs/382e26b92c149b49363ad16a8ee4f97e.jpg'
      }]
    }
  },
  beforeMount () {
    // TODO: check data existence in fetchHomeProducts
    if (!this.categories) {
      fetchTopCategories((err, data) => {
        if (err) {
          alert(err.message)
        }
        this.categories = data
      })
      fetchHotSale((err, data) => {
        if (err) {
          alert(err.message)
        }
        this.hotSale = data
      })
    }
  },
  methods: {
    handleItemClick () {
      this.$router.push('list')
    }
  }
}
</script>

<style lang="less">
.home-view {
  margin-top: 0;
}
.home-view .vux-slider {
  height: 120px;
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
  border-bottom: 1px solid #ccc;
}
</style>
