<template>
  <div class="register">
    <headers title="創建賬戶" back v-show="tabshow"></headers>
    <div class="user-import">
      <div class="user-account" :class="{'active':verifyemail == 'fail','pitchon':highlight=='email'}">
        <span class="left">
          <input type="text" placeholder="電郵地址*" v-model="userregister.useremail" @focus="highlight='email',verifyemail='initial'" @blur="verifyEmail(userregister.useremail)" @keyup="verifyEmail(userregister.useremail)">
        </span>
        <span class="right" v-show="verifyemail == 'pass'">
          <van-icon name="passed" class="passed" color="#2BD771" />
        </span>
      </div>
      <span class="marked-email" v-show="verifyemail == 'fail'">{{emailtips}}</span>
      <div class="user-password" :class="{'active':verifypassword == 'fail','pitchon':highlight=='password'}">
        <span class="left">
          <input :type="passwordState" placeholder="密碼*" v-model="userregister.password" @focus="highlight='password',verifypassword='initial'" @blur="verifyPassword(userregister.password)" @keyup="verifyPassword(userregister.password)">
        </span>
        <span class="right">
          <van-icon name="close" class="close" v-if="userregister.password != ''" @click="userregister.password = '', verifypassword = 'initial'" />
          <van-icon name="password-view" class="password-view" @click="passwordState = 'password'" v-show="passwordState == 'text'" />
          <van-icon name="password-not-view" class="password-not-view" @click="passwordState = 'text'" v-show="passwordState == 'password'" />
        </span>
      </div>
      <span class="marked-password" v-show="verifypassword == 'fail'">{{passwordtips}}</span>
      <div class="affirm-account" :class="{'active':verifyaffirm == 'fail','pitchon':highlight=='affirm'}">
        <span class="left">
          <input :type="passwordState" placeholder="確認密碼*" v-model="userregister.affirmpassword" @focus="highlight='affirm',verifyaffirm='initial'" @blur="verifyAffirm(userregister.affirmpassword)" @keyup="verifyAffirm(userregister.affirmpassword)">
        </span>
        <span class="right" v-show="verifyaffirm == 'pass'">
          <van-icon name="close" class="close" v-if="userregister.affirmpassword != ''" @click="userregister.affirmpassword = '', verifyaffirm = 'initial'" />
          <span class="fill"></span>
        </span>
      </div>
      <span class="marked-affirm" v-show="verifyaffirm == 'fail'">{{affirmtips}}</span>
      <p class="user-agreement">註冊賬號， 既表示您同意
        <span>《SARITIER用戶協議》</span>
      </p>
      <div class="create-btn" @click="userCanRegister">創建賬號</div>
    </div>
    <div class="user-other">
      <div class="cut-off">
        <span>或</span>
      </div>
      <div class="bottom-outter">
        <div class="bottom-btn">
          <div class="facebook">
            <span>
              <van-icon name="alipay" class="alipay" />
              <p>使用 Facebook 賬號登入</p>
            </span>
          </div>
          <div class="create-account" @click="toUserLogin">
            <p>已創建賬戶?</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import headers from "@/components/header";
import { postUserRegister } from "../../api/user/account.js";
export default {
  name: "userregister",
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
      //用戶註冊信息
      userregister: {
        //註冊類型
        type: "email",
        //帳號
        useremail: "",
        //密碼
        password: "",
        //確認密碼
        affirmpassword: ""
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
      //確認密碼格式驗證
      verifyaffirm: "initial",
      //密碼框輸入狀態
      passwordState: "text",
      //激活input高亮
      highlight: "",
      //郵箱提示語
      emailtips: "",
      //密碼提示語
      passwordtips: "",
      //確認密碼提示語
      affirmtips: ""
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
      if(this.verifyemail=='pass'&&this.verifypassword=='pass'&&this.verifyaffirm=='pass'){
        return true
      }else {
        return false
      }
    }
  },
  methods: {
    //用戶註冊
    postUserRegister,
    verifyEmail(str) {
      //郵箱正則
      let rexp = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (str == "") {
        this.verifyemail = "fail";
        this.emailtips = "賬號不能為空";
        return;
      }
      if (rexp.test(str)) {
        this.verifyemail = "pass";
      } else {
        this.verifyemail = "fail";
        this.emailtips = "無效的賬號";
      }
    },
    verifyPassword(str) {
      //密碼正則
      let rexp = /^[\w_-]{6,16}$/;
      if (str == "") {
        this.verifypassword = "fail";
        this.passwordtips = "密碼不能為空";
        return;
      }
      if (rexp.test(str)) {
        this.verifypassword = "pass";
      } else {
        this.verifypassword = "fail";
        this.passwordtips = "無效的密碼";
      }
    },
    verifyAffirm(str) {
      //密碼正則
      let rexp = /^[\w_-]{6,16}$/;
      if (str == "") {
        this.verifyaffirm = "fail";
        this.affirmtips = "確認密碼不能為空";
        return;
      }
      if (rexp.test(str)) {
        this.verifyaffirm = "pass";
      } else {
        this.verifyaffirm = "fail";
        this.affirmtips = "無效的確認密碼";
      }
      if (str === this.userregister.password) {
        this.verifyaffirm = "pass";
      } else {
        this.verifyaffirm = "fail";
        this.affirmtips = "確認密碼請保持與密碼一致";
      }
    },
    toUserLogin() {
      this.$router.push("user-login");
    },
    //用戶註冊
    userCanRegister() {
      if(this.checkAccount){
        this.postUserRegister(this.userregister)
      }else{
        console.log("填點什麼吧")
      }
    },
  },
  components: {
    headers
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/mixin.scss";
.register {
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
        .passed {
          font-size: 20px;
        }

        .close {
          font-size: 14px;
        }

        .fill {
          width: 18px;
          height: 18px;
          margin-left: 15px;
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

    .affirm-account {
      margin-top: 14px;
    }

    .create-btn {
      height: 50px;
      padding: 0px;
      margin-top: 25px;
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

    .marked-password {
      color: #fd4f57;
      @include fz(10px);
    }

    .marked-affirm {
      color: #fd4f57;
      @include fz(10px);
    }

    .user-agreement {
      margin-top: 16px;
      color: #888888;
      @include fz(11px);

      span {
        color: #333333;
        @include fz(11px);
        text-decoration: underline;
        margin-left: 4px;
      }
    }

    .active {
      border-bottom: 1px solid #fd4f57;
    }

    .pitchon {
      border-left: 4px solid #00b0ff;
    }
  }

  .user-other {
    .cut-off {
      height: auto;
      padding: 0;
      margin-top: 20px;
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
        }
      }
    }
  }
}
</style>
