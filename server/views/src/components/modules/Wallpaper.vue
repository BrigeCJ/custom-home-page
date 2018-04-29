<template>
  <h1>这是壁纸</h1>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Wallpaper',
  methods: {
    ...mapMutations([
      'CURRENT_SIDEBAR_NAV_INDEX'
    ]),
    init () {
      this.CURRENT_SIDEBAR_NAV_INDEX(2)
    }
  },
  created () {
    this.init()
  }
}
</script>

<style></style>
