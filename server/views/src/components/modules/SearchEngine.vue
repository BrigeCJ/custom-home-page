<template>
  <h1>这是搜索引擎页面</h1>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'SearchEngine',
  methods: {
    ...mapMutations([
      'CURRENT_SIDEBAR_NAV_INDEX'
    ]),
    init () {
      this.CURRENT_SIDEBAR_NAV_INDEX(1)
    }
  },
  created () {
    this.init()
  }
}
</script>

<style>
</style>
