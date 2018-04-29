<template>
  <h1>这是站点页面</h1>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Site',
  methods: {
    ...mapMutations([
      'CURRENT_SIDEBAR_NAV_INDEX'
    ]),
    init () {
      this.CURRENT_SIDEBAR_NAV_INDEX(0)
    }
  },
  created () {
    this.init()
  }
}
</script>

<style>
</style>
