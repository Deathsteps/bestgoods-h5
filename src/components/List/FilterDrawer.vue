<template lang="html">
  <drawer
    v-show="displayed"
    placement="right"
    style="position: absolute; z-index: 200;"
    :drawer-style="{'background-color':'white', 'width': '230px'}"
    :show="displayed"
    @update:show="hideDrawer">
    <div slot="drawer" class="filter-drawer">
      <h5 class="title">
        商品分类：
      </h5>
      <div class="categories" v-if="categories">
        <a v-for="item in categories"
          :key="item.id"
          @click="handleClick(item.id)"
          :class="item.id === selected ? 'selected' : ''">
          {{ item.name }}
        </a>
      </div>
    </div>
  </drawer>
</template>

<script>
import { Drawer } from 'vux'

export default {
  name: 'filter-drawer',
  props: {
    displayed: {
      type: Boolean,
      default: false
    },
    categories: {
      type: Array
    }
  },
  data () {
    return {
      selected: 0
    }
  },
  components: {
    Drawer
  },
  methods: {
    hideDrawer () {
      this.$emit('hide')
    },
    handleClick (cateId) {
      this.selected = cateId
      this.$emit('item-click', cateId)
    }
  }
}
</script>

<style lang="less">
.filter-drawer {
  padding: 20px 15px;

  .title {
    font-size: 1em;
    font-weight: normal;
    padding: 15px 0;
    margin: 15px 0;
    border-bottom: 1px solid @border-color;
  }

  .categories {
    a{
      display: inline-block;
      font-size: 12em / 16;
      color: #666;
      padding: 3px 10px;
      border-radius: 6px;
      border: 1px solid #666;
      margin: 0 15px 15px 0;
    }
    .selected{
      color: @theme-color;
      border-color: @theme-color;
    }
  }
}
</style>
