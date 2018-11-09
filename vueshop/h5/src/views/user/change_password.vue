<template>
  <div class="change-password">
    <!-- 頭部導航 -->
    <headers title="修改賬號密碼" back></headers>
    <div class="outter">
      <div class="password" :class="{'active':verifypassword == 'fail'}">
        <span class="left">
          <input :type="changetype" placeholder="密碼*" v-model="newpassword" @focus="verifypassword=''" @blur="verifyPassword()" @keyup="verifyPassword()">
        </span>
        <span class="right">
          <i>
            <img src="./../../assets/personal_center_images/mimabukejian.png" alt="" v-show="changetype == 'password'" @click="changetype = 'text'">
            <img src="./../../assets/personal_center_images/mimakejian.png" alt="" v-show="changetype == 'text'" @click="changetype = 'password'">
          </i>
        </span>
      </div>
      <span class="marked-password" v-show="verifypassword == 'fail'">{{passwordtips}}</span>
      <div class="confirme" :class="{'active':verifyconfirme == 'fail'}">
        <span>
          <input :type="changetype" placeholder="確認密碼*" v-model="confirmepassword" @focus="verifyconfirme=''" @blur="verifyConfirme()" @keyup="verifyConfirme()">
        </span>
      </div>
      <span class="marked-password" v-show="verifyconfirme == 'fail'">{{confirmetips}}</span>
      <div class="accomplish" :class="{'finish':checkAccount}" @click="changePassword">
        <span>完成</span>
      </div>
    </div>
  </div>
</template>
<script>
import headers from "@/components/header";
import { Toast } from "vant";
export default {
  name: "changepassword",
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
      //控制底部元素隱藏
      tabshow: true,
      //默认屏幕高度
      docmHeight: document.documentElement.clientHeight,
      //实时屏幕高度
      showHeight: document.documentElement.clientHeight,
      //新密碼
      newpassword: "",
      //確認密碼
      confirmepassword: "",
      //是否顯示密碼
      toshow: false,
      //切換input類型
      changetype: "text",
      //密碼提示語
      passwordtips: "",
      //確認密碼提示語
      confirmetips: "",
      //驗證密碼
      verifypassword: "",
      //驗證確認密碼
      verifyconfirme: ""
    };
  },
  methods: {
    //驗證密碼
    verifyPassword() {
      let rexp = /^[\w_-]{6,16}$/;
      if (this.newpassword == "") {
        this.passwordtips = "密碼不能為空";
        this.verifypassword = "fail";
        return;
      } else {
        this.passwordtips = "";
        this.verifypassword = "pass";
      }

      if (!rexp.test(this.newpassword)) {
        this.passwordtips = "無效的密碼";
        this.verifypassword = "fail";
        return;
      } else {
        this.passwordtips = "";
        this.verifypassword = "pass";
      }
      if (this.confirmepassword === this.newpassword) {
        this.verifyconfirme = "pass";
      } else {
        this.verifyconfirme = "fail";
        this.confirmetips = "確認密碼請保持與密碼一致";
      }
    },
    //驗證確認密碼
    verifyConfirme() {
      let rexp = /^[\w_-]{6,16}$/;
      if (this.confirmepassword == "") {
        this.confirmetips = "確認密碼不能為空";
        this.verifyconfirme = "fail";
        return;
      } else {
        this.passwordtips = "";
        this.verifyconfirme = "pass";
      }
      if (!rexp.test(this.confirmepassword)) {
        this.confirmetips = "無效的密碼";
        this.verifyconfirme = "fail";
        return;
      } else {
        this.confirmetips = "";
        this.verifyconfirme = "pass";
      }
      if (this.confirmepassword === this.newpassword) {
        this.verifyconfirme = "pass";
      } else {
        this.verifyconfirme = "fail";
        this.confirmetips = "確認密碼請保持與密碼一致";
      }
    },
    //提交密碼
    changePassword() {
      if (this.checkAccount) {
        let params = {};
        params.password = this.newpassword;
        params.confirm_password = this.confirmepassword;
        this.$Axios.post("v1/user/edit-password", params).then(res => {
          if (res.status == 200) {
            this.show = false;
            this.$router.push("/personal/personal-data");
             Toast({
              mask: true,
              message: "修改密碼成功！",
              duration: 1000,
            });
          } else {
            Toast({
              mask: true,
              message: "密碼修改不成功，請稍後再試！",
              duration: 1000,
            });
          }
        });
      } else {
      }
    }
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
      if (this.verifypassword == "pass" && this.verifyconfirme == "pass") {
        return true;
      } else {
        return false;
      }
    }
  },
  components: {
    headers
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/mixin.scss";
.change-password {
  width: 100%;
  background-color: #fff;

  .outter {
    width: 100%;
    padding: 20px 15px;

    .password {
      width: 100%;
      height: 46px;
      padding: 0 10px;
      background-color: #fff;
      border: 1px solid #e9e9e9;
      display: -webkit-flex;
      display: flex;
      justify-content: space-between;
      span {
        display: -webkit-flex;
        display: flex;
        @include flex-center;

        i {
          width: 18px;
          height: 12px;
          display: inline-block;

          img {
            width: 100%;
          }
        }

        input {
          width: 297px;
        }
      }
    }

    .confirme {
      width: 100%;
      height: 46px;
      padding: 0 10px;
      margin-top: 15px;
      background-color: #fff;
      border: 1px solid #e9e9e9;
      display: -webkit-flex;
      display: flex;
      span {
        display: -webkit-flex;
        display: flex;
        @include flex-center;
      }
    }

    .active {
      border-bottom: 1px solid #fd4f57;
    }

    .marked-password {
      color: #fd4f57;
      @include fz(10px);
    }

    .accomplish {
      width: 100%;
      height: 42px;
      margin-top: 30px;
      background-color: #cccccc;
      @include flex-center;
      span {
        color: #f6f6f6;
        font-size: 14px;
      }
    }

    .finish {
      background-color: #d4b56c;
      color: #fff;
    }
  }
}
</style>
