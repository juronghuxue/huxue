<template>
	<section style="min-height: 100%">
		<!-- <transition name="fade" mode="out-in"> -->
    <transition :name="transitionName">
			<router-view class="page-view app-main" :key="key"></router-view>
    </transition>
  </section>
</template>

<script>
  export default {
    name: 'AppMain',
    computed: {
      key () {
        return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
      }
    },
    created () {
    },
    data () {
      return {
        transitionName: 'slide-left'
      }
    },
    mounted () {
    },
    watch: {
      '$route' (to, from) {
        if (to.path === '/') {
          this.transitionName = 'slide-right'
        } else {
          this.transitionName = 'slide-left'
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .app-main {
    overflow: auto;
    box-sizing: border-box;
    /*padding-bottom: 1rem;*/
    top: 0;
    left: 0;
  }
</style>
