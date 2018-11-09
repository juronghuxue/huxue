<template>
  <div class="main-container">
    <app-main></app-main>
    <transition name="tabber" mode="">
      <tabber v-if="tabberShowSt"></tabber>
    </transition>
  </div>
</template>

<script>
import { AppMain, Tabber } from '@/views/layout'
export default {
  name: 'layout',
  components: {
    AppMain,
    Tabber
  },
  computed: {
    sidebar () {
      return this.$store.state.app.sidebar
    },
    tabberShowSt () {
      return this.$store.state.app.tabbarShowSt
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
