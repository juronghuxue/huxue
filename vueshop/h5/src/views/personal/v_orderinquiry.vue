<template>
  <div class="v-orderinquiry">
    <!-- 頭部導航 -->
    <headers title="遊客訂單查詢" back></headers>
    <!-- 輸入框 -->
    <div class="inquiry-input">
      <input type="text" placeholder="請輸入手機號碼查詢" v-model="visitorphone">
    </div>
    <div class="btn-outter" v-if="tabshow">
      <div class="confrim-btn" :class="{'active':verifyPhone}" @click="toVisitorOrder">提交</div>
    </div>
  </div>
</template>
<script>
import headers from "@/components/header";
import { Toast } from "vant";
export default {
  name: "v-orderinquiry",
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
      //遊客手機號碼
      visitorphone: ""
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
    verifyPhone() {
      //電話號碼zhengz
      let rexp = /^(09)\d{8}$/;
      if (rexp.test(this.visitorphone)) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    //跳轉到遊客訂單
    toVisitorOrder() {
      if (this.verifyPhone) {
        this.$router.push({
          path: "visitor-order",
          query: {
            phone: this.visitorphone
          }
        });
      } else {
        Toast({
          mask: false,
          message: "請輸入合法手機號",
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
.v-orderinquiry {
  width: 100%;
  background-color: #f5f5f5;

  .inquiry-input {
    width: 100%;
    height: 44px;
    background-color: #fff;
    margin-top: 10px;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    padding: 0 16px;

    input {
      font-size: 14px;
    }
  }

  .btn-outter {
    width: 100%;
    padding: 0 16px;
    margin-top: 25px;
    .confrim-btn {
      width: 100%;
      height: 39px;
      background-color: #cccccc;
      color: #fff;
      @include flex-center;
      font-size: 17px;
    }

    .active {
      background-color: #dab35f;
    }
  }
}
</style>
