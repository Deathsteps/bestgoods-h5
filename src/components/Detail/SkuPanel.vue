<template lang="html">
  <popup :value="displayed" @input="handleInput" height="75%">
    <div class="sku-panel">
      <span class="vux-close" @click="handleInput(false)"></span>
      <div class="header">
        <div class="img">
          <img :src="selectedSku.imgUrl | picUrl" alt="">
        </div>
        <div class="info">
          <span class="price">￥{{ selectedSku.retailPrice }}</span>
          <p>
            库存：{{ selectedSku.sellVolume }}
            <br/>
            已选择：{{ selectedSku.specText }}
          </p>
        </div>
      </div>
      <div class="body">
        <div class="group"
          v-for="(spec, index) in specList"
          :key="spec.name">
          <label>{{spec.name}}</label>
          <div class="item-list">
            <span
              v-for="item in spec.skuSpecValueList"
              :class="selectedSpecs[index] === item.id ? 'item selected' : 'item'"
              :key="item.id"
              @click="selectSpec(index, item.id)">
              {{item.value}}
            </span>
          </div>
        </div>
        <div class="group">
          <label>数量</label>
          <x-number align="left" v-model="count" :min="1"></x-number>
        </div>
      </div>
      <div class="submit" @click="handleSubmit">
        确定
      </div>
    </div>
  </popup>
  </div>
</template>

<script>
import { Popup, XNumber } from 'vux'

export default {
  name: 'sku-panel',
  components: {
    Popup,
    XNumber
  },
  props: {
    displayed: {
      type: Boolean,
      default: false
    },
    defaultPic: String,
    specList: Array, // required
    skuMap: Object // required
  },
  data () {
    return {
      selectedSpecs: this.specList.map(spec => spec.skuSpecValueList[0].id),
      count: 1
    }
  },
  computed: {
    selectedSku () {
      let key = this.selectedSpecs.join(';')
      let sku = this.skuMap[key]
      let specText =
        sku.itemSkuSpecValueList
          .map(spec => spec.skuSpecValue.value)
          .join(' ')
      return {
        retailPrice: sku.retailPrice,
        sellVolume: sku.sellVolume,
        imgUrl: sku.itemSkuSpecValueList[0].skuSpecValue.picUrl || this.defaultPic,
        specText
      }
    }
  },
  methods: {
    handleInput (displayed) {
      if (!displayed) {
        this.$emit('hide')
      }
    },
    selectSpec (specIndex, specId) {
      let newSelected = [...this.selectedSpecs]
      newSelected[specIndex] = specId
      this.selectedSpecs = newSelected
    },
    handleSubmit () {
      this.$emit('submit', {
        selectedSpecs: this.selectedSpecs,
        retailPrice: this.selectedSku.retailPrice,
        imgUrl: this.selectedSku.imgUrl,
        specText: this.selectedSku.specText,
        count: this.count
      })
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/close.less';

.sku-panel {
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  position: relative;

  .vux-close {
    position: absolute;
    top: 10px;
    right: 15px;
  }

  .header {
    display: flex;
    padding: 10px 15px;

    .img {
      width: 80px;
      height: 80px;
      background-color: #f4f4f4;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .info {
      padding-left: 15px;
      p {
        font-size: 14em / 16;
        padding-left: 3px;
      }
    }
    .price {
      color: @theme-color;
      font-size: 20em / 16;
    }
  }

  .body {
    flex: 1;
    overflow-y: scroll;
  }
  .group {
    border-top: 1px solid #ddd;
    padding: 10px 0;
    margin: 10px 15px;
  }
  .group .weui-cell {
    padding-left: 0;
  }
  .group .weui-cell::before {
    border: none;
  }

  .item-list {
    span {
      display: inline-block;
      font-size: 12em / 16;
      color: #333;
      padding: 3px 10px;
      border-radius: 3px;
      border: 1px solid #666;
      margin: 8px 15px;
      margin-left: 0;
    }
    .selected {
      color: @theme-color;
      border: 1px solid @theme-color
    }
  }

  .submit {
    width: 100%;
    height: 46px;
    line-height: 46px;
    text-align: center;
    background-color: lighten(@theme-color, 10%);
    color: white;
    font-size: 1em;
  }
}
</style>
