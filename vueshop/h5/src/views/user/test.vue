<template>
  <div class="login">
    <div class="login-title">
      <span class="title-close">X</span>
      <span class="title-enter">登入</span>
      <span></span>
    </div>
    <div class="user-import">
      <div class="user-account">
        <span class="left">
          <van-icon name="contact" class="contact" />
          <input type="text" placeholder="請輸入電郵地址">
        </span>
        <span class="right">
          <van-icon name="passed" class="passed" color="#2BD771" />
        </span>
      </div>
      <div class="user-password">
        <span class="left">
          <van-icon name="browsing-history" class="browsing-history" />
          <input type="password" placeholder="登錄密碼">
        </span>
        <span class="right">
          <van-icon name="close" class="close" />
          <van-icon name="password-view" class="password-view" />
        </span>
      </div>
    </div>
    <div class="enter-btn">
      <span>登入</span>
    </div>
    <div class="forget-password">
      <span>忘記密碼?</span>
    </div>
    <div class="cut-off">
      <span>或</span>
    </div>
    <div class="bottom-outter" v-show="tabshow">
      <div class="bottom-btn">
        <div class="facebook">
          <span>
            <van-icon name="alipay" class="alipay" />
            <p>使用 Facebook 賬號登入</p>
          </span>
        </div>
        <div class="create-account">
          <p>沒有賬號?
            <span>註冊</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { postUserLogin } from "../../api/user/account.js";
import { Icon } from "vant";
export default {
  name: "userlogin",
  created() {},
  mounted() {
    console.log(document.body.clientHeight);
    // window.onresize监听页面高度的变化
    window.onresize = () => {
      return (() => {
        this.showHeight = document.documentElement.clientHeight;
      })();
    };
  },
  data() {
    return {
      userlogin: {
        //帳號
        username: "",
        //密碼
        password: ""
      },
      //控制底部元素隱藏
      tabshow: true,
      //默认屏幕高度
      docmHeight: document.documentElement.clientHeight,
      //实时屏幕高度
      showHeight: document.documentElement.clientHeight
    };
  },
  watch: {
    showHeight: function() {
      if (this.docmHeight > this.showHeight) {
        this.tabshow = false;
      } else {
        this.tabshow = true;
      }
    }
  },
  computed: {},
  methods: {
    postUserLogin,
    toRegister() {
      this.$router.push("/user/user-register");
    },
    toRetrieve() {
      this.$router.push("/user/retrieve-password");
    }
  },
  components: {}
};
</script>
<style lang="scss" scoped>
@import "../../styles/mixin.scss";
.login {
  //   width: 100%;
  height: 100%;
  min-height: 100%;
  padding: 0 15px;
  //   padding-bottom: 12px;
  display: -webkit-flex;
  display: flex;
  .login-title {
    // width: 100%;
    height: 44px;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title-close {
      @include fz(14px);
      font-weight: 700;
      color: #333333;
    }

    .title-enter {
      @include fz(18px);
      color: #333333;
      font-family: PingFangSC-Medium;
      font-weight: 700;
    }
  }

  .user-import {
    // width: 100%;
    padding-bottom: 12px;
    div {
      //   width: 100%;
      height: 46px;
      padding: 0 10px;
      border: 1px solid #e9e9e9;
      display: -webkit-flex;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .left {
        display: -webkit-flex;
        display: flex;
        align-items: center;
        .contact {
          font-size: 16px;
          color: #333333;
        }

        .browsing-history {
          font-size: 16px;
          color: #333333;
        }

        input {
          width: 122px;
          margin-left: 11px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          display: -webkit-flex;
          display: flex;
          align-items: center;
        }
      }

      .right {
        display: -webkit-flex;
        display: flex;
        align-items: center;
        .passed {
          font-size: 20px;
        }

        .close {
          font-size: 14px;
        }

        .password-view {
          font-size: 18px;
          margin-left: 15px;
        }
      }
    }

    .user-account {
      margin-top: 20px;
    }

    .user-password {
      margin-top: 14px;
    }
  }

  .enter-btn {
    // width: 100%;
    height: 50px;
    color: #fff;
    background-color: #d4b56c;
    border-radius: 5px;
    @include flex-center;
    margin-top: 27px;

    span {
      font-size: 16px;
      font-weight: 600;
    }
  }

  .forget-password {
    // width: 100%;
    margin-top: 10px;
    @include flex-center;
    span {
      font-size: 15px;
      color: #333;
    }
  }

  .cut-off {
    margin-top: 10px;
    border-top: 1px solid #c8c8c8;
    position: relative;
    @include flex-center;

    span {
      width: 26px;
      position: absolute;
      background-color: #fff;
      @include flex-center;
      color: #c8c8c8;
    }
  }

  .bottom-outter {
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    .bottom-btn {
      width: 92%;

      .facebook {
        //   width: 100%;
        height: 50px;
        background-color: #3f5d94;
        color: #fff;
        border-radius: 5px;
        @include flex-center;

        span {
          @include flex-center;

          .alipay {
            font-size: 20px;
            margin-right: 20px;
          }

          p {
            font-size: 14px;
          }
        }
      }

      .create-account {
        //   width: 100%;
        height: 50px;
        background-color: #fff;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        margin-top: 20px;
        color: #333;
        border: 1px solid #e9e9e9;
        border-radius: 5px;
        @include flex-center;
        font-size: 15px;
        p {
          span {
            border-bottom: 1px solid #000;
            margin-left: 5px;
          }
        }
      }
    }
  }
}
</style>
