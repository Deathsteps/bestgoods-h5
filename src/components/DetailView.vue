<template lang="html">
<view-box>
  <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
    商品详情
    <cart-link slot="right" :count="shopcartCount"></cart-link>
  </x-header>
  <div class="view">
    <div class="detail-img">
      <swiper v-if="pics"
        :aspect-ratio="0.8"
        :auto="true"
        :list="pics"
        :show-desc-mask="false">
      </swiper>
    </div>

    <div class="detail-desc" v-if="product">
      <div class="detail-info">
        <h2>{{product.name}}</h2>
        <p>{{product.simpleDesc}}</p>
        <span class="detail-price">￥{{product.retailPrice}}</span>
        <div class="detail-tags">
          <span v-for="tag in product.tagList">{{tag.tagName}}</span>
        </div>
      </div>
      <div class="detail-comment">
        <span class="comment-count">
          {{product.commentCount > 999 ? '999+' : product.commentCount}}
        </span>
        <span>用户评价</span>
        <router-link
          tag="button"
          to="/comments"
          type="button">
          查看
        </router-link>
      </div>
    </div>

    <!-- padding的百分比按父级的width来算 -->
    <div style="width: 80px; margin: 0 auto;" v-if="!product">
      <b-loading></b-loading>
    </div>

    <div class="detail-action" v-if="product">
      <group>
        <cell title="请选择规格数量" is-link @click.native="showSkuPanel(true)"></cell>
        <cell-box is-link>
          <div class="policy-wrapper">
            <span>服务: </span>
            <ul>
              <li v-for="policy in product.policyList">{{ policy.title }}</li>
            </ul>
          </div>
        </cell-box>
      </group>
    </div>

    <div class="detail-data" v-if="product">
      <div class="detail-tabs">
        <div class="tab active">基本信息</div>
        <div class="tab">商品详情</div>
        <router-link
          tag="div"
          to="/comments"
          class="tab tab-last">
          用户评价
        </router-link>
      </div>
      <div class="detail-attributes">
        <h4>商品参数</h4>
        <div class="attr" v-for="attr in product.attrList">
          <span class="title">{{attr.attrName}}</span>
          <span class="value">{{attr.attrValue}}</span>
        </div>
      </div>
    </div>
  </div>

  <sku-panel
    v-if="skuPanelDisplayed"
    :defaultPic="product.primaryPicUrl"
    :specList="product.skuSpecList"
    :skuMap="product.skuMap"
    :displayed="skuPanelDisplayed"
    @hide="showSkuPanel(false)"
    @submit="add2Shopcart">
  </sku-panel>

  <tabbar class="detail-tabbar">
     <tabbar-item class="detail-collect">
       <i slot="icon" class="iconfont icon-favor"></i>
     </tabbar-item>
     <tabbar-item class="detail-add-cart" @on-item-click="showSkuPanel(true)">
       <span slot="label">加入购物车</span>
     </tabbar-item>
     <tabbar-item class="detail-buy" @on-item-click="showSkuPanel(true)">
       <span slot="label">立即购买</span>
     </tabbar-item>
   </tabbar>
 </view-box>
</template>

<script>
import { ViewBox, Swiper, Group, Cell, CellBox, Tabbar, TabbarItem, XHeader } from 'vux'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import BLoading from '@/components/shared/BLoading'
import SkuPanel from '@/components/Detail/SkuPanel'
import CartLink from '@/components/Detail/CartLink'

export default {
  name: 'detail-view',
  components: {
    ViewBox,
    Swiper,
    Group,
    Cell,
    CellBox,
    XHeader,
    Tabbar,
    TabbarItem,
    BLoading,
    SkuPanel,
    CartLink
  },
  data () {
    return this.$store.state.detail
  },
  computed: {
    ...mapGetters(['pics'])
  },
  beforeMount () {
    let id = +this.$route.params.id
    this.fetchProduct(id)
  },
  methods: {
    ...mapMutations(['showSkuPanel', 'add2Shopcart']),
    ...mapActions(['fetchProduct'])
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';

.detail-img {
  width: 100%;
  min-height: 300px;
  background-color: gray;
}

.detail-desc {
  width: 100%;
  display: flex;
  padding: 18px;
  background-color: white;
}

.detail-info {
  width: 70%;
  border-right: 1px dashed #ccc;

  h2 {
    font-size: 18em / 16;
    font-weight: normal;
  }
  p {
    font-size: 14em / 16;
    color: @desc-text;
  }
}

.detail-comment {
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  span, button {
    display: block;
    font-size: 12em / 16;
    vertical-align: middle;
  }

  button {
    padding: 2px 10px;
    border-radius: 2px;
    background-color: white;
    border: 1px solid #666;
  }

  .comment-count {
    color: @theme-color;
    font-size: 20em / 16;
  }
}

.detail-price {
  color: @theme-color;
  font-size: 24em / 16;
  font-weight: bold;
  font-family: PingFangSC-Light,helvetica,'Heiti SC';
}

.detail-tags {
  span {
    font-size: 12em / 16;
    color: @tag-color;
    padding: 3px 10px;
    border-radius: 3px;
    border: 1px solid @tag-color
  }
}

.detail-action .policy-wrapper {
  display: flex;
  width: 100%;
  align-items: flex-start;

  ul {
    flex: 1;
    padding-left: 20px;

    li {
      display: inline-block;
      margin: 0 20px 5px 0;
      list-style: none;
    }
    li::before {
      content: "• ";
      color: red;
    }
  }
}

.detail-data {
  width: 100%;
  margin-top: 20px;
  background-color: white;
}

.detail-tabs {
  display: flex;

  .tab {
    .vux-1px-r;
    flex: 1;
    height: 48px;
    line-height: 48px;
    text-align: center;
  }
  .tab.active {
    border-top: 3px solid @theme-color;
  }
}

.detail-tabs .tab:after {
  height: 18px;
  top: (48px - 18px) / 2;
}
.detail-tabs .tab-last:after {
  border: none;
}

.detail-attributes {
  padding: 5px 15px 20px;

  h4 {
    font-weight: normal;
    margin: 10px 0;
  }
  .attr {
    width: 100%;
    border-top: 1px dashed #ccc;
    margin-top: 5px;
    padding-top: 5px;
    display: flex;
    align-items: flex-start;

    span {
      display: inline-block;
    }
  }
  .title {
    width: 20%;
  }
  .value {
    flex: 1;
    padding-left: 3px;
  }
}

.detail-collect {
  width: 52px;
  flex: none;
  .vux-1px-r;
  i {
    color: #333;
  }
}
.detail-add-cart span {
  color: #333;
  font-size: 1em;
}
.detail-buy {
  background-color: lighten(@theme-color, 10%);

  span {
    color: white;
    font-size: 1em;
  }
}

</style>
