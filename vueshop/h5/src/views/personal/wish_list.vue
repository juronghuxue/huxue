<template>
    <div class="wish-list">
        <!-- 頭部導航 -->
        <headers title="願望清單" back></headers>
        <div class="list">
            <ul>
                <van-swipe-cell :right-width="65" class="swipe" v-for="(item,index) in wishList" :key="index"> 
                    <li @click="toProduct(item.id)">
                        <div class="prd-img">
                            <img :src="'https://www.saritier.com'+item.thumb" alt="">
                        </div>
                        <div class="prd-info">
                            <span>{{item.name}}</span>
                            <span>NT${{item.price}}</span>
                        </div>
                    </li>
                    <span class="list-delete" slot="right" @click="deleteWish(item)">刪除</span>
                </van-swipe-cell>
            </ul>
        </div>
        <!-- 彈窗組建 -->
        <van-popup v-model="dialogsShow" :overlay="true" ref="dpopup" style="borderRadius: 5px">
            <dia-logs :dialogsShow="dialogsShow" @cancelBtn="cancelBtn" @confirmBtn="confirmBtn" :tips="dialogsTips" :leftBtn="leftcontent" :rightBtn="rightcontent"></dia-logs>
        </van-popup>
    </div>
</template>
<script>
import headers from "@/components/header";
import diaLogs from "@/components/diaLogs";
import { SwipeCell, Popup } from "vant";
export default {
  name: "wish-list",
  created() {},
  mounted() {
    this.getWishData();
  },
  data() {
    return {
      //控制彈窗組建顯示
      dialogsShow: false,
      //彈窗左邊內容
      leftcontent: "取消",
      //彈窗右邊內容
      rightcontent: "確認",
      //dialogs提示框信息
      dialogsTips: "是否確認刪除？",
      //願望清單數據
      wishList: [],
      //選擇願望id
      id: 0,
    };
  },
  watch: {},
  computed: {},
  methods: {
    //獲取願望清單數據
    getWishData() {
      this.$Axios.post("v1/user/favorite-list").then(res => {
        console.log(res);
        if(res.status == 200 ){
        this.wishList = res.data;
        console.log(res)
        }
        console.log(this.wishList);
      });
    },
    //滑動刪除
    onClose(clickPosition, instance) {
      console.log(instance);
      switch (clickPosition) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          this.dialogsShow = true;
          break;
      }
    },
    //關閉確認彈窗
    cancelBtn(closed) {
      this.dialogsShow = closed;
    },
    //點擊確認執行方法
    confirmBtn() {
      this.$Axios
        .post("v1/user/delete-favorite", { productIds: this.id })
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            this.dialogsShow = false;
          }
        });
    },
    //刪除對應的願望清單
    deleteWish(item) {
      this.dialogsShow = true;
      this.id = item.id
    },
    //跳轉到商品詳情
    toProduct(id){
         this.$router.push({
          path: "/product",
          query: {
            dataObj: id
          }
        });
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
.wish-list {
  width: 100%;
  background-color: #f5f5f5;

  .list {
    width: 100%;
    ul {
      width: 100%;

      .swipe {
        border-top: 1px solid #e1e1e1;

        li {
          width: 100%;
          height: 120px;
          padding: 0 15px;
          background-color: #fff;
          display: -webkit-flex;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .prd-img {
            width: 90px;
            height: 90px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .prd-info {
            width: 230px;
            height: 90px;
            display: -webkit-flex;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
        }
        .list-delete {
          width: 74px;
          height: 120px;
          background-color: #eb4e3d;
          color: #fff;
          @include flex-center;
        }
      }
    }
  }
}
</style>
