<template>
  <div class="forget">
    <headers title="找回密碼" back v-show="tabshow"></headers>
    <div class="user-import" v-if="changeShow == 0">
      <div class="user-account" :class="{'active':verifyemail == 'fail','pitchon':highlight=='email'}">
        <span class="left">
          <input type="text" placeholder="請輸入您的電郵地址" v-model="userforget.useremail" @focus="highlight='email',verifyemail='initial'" @blur="verifyEmail(userforget.useremail)" @keyup="verifyEmail(userforget.useremail)">
        </span>
        <span class="right" v-show="verifyemail == 'pass'">
          <van-icon name="passed" class="passed" color="#2BD771" />
        </span>
      </div>
      <span class="marked-email" v-show="verifyemail == 'fail'">{{emailtips}}</span>
      <div class="verification-code" :class="{'active':verifycode == 'fail','pitchon':highlight=='code'}">
        <span class="left">
          <input type="text" placeholder="請輸入驗證碼" v-model="userforget.code" @focus="highlight='code',verifycode='initial'" @blur="verifyCode(userforget.code)" @keyup="verifyCode(userforget.code)">
        </span>
        <span class="right">
          <van-icon name="close" class="close" v-if="userforget.code != ''" @click="userforget.code = '', verifycode = 'initial'" />
          <span class="getcode" @click="getVerificationCode">{{codetext}}</span>
        </span>
      </div>
      <span class="marked-code" v-show="verifycode == 'fail'">{{codetips}}</span>
      <div class="verification-picture">
        <span class="code" :class="{'active':verifypicture == 'fail','pitchon':highlight=='picture'}">
          <input type="text" placeholder="請輸入驗證碼" v-model="userforget.picture" @focus="highlight='picture',verifypicture='initial'" @blur="verifyPicture(userforget.picture)" @keyup="verifyPicture(userforget.picture)">
        </span>
        <span class="verification-img"></span>
      </div>
      <span class="marked-picture" v-show="verifypicture == 'fail'">{{picturetips}}</span>
      <div class="confirm-btn" @click="">確定</div>
    </div>
    <div class="user-import-two" v-if="changeShow == 1">
      <div class="change-account" :class="{'active':targetemail == 'fail','pitchon':highlight=='emails'}">
        <span class="left">
          <input :type="passwordState" placeholder="請設置6-32位密碼" v-model="userforget.otheremail" @focus="highlight='emails',targetemail='initial'" @blur="targetPassword(userforget.otheremail)" @keyup="targetPassword(userforget.otheremail)">
        </span>
        <span class="right">
          <van-icon name="password-view" class="password-view" @click="passwordState = 'password'" v-show="passwordState == 'text'" />
          <van-icon name="password-not-view" class="password-not-view" @click="passwordState = 'text'" v-show="passwordState == 'password'" />
        </span>
      </div>
      <span class="marked-email" v-show="targetemail == 'fail'">{{emailstips}}</span>
      <div class="confirm-btn-new" @click="">登入</div>
    </div>
  </div>
</template>
<script>
import headers from "@/components/header";
import { Icon } from "vant";
export default {
  name: "userforget",
  created() {},
  mounted() {
    // window.onresize监听页面高度的变化
    window.onresize = () => {
      return (() => {
        this.showHeight = document.documentElement.clientHeight;
      })();
    };
  },
  data() {
    return {
      //控制頁面元素切換
      changeShow: 0,
      //用戶註冊信息
      userforget: {
        //帳號
        useremail: "",
        //其他賬號
        otheremail: "",
        //驗證碼
        code: "",
        //驗證圖片
        picture: ""
      },
      //密碼框輸入狀態
      passwordState: "text",
      //驗證碼
      verificationcode: "tage",
      //控制底部元素隱藏
      tabshow: true,
      //默认屏幕高度
      docmHeight: document.documentElement.clientHeight,
      //实时屏幕高度
      showHeight: document.documentElement.clientHeight,
      //郵箱格式驗證
      verifyemail: "initial",
      //其他郵箱格式驗證
      targetemail: "initial",
      //密碼格式驗證
      verifycode: "initial",
      //驗證碼圖片格式驗證
      verifypicture: "initial",
      //激活input高亮
      highlight: "",
      //郵箱提示語
      emailtips: "",
      //其他郵箱提示語
      emailstips: "",
      //密碼提示語
      codetips: "",
      //驗證碼提示語
      picturetips: "",
      //驗證碼文本內容
      codetext: "獲取驗證碼",
      //驗證碼定時器
      codeTimer: false,
      //倒計時時間
      countdown: 60
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
      if (this.verifyemail == "pass" && this.verifycode == "pass") {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    verifyEmail(str) {
      //郵箱正則
      let rexp = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (str == "") {
        this.verifyemail = "fail";
        this.emailtips = "郵箱不能為空";
        return;
      }
      if (rexp.test(str)) {
        this.verifyemail = "pass";
      } else {
        this.verifyemail = "fail";
        this.emailtips = "無效的郵箱";
      }
    },
    targetPassword(str) {
      //郵箱正則
      let rexp = /^[\w_-]{6,16}$/;
      if (str == "") {
        this.targetemail = "fail";
        this.emailstips = "新密碼不能為空";
        return;
      }
      if (rexp.test(str)) {
        this.targetemail = "pass";
      } else {
        this.targetemail = "fail";
        this.emailstips = "無效的密碼";
      }
    },
    verifyCode(str) {
      //判斷驗證碼
      if (str == "") {
        this.verifycode = "fail";
        this.codetips = "驗證碼不能為空";
        return;
      }
      if (str === this.verificationcode) {
        this.verifycode = "pass";
      } else {
        this.verifycode = "fail";
        this.codetips = "無效的驗證碼";
      }
    },
    verifyPicture(str) {
      //判斷圖片驗證碼
      if (str == "") {
        this.verifypicture = "fail";
        this.picturetips = "驗證碼不能為空";
        return;
      }
      if (str === this.verificationcode) {
        this.verifypicture = "pass";
      } else {
        this.verifypicture = "fail";
        this.picturetips = "無效的驗證碼";
      }
    },
    getVerificationCode() {
      if (this.codetext != "獲取驗證碼") {
        return;
      }
      if (this.codeTimer) {
        window.clearInterval(this.codeTimer);
      }
      this.codeTimer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
          this.codetext = this.countdown;
        } else {
          window.clearInterval(this.codeTimer);
          this.countdown = 60;
          this.codetext = "獲取驗證碼";
        }
      }, 1000);
    }
  },
  components: {
    headers
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/mixin.scss";
.forget {
  height: 100%;
  min-height: 100%;
  padding: 0 15px;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;

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

        .getcode {
          color: #999999;
          font-size: 12px;
          border: 1px solid #e0e0e0;
          padding: 6px 10px;
        }
        .passed {
          font-size: 20px;
        }

        .close {
          font-size: 14px;
        }
      }
    }

    .verification-picture {
      border: 0;
      height: 46px;
      padding: 0;
      display: -webkit-flex;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 15px;

      .code {
        width: 193px;
        height: 46px;
        border: 1px solid #e9e9e9;
        padding: 0 10px;
        display: -webkit-inline-flex;
        display: flex;
        align-items: center;

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

      .verification-img {
        width: 135px;
        height: 46px;
        background-color: #00b0ff;
      }

      .active {
        border-bottom: 1px solid #fd4f57;
      }

      .pitchon {
        border-left: 4px solid #00b0ff;
      }
    }

    .user-account {
      margin-top: 20px;
    }

    .verification-code {
      margin-top: 14px;
    }

    .confirm-btn {
      height: 50px;
      padding: 0px;
      margin-top: 30px;
      background-color: #c8c8c8;
      color: #fff;
      border-radius: 5px;
      @include flex-center;
      @include fz(16px);
      font-weight: 700;
      border: 0;
    }

    .marked-email {
      color: #fd4f57;
      @include fz(10px);
    }

    .marked-code {
      color: #fd4f57;
      @include fz(10px);
    }

    .marked-picture {
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

  .user-import-two {
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

        .getcode {
          color: #999999;
          font-size: 12px;
          border: 1px solid #e0e0e0;
          padding: 6px 10px;
        }
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

    .change-account {
      margin-top: 20px;
    }

    .marked-email {
      color: #fd4f57;
      @include fz(10px);
    }

    .active {
      border-bottom: 1px solid #fd4f57;
    }

    .pitchon {
      border-left: 4px solid #00b0ff;
    }

    .confirm-btn-new {
      height: 50px;
      padding: 0px;
      margin-top: 30px;
      background-color: #c8c8c8;
      color: #fff;
      border-radius: 5px;
      @include flex-center;
      @include fz(16px);
      font-weight: 700;
      border: 0;
    }
  }
}
</style>
