<template>
  <div id="app" class="app-view">
    <transition :name="transitionName">
      <router-view class="app-view"></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {
      transitionName: "slide-left"
    };
  },
  mounted() {},
  components: {},
  computed: {},
  methods: {},
  watch: {
    $route(to, from) {
      if (to.path === "/") {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "slide-left";
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">

body,
html {
  margin: 0;
  padding: 0;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, Arial, sans-serif;
  font-weight: 500;
}
#app {
  max-width: 600px;
}
.mint-toast {
  z-index: 3001;
}

.nick_box {
  width: 70%;
  .van-dialog__header {
    background-color: #000;
    color: #fff;
    padding: 0.1rem;
  }

  .van-dialog__content {
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    input {
      margin-top: 0.4rem;
      margin-bottom: 0.2rem;
      width: 80%;
      // height: 0.4rem;
      border: 0.01rem solid #e6e6e6;
    }
  }

  .van-hairline--top.van-dialog__footer.van-dialog__footer--buttons {
    .van-button.van-button--default.van-button--large.van-dialog__cancel {
      .van-button__text {
        color: 000;
        font-weight: bold;
      }
    }

    .van-button.van-button--default.van-button--large.van-dialog__confirm.van-hairline--left {
      .van-button__text {
        color: #000;
        font-weight: bold;
      }
    }
  }
}
</style>
