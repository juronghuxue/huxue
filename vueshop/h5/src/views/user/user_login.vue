<template>
  <div class="login">
    <headers title="登入" close></headers>
    <div class="user-import">
      <div class="user-account" :class="{'active':verifyemail == 'fail','pitchon':highlight=='email'}">
        <span class="left">
          <van-icon name="contact" class="contact" />
          <input type="text" placeholder="請輸入電郵地址" v-model="userlogin.useremail" @focus="highlight='email',verifyemail='initial'" @blur="verifyEmail(userlogin.useremail)" @keyup="verifyEmail(userlogin.useremail)">
        </span>
        <span class="right" v-show="verifyemail == 'pass'">
          <van-icon name="passed" class="passed" color="#2BD771" />
        </span>
      </div>
      <span class="marked-email" v-show="verifyemail == 'fail'">{{emailtips}}</span>
      <div class="user-password" :class="{'active':verifypassword == 'fail','pitchon':highlight=='password'}">
        <span class="left">
          <van-icon name="browsing-history" class="browsing-history" />
          <input :type="passwordState" placeholder="登錄密碼" v-model="userlogin.password" @focus="highlight='password',verifypassword='initial'" @blur="verifyPassword(userlogin.password)" @keyup="verifyPassword(userlogin.password)">
        </span>
        <span class="right">
          <van-icon name="close" class="close" v-if="userlogin.password != ''" @click="userlogin.password = '', verifypassword = 'initial'" />
          <van-icon name="password-view" class="password-view" @click="passwordState = 'password'" v-show="passwordState == 'text'" />
          <van-icon name="password-not-view" class="password-not-view" @click="passwordState = 'text'" v-show="passwordState == 'password'" />
        </span>
      </div>
      <span class="marked-password" v-show="verifypassword == 'fail'">{{passwordtips}}</span>
      <div class="enter-btn" :class="{'login-active': checkAccount}" @click="userCanLogin">登入</div>
    </div>
    <div class="user-other" v-show="tabshow">
      <span class="forget">忘記密碼?</span>
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
          <div class="create-account" @click="toRetrievePassword">
            <p>沒有賬號?
              <span>註冊</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import { postUserLogin } from "../../api/user/account.js";
import { Icon } from "vant";
import headers from "@/components/header";
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
        useremail: "",
        //密碼
        password: "",
      },
      //控制底部元素隱藏
      tabshow: true,
      //默认屏幕高度
      docmHeight: document.documentElement.clientHeight,
      //实时屏幕高度
      showHeight: document.documentElement.clientHeight,
      //郵箱格式驗證
      verifyemail: "initial",
      //密碼格式驗證
      verifypassword: "initial",
      //密碼框輸入狀態
      passwordState: "text",
      //激活input高亮
      highlight: "",
      //郵箱提示語
      emailtips: "",
      //密碼提示語
      passwordtips: "",
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
  computed: {
    checkAccount: function() {
      if(this.verifyemail=='pass'&&this.verifypassword=='pass'){
        return true
      }else {
        return false
      }
    }
  },
  methods: {
    postUserLogin,
    toRegister() {
      this.$router.push("/user/user-register");
    },
    toRetrieve() {
      this.$router.push("/user/retrieve-password");
    },
    verifyEmail(str) {
      //郵箱正則
      let rexp = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if(str == ''){
        this.verifyemail = "fail";
        this.emailtips = '賬號不能為空'
        return
      }
      if (rexp.test(str)) {
        this.verifyemail = "pass";
      } else {
        this.verifyemail = "fail";
        this.emailtips = '無效的賬號'
      }
    },
    verifyPassword(str) {
      console.log(str)
      //密碼正則
      let rexp = /^[\w_-]{6,16}$/;
       if(str == ''){
        this.verifypassword = "fail";
        this.passwordtips = '密碼不能為空'
        return
      }
      if (rexp.test(str)) {
        this.verifypassword = "pass";
      } else {
        this.verifypassword = "fail";
        this.passwordtips = '無效的密碼'
      }
    },
    //創建賬號
    toRetrievePassword() {
      this.$router.push('/user/retrieve-password')
    },
    //用戶登錄
    userCanLogin() {
      if(this.checkAccount){
        this.postUserLogin(this.userlogin)
      }else{
        console.log("填點什麼吧")
      }
    }

  },
  components: {
    headers,
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/mixin.scss";
.login {
  height: 100%;
  min-height: 100%;
  padding: 0 15px;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  .login-title {
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
    div {
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
          width: 220px;
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

        .password-not-view {
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

    .enter-btn {
      height: 50px;
      padding: 0px;
      margin-top: 27px;
      background-color: #c8c8c8;
      color: #fff;
      border-radius: 5px;
      @include flex-center;
      @include fz(16px);
      font-weight: 700;
      border: 0;
    }

    
      .login-active {
        background-color: #D4B56C;
      }

    .marked-email {
      color: #fd4f57;
      @include fz(10px);
    }

    .marked-password {
      color: #fd4f57;
      @include fz(10px);
    }

    .active {
      border-bottom: 1px solid #fd4f57;
    }

    .pitchon {
      border-left: 4px solid #00b0ff;
    }
  }

  .user-other {
    .forget {
      @include fz(15px);
      @include flex-center;
      border: 0;
      padding: 0px;
      margin-top: 31px;
    }

    .cut-off {
      height: auto;
      padding: 0;
      margin-top: 15px;
      border: 0;
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
}
</style>
