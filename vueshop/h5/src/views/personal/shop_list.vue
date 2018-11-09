<template>
  <div class="order-details">
    <!-- 頭部導航 -->
    <headers title="購買清單" back></headers>
    <!-- 訂單狀態欄 -->
    <div class="status-bar">
      <ul>
        <li v-for="(item,index) in statusData" :key="index" @click="pitchonLi(item)">
          <span :class="{'active': item.pitchon == 1}">{{item.content}}</span>
        </li>
      </ul>
    </div>
    <!--訂單列表 -->
    <div class="order-list" v-if="switchover">
      <ul>
        <li v-for="(item,index) in showList" :key="index">
          <div class="order-id">
            <span class="left">{{item.order.sn}}</span>
            <span class="right">{{item.order.describe}}</span>
          </div>
          <div class="order-content" v-for="(secitem,secindex) in item.order.productInfo" @click="toProductDetails(item)">
            <div class="left">
              <div>
                <img :src="'https://www.saritier.com'+secitem.image" alt="">
              </div>
            </div>
            <div class="right">
              <p class="intro">{{secitem.name}}</p>
              <p class="attribute">
                <span>顏色：{{secitem.color}}</span>
                <span v-if="secitem.size != '' ">尺碼：{{secitem.size}}</span>
                <span>數量：{{secitem.number}}</span>
              </p>
              <p class="price">
                <span>NT${{secitem.price}}</span>
                <span class="sp">NT${{secitem.market_price}}</span>
              </p>
            </div>
          </div>
          <div class="order-sum">
            <span class="price">
              <span class="small">訂單金額:</span>  NT${{item.order.price_sum}}
            </span>
            <span class="num">共{{item.order.number_sum}}件商品</span>
          </div>
          <div class="order-other">
            <span v-for="(oitem,oindex) in item.order.behaviour" :class="{'payment':oitem == '去付款','comment':oitem == '評價'}" @click="carryOut(oitem,item)">{{oitem}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="not-find" v-if="!switchover">
      <div>
        <span>
          <img src="../../assets/personal_center_images/not-find.png" alt="">
        </span>
      </div>
      <p>尚無訂單</p>
    </div>
     <!-- 彈窗組建 -->
    <van-popup v-model="dialogsShow" :overlay="true" ref="dpopup" style="borderRadius: 5px">
      <dia-logs :dialogsShow="dialogsShow" @cancelBtn="cancelBtn" @confirmBtn="confirmBtn" :tips="dialogsTips" :leftBtn="leftcontent" :rightBtn="rightcontent"></dia-logs>
    </van-popup>
     <van-popup v-model="lShow" :overlay="false">
      <div class="tips-p">
        <i>
          <img src="../../assets/personal_center_images/plane@2x.png" alt="">
        </i>
         <p>海外運輸中(2-3天)</p>
      </div>
    </van-popup>
     <van-popup v-model="sShow" :overlay="false">
      <div class="tips-s">
        <i>
          <img src="../../assets/personal_center_images/service2@2x.png" alt="">
        </i>
         <p>請您聯繫客服</p>
      </div>
    </van-popup>
  </div>
</template>
<script>
import headers from "@/components/header";
import { Popup, Toast } from "vant";
import diaLogs from "@/components/diaLogs";
import { setUserPdt } from "../../util/auth.js";
export default {
  name: "v-orderinquiry",
  created() {},
  mounted() {
    this.init();
  },
  data() {
    return {
      //訂單id
      id: "",
      //訂單號
      sn: "",
      //控制彈窗組建顯示
      dialogsShow: false,
      //彈窗左邊內容
      leftcontent: "",
      //彈窗右邊內容
      rightcontent: "",
      //彈窗類型
      dialogsType: "",
      //dialogs提示框信息
      dialogsTips: "",
      //顯示物流彈出框
      lShow: false,
      //顯示物流彈出框
      sShow: false,
      //切換頁面
      switchover: true,
      //傳給大梅姐的空數組
      d_product: [],
      //訂單狀態數據
      statusData: [
        {
          content: "全部",
          type: 1,
          pitchon: 0
        },
        {
          content: "待付款",
          type: 2,
          pitchon: 0
        },
        {
          content: "待收貨",
          type: 3,
          pitchon: 0
        },
        {
          content: "已完成",
          type: 4,
          pitchon: 0
        },
        {
          content: "已取消",
          type: 5,
          pitchon: 0
        }
      ],
      //訂單詳細數據
      orderData: [],
      //展示的訂單數據
      showList: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 初始化
    init() {
      this.$Axios.post("v1/order/order-list").then(res => {
        if (res.status == 200) {
          console.log(res.data);
          this.statusData[0].pitchon = 1;
          this.orderData = res.data.orderList;
          this.orderData.forEach(ele => {
            ele.order.describe = ""
            ele.order.behaviour = []
            if(ele.order.payment_status=="0"&&ele.order.status=="0"||ele.order.status=="1"){
              ele.order.describe = "待付款"
              ele.order.behaviour.push("去付款")
              ele.order.behaviour.push("取消訂單")
            }else if(ele.order.payment_status=="1"&&ele.order.status=="0"||ele.order.status=="1") {
              ele.order.describe = "付款中"
            }else if(ele.order.payment_status=="3"&&ele.order.status=="0"||ele.order.status=="1") {
              ele.order.describe = "付款中"
            }else if(ele.order.payment_status=="2"&&ele.order.status=="0"||ele.order.status=="1"||ele.order.status=="2"||ele.order.status=="3"||ele.order.status=="4"||ele.order.status=="5") {
              ele.order.describe = "备货中"
            }else if(ele.order.payment_status=="2"&&ele.order.shipment_status=="0") {
              ele.order.describe = "备货中"
            }else if(ele.order.payment_status=="2"&&ele.order.status=="6") {
              ele.order.describe = "已发货"
              ele.order.behaviour.push("查看物流")
              ele.order.behaviour.push("再次購買")
            }else if(ele.order.payment_status=="2"&&ele.order.shipment_status=="1") {
              ele.order.describe = "已发货"
              ele.order.behaviour.push("查看物流")
              ele.order.behaviour.push("再次購買")
            }else if(ele.order.payment_status=="2"&&ele.order.status=="7") {
              ele.order.describe = "已完成"
              if(ele.order.comments == 'no'){
                ele.order.behaviour.push("評價")
              }
              ele.order.behaviour.push("再次購買")
              ele.order.behaviour.push("申請售後")
            }else if(ele.order.payment_status=="2"&&ele.order.status=="7") {
              ele.order.describe = "已完成"
            }else if(ele.order.status=="-1"||ele.order.status=="20") {
              ele.order.describe = "已取消"
              ele.order.behaviour.push("刪除訂單")
            }else if(ele.order.payment_status=="2"&&ele.order.status=="21") {
              ele.order.describe = "拒收"
              ele.order.behaviour.push("刪除訂單")
            }else if(ele.order.payment_status=="2"&&ele.order.status=="22"||ele.order.status=="23"||ele.order.status=="24") {
              ele.order.describe = "已退货"
              ele.order.behaviour.push("刪除訂單")
            }else if(ele.order.payment_status=="2"&&ele.order.status=="25") {
              ele.order.describe = "改签成功"
              ele.order.behaviour.push("再次購買")
            }else if(ele.order.payment_status=="2"&&ele.order.status=="26") {
              ele.order.describe = "拒调中"
              ele.order.behaviour.push("再次購買")
            }else if(ele.order.payment_status=="2"&&ele.order.shipment_status=="2") {
              ele.order.describe = "待收货"
              ele.order.behaviour.push("查看物流")
            }else if(ele.order.shipment_status=="0"&&ele.order.status=="0"||ele.order.status=="1"||ele.order.status=="2"||ele.order.status=="3"||ele.order.status=="4"||ele.order.status=="5") {
              ele.order.describe = "備貨中"
            }else if(ele.order.shipment_status=="1"&&ele.order.status=="6") {
              ele.order.describe = "已發貨"
            }else if(ele.order.shipment_status=="2"&&ele.order.status=="7") {
              ele.order.describe = "已完成"
            }else if(ele.order.shipment_status=="2"&&ele.order.status=="21") {
              ele.order.describe = "拒收"
            }
          });
          this.showList = this.orderData
          if(this.$route.query.content) {
            this.initPitchonLi(this.$route.query.content)
          }
        }
      });
    },
    //選擇類型
    pitchonLi(item) {
      this.statusData.forEach(ele => {
        ele.pitchon = 0;
      });
      item.pitchon = !item.pitchon;
      if (item.content == "全部") {
        this.showList = this.orderData;
        if(this.showList.length == 0){
          this.switchover =false
        }else {
          this.switchover = true
        }
      } else {
        this.showList = this._filter(this.orderData, item.content);
      }
      console.log(this.showList);
    },
    //初始化選擇類型
    initPitchonLi(content) {
      this.statusData.forEach(ele => {
        ele.pitchon = 0;
      });
       this.statusData.forEach(ele => {
        if(ele.content == content){
          ele.pitchon = 1
        }
      });
      if (content == "全部") {
        this.showList = this.orderData;
      } else {
        this.showList = this._filter(this.orderData,content);
      }
      console.log(this.showList);
    },
    //過濾數據`
    _filter(add, content) {
      let result = [];
      add.forEach(ele => {
        if (ele.order.describe == content) {
          result.push(ele);
        }
      });
      if(result.length == 0){
        this.switchover =false
      }else {
         this.switchover = true
      }
      return result;
    },
    //執行具體功能
    carryOut(oitem,item) {
      if(oitem == "去付款"){
        this.$router.push({
          path: "/checkout/payment",
          query: {
            ordernumber: item.order.sn
          }
        })
      }else if(oitem == "查看物流") {
         this.$Axios.post("v1/order/logistics-query",{id:item.order.order_id}).then(res => {
          if (res.status == 200) {
          this.$router.push({
          path: "/personal/logistics-information",
          query: {
            id: item.order.order_id
          }
        })
          }else if(res.status == 203) {
            this.lShow = true
            setTimeout(() => {
            this.lShow = false
          }, 2000);
          }
        });
      }else if(oitem == "申請售後") {
          this.sShow = true
            setTimeout(() => {
            this.sShow = false
          }, 2000);
      }else if(oitem == "再次購買") {
        item.order.productInfo.forEach(ele => {
          let product = { productId : '',currentNum : 0};
           product.productId = ele.product_id;
           product.currentNum = ele.number;
           this.d_product.push(product);
      });
           let json = null
           json=JSON.stringify(this.d_product);
           setUserPdt(json)
           this.$router.push({
             path: "/checkout"
           })
      }else if(oitem == "評價"){
         this.$router.push({
          path: "/personal/appraise",
          query: {
            id: item.order.order_id
          }
        })
      } else if (oitem == "取消訂單") {
        this.cancle(item);
      } else if (oitem == "刪除訂單") {
        this.deleted(item);
      }
    },
      deleted(item) {
      this.sn = item.order.sn
      this.leftcontent = "確認刪除";
      this.rightcontent = "再想想";
      this.dialogsShow = true;
      this.dialogsType = 1;
      this.dialogsTips = "刪除后不可恢復訂單，您確定要刪除這筆訂單？";
    },
    cancle(item) {
      this.id = item.order.order_id
      this.leftcontent = "確認取消";
      this.rightcontent = "再想想";
      this.dialogsShow = true;
      this.dialogsType = 2;
      this.dialogsTips = "您確認要取消這筆訂單？";
    },
    //關閉確認彈窗
    cancelBtn(closed) {
      this.dialogsShow = false;
      this.dialogsTips = "";
      if (this.dialogsType == 1) {
        this.$Axios
          .post("/v1/order/delete-order", { sn: this.sn })
          .then(res => {
            if (res.status == 200) {
              this.$router.push({
                path: "personal/shop-list"
              });
            } else {
              Toast({
                mask: false,
                message: "網絡超時，請稍後再試",
                duration: 1000
              });
            }
          });
      } else if (this.dialogsType == 2) {
        this.$Axios
          .post("v1/order/cancel", { id: this.id })
          .then(res => {
            if (res.status == 200) {
              this.$router.push({
                path: "personal/shop-list"
              });
            } else {
              Toast({
                mask: false,
                message: "網絡超時，請稍後再試",
                duration: 1000
              });
            }
          });
      }
    },
    //點擊確認執行方法
    confirmBtn() {
      this.dialogsShow = closed;
      this.dialogsTips = "";
      this.dialogsType = 0;
    },
    //跳轉到商品詳情
    toProductDetails(item){
      this.$router.push({
          path: "/personal/order-details",
          query: {
            id: item.order.order_id
          }
        })
    },
  },
  components: {
    headers,
    diaLogs
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/mixin.scss";
.order-details {
  width: 100%;
  background-color: #f5f5f5;

  .tips-p {
    width: 175px;
    height: 90px;
    background-color: #000000;
    opacity: 0.7;
    border-radius: 5px;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    i {
      width: 55px;
      height: 30px;
      margin-bottom: 9px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    p {
      color: #fff;
    }
  }

  .tips-s {
    width: 175px;
    height: 90px;
    background-color: #000000;
    opacity: 0.7;
    border-radius: 5px;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    i {
      width: 42px;
      height: 42px;
      margin-bottom: 9px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    p {
      color: #fff;
    }
  }

  .status-bar {
    width: 100%;
    height: 44px;
    background-color: #fff;
    border-bottom: 1px solid #eeeeee;

    ul {
      width: 100%;
      height: 100%;
      display: -webkit-flex;
      display: flex;
      flex-direction: row;
      li {
        width: 20%;
        height: 100%;
        display: -webkit-flex;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          font-size: 12px;
          padding: 10px 0;
        }

        .active {
          font-size: 15px;
          border-bottom: 2px solid #d4b56c;
          font-weight: bold;
        }
      }
    }
  }

  .not-find {
    position: absolute;
    top: 98px;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    div {
      width: 100%;
      margin-top: 53px;
      @include flex-center;
      span {
        width: 52px;
        height: 66px;
        img {
          height: 100%;
        }
      }
    }

    p {
      margin-top: 20px;
      width: 100%;
      @include flex-center;
      color: #888888;
      font-size: 14px;
    }
  }

  .order-list {
    overflow: scroll;
    position: absolute;
    top: 88px;
    bottom: 0;
    left: 0;
    right: 0;

    ul {
      width: 100%;

      li {
        width: 100%;
        background-color: #fff;
        margin-top: 10px;

        .order-id {
          width: 100%;
          height: 40px;
          padding: 0 15px;
          display: -webkit-flex;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .left {
            color: #333333;
            font-size: 14px;
          }

          .right {
            color: #d4b56c;
            font-size: 14px;
          }
        }

        .order-content {
          width: 100%;
          height: 92px;
          background-color: #f5f5f5;
          padding: 0 15px;
          display: -webkit-inline-flex;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 4px solid #fff;

          .left {
            width: 68px;
            height: 68px;
            img {
              width: 100%;
            }
          }

          .right {
            width: 254px;
            p {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .intro {
              margin-bottom: 5px;
            }

            .attribute {
              margin-bottom: 10px;
              color: #888888;
              font-size: 13px;
            }

            .price {
              color: #333333;
              font-size: 14px;
              .sp {
                color: #888888;
                text-decoration-line: line-through;
              }
            }
          }
        }

        .order-sum {
          width: 100%;
          height: 40px;
          padding: 0 15px;
          display: -webkit-flex;
          display: flex;
          align-items: center;
          flex-direction: row-reverse;
          border-bottom: 1px solid #eeeeee;

          .price {
            color: #333333;
            font-size: 15px;
            // display: -webkit-flex;
            // display: flex;
            // align-items: center;
          }

          .num {
            color: #888888;
            font-size: 12px;
            margin-right: 10PX;
          }

          .small {
            color: #888888;
            font-size: 12px;
          }
        }

        .order-other {
          width: 100%;
          height: 50px;
          padding: 0 15px;
          display: -webkit-flex;
          display: flex;
          align-items: center;
          flex-direction: row-reverse;          


          span {
            width: 80px;
            height: 30px;
            margin-left: 10px;
            @include flex-center;
            background-color: #fff;
            color: #333333;
            border: 1px solid #999999;
          }

          .payment {
            width: 80px;
            height: 30px;
            @include flex-center;
            background-color: #d4b56c;
            color: #fff;
            border: 1px solid #d4b56c;
          }

          .comment {
            width: 80px;
            height: 30px;
            @include flex-center;
            background-color: #fff;
            color: #d4b56c;
            border: 1px solid #d4b56c;
          }


        }
      }
    }
  }
}
</style>
