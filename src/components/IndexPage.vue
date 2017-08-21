<template lang="html">
  <div class="">
    <h1>This is IndexPage</h1>
  </div>
</template>

<script>
import { fetchTopCategories, fetchHotSale } from '../api.js'

export default {
  name: 'Index',
  data () {
    return {
      categories: null
    }
  },
  beforeMount () {
    // TODO: check data existence in fetchHomeProducts
    if (!this.categories) {
      fetchTopCategories()
      fetchHotSale()
    }
  }
}
</script>

<style lang="less">
</style>
