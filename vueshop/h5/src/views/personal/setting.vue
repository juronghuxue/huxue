<template>
  <div class="setting">
    <!-- 頭部導航 -->
    <headers title="設定" back></headers>
    <div class="content">
      <div class="my-account">
        <span>我的賬戶</span>
      </div>
      <div class="my-file" @click="toPersonalData">
        <span>我的檔案</span>
        <i class="iconfont icon-ic_details_see_norma"></i>
      </div>
      <div class="my-address" @click="toAddress">
        <span>我的地址</span>
        <i class="iconfont icon-ic_details_see_norma"></i>
      </div>
      <div class="my-assistant">
        <span>我的小幫手</span>
      </div>
      <div class="about-delivery" @click="toDelivery">
        <span>關於配送</span>
        <i class="iconfont icon-ic_details_see_norma"></i>
      </div>
      <div class="about-discounts" @click="toDiscounts">
        <span>優惠政策</span>
        <i class="iconfont icon-ic_details_see_norma"></i>
      </div>
      <div class="about-return" @click="toSalesreturn">
        <span>退貨/換貨</span>
        <i class="iconfont icon-ic_details_see_norma"></i>
      </div>
      <div class="about-pack" @click="toPackservice">
        <span>包裝服務</span>
        <i class="iconfont icon-ic_details_see_norma"></i>
      </div>
      <div class="about-us" @click="toAboutUs">
        <span>關於我們</span>
        <i class="iconfont icon-ic_details_see_norma"></i>
      </div>
      <div class="contact-us" @click="toContact">
        <span>聯繫我們</span>
        <i class="iconfont icon-ic_details_see_norma"></i>
      </div>
      <div class="log-out">
        <span @click="userlogOut">登出</span>
      </div>
    </div>
    </van-popup>
    <!-- 彈窗組建 -->
    <van-popup v-model="dialogsShow" :overlay="true" ref="dpopup" style="borderRadius: 5px">
      <dia-logs :dialogsShow="dialogsShow" @cancelBtn="cancelBtn" @confirmBtn="confirmBtn" :tips="dialogsTips" :leftBtn="leftcontent" :rightBtn="rightcontent"></dia-logs>
    </van-popup>
  </div>
</template>
<script>
import { Popup } from "vant";
import store from "@/store";
import headers from "@/components/header";
import diaLogs from "@/components/diaLogs";
import { logOut } from "../../api/user/account.js";
export default {
  name: "setting",
  created() {},
  mounted() {},
  data() {
    return {
      //控制彈窗組建顯示
      dialogsShow: false,
      //彈窗左邊內容
      leftcontent: "取消",
      //彈窗右邊內容
      rightcontent: "登出",
      //dialogs提示框信息
      dialogsTips: "快點回唷！"
    };
  },
  watch: {},
  computed: {},
  methods: {
    logOut,
    //關閉確認彈窗
    cancelBtn(closed) {
      this.dialogsShow = closed;
      //   this.dialogsTips = "";
    },
    //點擊確認執行方法
    confirmBtn() {
      let that = this;
      this.dialogsShow = false;
      this.logOut();
    },
    //登出
    userlogOut() {
      this.dialogsShow = true;
    },
    //跳轉到我的檔案
    toPersonalData() {
      this.$router.push("personal-data");
    },
    //跳轉到我的地址頁面
    toAddress() {
      this.$router.push("/address/delivery");
    },
    //跳轉到關於配送
    toDelivery() {
      this.$router.push("/personal/about-delivery");
    },
    //跳轉到優惠政策
    toDiscounts() {
      this.$router.push("/personal/discounts");
    },
    //跳轉到退貨換貨
    toSalesreturn() {
      this.$router.push("/personal/salesreturn");
    },
    //跳轉到包裝服務
    toPackservice() {
      this.$router.push("/personal/pack-service");
    },
    //跳轉到關於我們
    toAboutUs() {
      this.$router.push("/personal/about-us");
    },
    toContact() {
      this.$router.push("/personal/contact-us");
    }
  },
  components: {
    headers,
    diaLogs
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/mixin.scss";
.setting {
  width: 100%;
  background-color: #f5f5f5;

  .content {
    div {
      width: 100%;
      height: 44px;
      padding: 0 15px;
      display: -webkit-flex;
      display: flex;
      align-items: center;
      background-color: #fff;
      justify-content: space-between;
      font-size: 14px;
      color: #333333;

      i {
        color: #aaaaaa;
        font-size: 13px;
      }
    }

    .my-account {
      color: #888888;
      font-size: 12px;
      background-color: #f5f5f5;
    }

    .my-assistant {
      color: #888888;
      font-size: 12px;
      background-color: #f5f5f5;
    }

    .log-out {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 55px;
      background-color: #fff;
      @include flex-center;
      span {
        width: 100%;
        height: 42px;
        background-color: #d4b56c;
        color: #fff;
        @include flex-center;
      }
    }
  }
}
</style>
