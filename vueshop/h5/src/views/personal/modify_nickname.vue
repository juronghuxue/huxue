<template>
  <div class="nickname">
    <!-- 頭部導航 -->
    <headers title="修改暱稱" back></headers>
    <div class="outter">
      <div class="name">
        <input type="text" placeholder="輸入新暱稱" v-model="username">
      </div>
      <div class="accomplish" @click="setName" :class="{'active': this.verifyUsername == true}">
        <span>完成</span>
      </div>
    </div>
  </div>
</template>
<script>
import headers from "@/components/header";
import { Toast } from "vant";
export default {
  name: "nickname",
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
      //默认屏幕高度
      docmHeight: document.documentElement.clientHeight,
      //实时屏幕高度
      showHeight: document.documentElement.clientHeight,
      //控制底部元素隱藏
      tabshow: true,
      //用戶名稱
      username: ""
    };
  },
  watch: {
    //解決輸入框彈起 壓縮界面
    showHeight: function() {
      if (this.docmHeight > this.showHeight) {
        //控制給頂起元素顯示隱藏
        this.tabshow = false;
      } else {
        this.tabshow = true;
      }
    }
  },
  computed: {
    //驗證用戶名是否合法
    verifyUsername() {
      //名字正則
      let rexp = /^[\u4e00-\u9fa5 ]{2,20}$/;
      if (rexp.test(this.username)) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    //設置名稱
    setName() {
      if (this.verifyUsername) {
        this.$Axios
          .post("v1/user/edit-nickname", {nickname: this.username})
          .then(res => {
            if (res.status == 200) {
              this.$router.push({
                path: "personal-data"
              });
            }
          });
      } else {
        Toast({
          mask: false,
          message: "請輸入正確的名稱",
          duration: 1000
        });
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
.nickname {
  width: 100%;
  background-color: #ffffff;

  .outter {
    width: 100%;
    border-top: 1px solid #e8e8e8;
    padding: 0 15px;
  }

  .name {
    width: 100%;
    height: 54px;
    margin-top: 51px;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #cccccc;
    font-size: 20px;
    input::-webkit-input-placeholder {
      /* WebKit browsers */

      color: #cccccc;
    }

    input:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */

      color: #cccccc;
    }

    input::-moz-placeholder {
      /* Mozilla Firefox 19+ */

      color: #cccccc;
    }

    input:-ms-input-placeholder {
      /* Internet Explorer 10+ */

      color: #cccccc;
    }
  }

  .accomplish {
    margin-top: 16px;
    width: 100%;
    height: 42px;
    background-color: #cccccc;
    @include flex-center;
    span {
      color: #f6f6f6;
      font-size: 14px;
    }
  }

  .active {
    background-color: #dab35f;
    color: #fff;
  }
}
</style>
