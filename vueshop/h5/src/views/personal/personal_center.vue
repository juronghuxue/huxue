<template>
  <div class="personal-center">
    <div class="user-information">
      <div class="left">
        <span class="login" v-if="login" @click="toUserLogin">登入/註冊</span>
        <span class="portrait" v-if="!login">
          <div class="photo">
            <img :src="portrait" alt="">
          </div>
          <p class="name">{{username}}</p>
        </span>
      </div>
      <div class="set" @click="toSetting">
        <i class="iconfont icon-ic_user_edit_normal"></i>
      </div>
    </div>
    <div class="visitor-order" @click="toVorderquiry">
      <span class="left">
        <i class="dingdan">
          <img src="../../assets/personal_center_images/icon-dingdan.png" alt="">
        </i>
        <p>遊客訂單查詢</p>
      </span>
      <span class="right">
        <i class="iconfont icon-ic_see_normal"></i>
      </span>
    </div>
    <div class="shop-list">
      <div class="shop-title" @click="toShopList">
        <span class="left">
          <i class="iconfont icon-ic_user_icon_normal"></i>
          <p>購買清單</p>
        </span>
        <span class="right">
          <i class="iconfont icon-ic_see_normal"></i>
        </span>
      </div>
      <ul class="order-status">
        <li v-for="(item,index) in buyList" :key="index" @click="toDefinite(item)">
          <span>
            <img :src="item.img" alt="">
          </span>
          <p>{{item.content}}</p>
        </li>
      </ul>
    </div>
    <div class="functions">
      <ul class="function-list">
        <li @click="toWishList">
          <span>
            <img src="../../assets/personal_center_images/11@2x.png" alt="">
          </span>
          <p>願望清單</p>
        </li>
        <li @click="toBrowsing">
          <span>
            <img src="../../assets/personal_center_images/22@2x.png" alt="">
          </span>
          <p>瀏覽記錄</p>
        </li>
        <li>
          <span>
            <img src="../../assets/personal_center_images/33@2x.png" alt="">
          </span>
          <p>我的積分</p>
        </li>
        <li @click="toDelivery">
          <span>
            <img src="../../assets/personal_center_images/44@2x.png" alt="">
          </span>
          <p>收貨地址</p>
        </li>
        <li @click="toContactUs">
          <span>
            <img src="../../assets/personal_center_images/55@2x.png" alt="">
          </span>
          <p>聯繫我們</p>
        </li>
        <li @click="toOpinion">
          <span>
            <img src="../../assets/personal_center_images/66@2x.png" alt="">
          </span>
          <p>意見反饋</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import store from "@/store";
import { getToken } from "../../util/auth.js";
export default {
  name: "userlogin",
  created() {},
  mounted() {
    this.getUser();
  },
  data() {
    return {
      login: true,
      //用戶名稱
      username: "",
      portrait: "",
      //購買清單類型
      buyList: [
        {
          img: require("../../assets/personal_center_images/1@2x.png"),
          content: "待付款"
        },
        {
          img: require("../../assets/personal_center_images/2@2x.png"),
          content: "待收貨"
        },
        {
          img: require("../../assets/personal_center_images/3@2x.png"),
          content: "待評價"
        },
        {
          img: require("../../assets/personal_center_images/4@2x.png"),
          content: "已完成"
        }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
    //獲取用戶初始化數據
    getUser() {
      if (getToken) {
        store.state.app.token = getToken();
      }
      if (store.state.app.token != "" && store.state.app.token != null) {
        this.login = false;
        this.$Axios.post("v1/user/profile").then(res => {
          if (res.status == 200) {
            console.log(res.data);
            this.username = res.data.nickname;
            this.portrait = "http://192.168.1.151:9002" + res.data.avatar_url;
          }
        });
      }
    },
    //跳轉到設置頁面
    toSetting() {
      this.$router.push("setting");
    },
    //跳轉到登錄頁面
    toUserLogin() {
      this.$router.push("/user/user-login");
    },
    //跳轉到訂單詳情
    toShopList() {
      this.$router.push("/personal/shop-list");
    },
    //跳轉到願望清單
    toWishList() {
      this.$router.push("/personal/wish-list");
    },
    //跳轉到瀏覽記錄
    toBrowsing() {
      this.$router.push("/personal/browsing");
    },
    //跳轉到意見反饋
    toOpinion() {
      this.$router.push("/personal/opinion");
    },
    //跳轉到到收貨地址
    toDelivery() {
      this.$router.push("/address/delivery");
    },
    //跳轉到聯繫我們
    toContactUs() {
      this.$router.push("/personal/contact-us");
    },
    //跳轉到遊客訂單查詢
    toVorderquiry() {
      this.$router.push("/personal/v-orderinquiry");
    },
    //跳轉到具體詳情
    toDefinite(item) {
      this.$router.push({
        path: "/personal/shop-list",
        query: { content: item.content }
      });
    }
  },
  components: {}
};
</script>
<style lang="scss" scoped>
@import "../../styles/mixin.scss";
.personal-center {
  width: 100%;
  padding-bottom: 0.666667rem;
  background-color: #f5f5f5;
  .user-information {
    width: 100%;
    height: 160px;
    background: url("../../assets/personal_center_images/black.png") no-repeat;
    background-size: 375px 160px;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 17px;
    .left {
      .login {
        font-size: 23px;
        color: #ffffff;
      }

      .portrait {
        display: -webkit-flex;
        display: flex;
        align-items: center;
        flex-direction: row;

        .photo {
          width: 60px;
          height: 60px;
          border: 2px solid #fff;
          border-radius: 50%;
          margin-right: 16px;

          img {
            width: 100%;
            border-radius: 50%;
          }
        }

        .name {
          font-size: 23px;
          color: #fff;
        }
      }
    }

    .set {
      i {
        font-size: 23px;
        color: #cccccc;
        display: inline-block;
        margin-bottom: 10px;
      }
    }
  }
  .visitor-order {
    width: 100%;
    height: 44px;
    background-color: #ffffff;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 15px;
    margin-bottom: 10px;
    .left {
      display: -webkit-flex;
      display: flex;
      align-items: center;
      i {
        width: 26px;
        height: 25px;
        display: inline-block;
        margin-right: 6px;

        img {
          width: 100%;
        }
      }

      .login {
        color: #333333;
        font-size: 15px;
      }
    }

    .right {
      i {
        color: #aaaaaa;
        font-size: 8px;
      }
    }
  }

  .shop-list {
    width: 100%;
    background-color: #ffffff;
    margin-bottom: 10px;

    .shop-title {
      width: 100%;
      height: 44px;
      padding: 0px 15px;
      display: -webkit-flex;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #eeeeee;

      .left {
        display: -webkit-flex;
        display: flex;
        align-items: center;
        i {
          font-size: 22px;
          display: inline-block;
          margin-right: 10px;
          margin-left: 2px;
        }
      }

      .right {
        i {
          color: #aaaaaa;
          font-size: 8px;
        }
      }
    }

    .order-status {
      width: 100%;
      background-color: #ffffff;
      display: flex;

      li {
        width: 25%;
        height: 100px;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        p {
          color: #333333;
          font-size: 12px;
        }

        span {
          width: 25px;
          height: 20px;
          margin-bottom: 10px;
          img {
            width: 100%;
          }
        }
      }
    }
  }

  .functions {
    width: 100%;
    background-color: #ffffff;

    .function-list {
      width: 100%;
      display: -webkit-flex;
      display: flex;
      flex-wrap: wrap;
    }

    li {
      width: 33.3333%;
      height: 105px;
      display: -webkit-flex;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-right: 1px solid #eeeeee;

      p {
        color: #333333;
        font-size: 11px;
      }

      span {
        width: 25px;
        height: 25px;
        color: #d4b56c;
        margin-bottom: 11px;

        img {
          width: 100%;
        }
      }
    }

    li:nth-child(1) {
      border-bottom: 1px solid #eeeeee;
    }
    li:nth-child(2) {
      border-bottom: 1px solid #eeeeee;
    }
    li:nth-child(3) {
      border-bottom: 1px solid #eeeeee;
    }
  }
}
</style>
