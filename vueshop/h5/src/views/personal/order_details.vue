<template>
  <div class="order-details">
    <!-- 頭部導航 -->
    <headers title="訂單詳情" back></headers>
    <div class="order-status">
      <p class="top">
        <span>{{orderdata.describe}}</span>
        <span>NT${{orderdata.order_price_sum}}</span>
      </p>
      <p class="bottom">
        <span>剩59分05秒自動關閉</span>
        <span>應付金額</span>
      </p>
    </div>
    <div class="outter">
      <div class="address-info">
        <div class="method">寄送方式</div>
        <div class="name">{{orderdata.shipment_name}}</div>
        <div class="info">
          <p class="phone">{{orderdata.consignee}}{{orderdata.phone}}</p>
          <p class="address">{{orderdata.address}}</p>
        </div>
      </div>
      <div class="order-list">
        <div class="products-num">
          <span>共{{productdata.length}}件商品</span>
        </div>
        <div class="order-content" v-for="(item,index) in productdata" @click="toProductDetails(item)">
          <div class="left">
            <div>
              <img :src="'https://www.saritier.com'+item.image" alt="">
            </div>
          </div>
          <div class="right">
            <p class="intro">{{item.name}}</p>
            <p class="attribute">
              <span>顏色:{{item.color}}</span>
              <span v-if="item.size != ''">尺碼:{{item.size}}</span>
              <span>數量:{{item.num}}</span>
            </p>
            <p class="price">
              <span>NT${{item.price}}</span>
              <span class="sp">NT${{item.market_price}}</span>
            </p>
          </div>
        </div>
        <div class="discount">
          <p>
            <span>商品金額</span>
            <span>NT${{orderdata.order_price_sum}}</span>
          </p>
          <p>
            <span>運費</span>
            <span>NT${{orderdata.shipment_fee}}</span>
          </p>
        </div>
        <div class="order-price">
          <span class="left">訂單金額</span>
          <span class="right">NT${{orderdata.order_price_sum}}</span>
        </div>
      </div>
      <div class="order-other">
        <p v-if="orderdata.payment_method == 2">付款方式 &nbsp;在線支付</p>
        <p v-if="orderdata.payment_method == 1">付款方式 &nbsp;貨到付款</p>
        <p>訂單編號 &nbsp;{{orderdata.sn}}</p>
        <p>下單時間 &nbsp;2018.07.26 16:35:34</p>
      </div>
    </div>
    <div class="function-btn">
      <span class="ones" v-for="(item,index) in orderdata.behaviour" :class="{'payment':item == '去付款','comment':item == '評價'}" @click="carryOut(item,orderdata)">{{item}}</span>
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
import diaLogs from "@/components/diaLogs";
import { Popup, Toast } from "vant";
import { setUserPdt } from "../../util/auth.js";
export default {
  name: "order_details",
  created() {},
  mounted() {
    this.orderInit();
  },
  data() {
    return {
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
      //訂單數據
      orderdata: {},
      //商品數據
      productdata: [],
      //傳給大梅姐的空數組
      d_product: [],
      //顯示物流彈出框
      lShow: false,
      //顯示物流彈出框
      sShow: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    deleted() {
      this.leftcontent = "確認刪除";
      this.rightcontent = "再想想";
      this.dialogsShow = true;
      this.dialogsType = 1;
      this.dialogsTips = "刪除后不可恢復訂單，您確定要刪除這筆訂單？";
    },
    cancle() {
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
          .post("/v1/order/delete-order", { sn: this.orderdata.sn })
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
          .post("v1/order/cancel", { id: this.orderdata.order_id })
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
    toProductDetails(item) {
      this.$router.push({
        path: "/product",
        query: {
          dataObj: item.product_id
        }
      });
    },
    //執行具體功能
    carryOut(item, order) {
      if (item == "去付款") {
        this.$router.push({
          path: "/checkout/payment",
          query: {
            ordernumber: order.sn
          }
        });
      } else if (item == "查看物流") {
        this.$Axios
          .post("v1/order/logistics-query", { id: order.order_id })
          .then(res => {
            if (res.status == 200) {
              this.$router.push({
                path: "/personal/logistics-information",
                query: {
                  id: order.order_id
                }
              });
            } else if (res.status == 203) {
              this.lShow = true;
              setTimeout(() => {
                this.lShow = false;
              }, 2000);
            }
          });
      } else if (item == "申請售後") {
        this.sShow = true;
        setTimeout(() => {
          this.sShow = false;
        }, 2000);
      } else if (item == "再次購買") {
        this.productdata.forEach(ele => {
          console.log(ele);
          let product = { productId: "", currentNum: 0 };
          product.productId = ele.product_id;
          product.currentNum = ele.num;
          this.d_product.push(product);
          console.log(this.d_product);
        });
        let json = null;
        json = JSON.stringify(this.d_product);
        setUserPdt(json);
        this.$router.push({
          path: "/checkout"
        });
      } else if (item == "評價") {
        this.$router.push({
          path: "/personal/appraise",
          query: {
            id: order.order_id
          }
        });
      } else if (item == "取消訂單") {
        this.cancle();
      } else if (item == "刪除訂單") {
        this.deleted();
      }
    },
    //初始化訂單頁面
    orderInit() {
      this.$Axios
        .post("v1/order/order-view", { id: this.$route.query.id })
        .then(res => {
          if (res.status == 200) {
            console.log(res.data);
            let order_info = res.data.order_info;
            let product_info = res.data.product_info;
            this.orderdata = order_info;
            this.productdata = product_info;
            this.orderdata.describe = "";
            this.orderdata.behaviour = [];
           if(this.orderdata.payment_status=="0"&&this.orderdata.status=="0"||this.orderdata.status=="1"){
              this.orderdata.describe = "待付款"
              this.orderdata.behaviour.push("去付款")
               this.orderdata.behaviour.push("取消訂單")
            }else if(this.orderdata.payment_status=="1"&&this.orderdata.status=="0"||this.orderdata.status=="1") {
              this.orderdata.describe = "付款中"
            }else if(this.orderdata.payment_status=="3"&&this.orderdata.status=="0"||this.orderdata.status=="1") {
              this.orderdata.describe = "付款中"
            }else if(this.orderdata.payment_status=="2"&&this.orderdata.status=="0"||this.orderdata.status=="1"||this.orderdata.status=="2"||this.orderdata.status=="3"||this.orderdata.status=="4"||this.orderdata.status=="5") {
              this.orderdata.describe = "备货中"
            }else if(this.orderdata.payment_status=="2"&&this.orderdata.shipment_status=="0") {
              this.orderdata.describe = "备货中"
            }else if(this.orderdata.payment_status=="2"&&this.orderdata.status=="6") {
              this.orderdata.describe = "已发货"
              this.orderdata.behaviour.push("查看物流")
              this.orderdata.behaviour.push("再次購買")
            }else if(this.orderdata.payment_status=="2"&&this.orderdata.shipment_status=="1") {
              this.orderdata.describe = "已发货"
              this.orderdata.behaviour.push("查看物流")
              this.orderdata.behaviour.push("再次購買")
            }else if(this.orderdata.payment_status=="2"&&this.orderdata.status=="7") {
              this.orderdata.describe = "已完成"
              if(this.orderdata.comments == 'no'){
                this.orderdata.behaviour.push("評價")
              }
              this.orderdata.behaviour.push("再次購買")
              this.orderdata.behaviour.push("申請售後")
            }else if(this.orderdata.payment_status=="2"&&this.orderdata.status=="7") {
              this.orderdata.describe = "已完成"
            }else if(this.orderdata.status=="-1"||this.orderdata.status=="20") {
              this.orderdata.describe = "已取消"
              this.orderdata.behaviour.push("刪除訂單")
            }else if(this.orderdata.payment_status=="2"&&this.orderdata.status=="21") {
              this.orderdata.describe = "拒收"
              this.orderdata.behaviour.push("刪除訂單")
            }else if(this.orderdata.payment_status=="2"&&this.orderdata.status=="22"||this.orderdata.status=="23"||this.orderdata.status=="24") {
              this.orderdata.describe = "已退货"
              this.orderdata.behaviour.push("刪除訂單")
            }else if(this.orderdata.payment_status=="2"&&this.orderdata.status=="25") {
              this.orderdata.describe = "改签成功"
              this.orderdata.behaviour.push("再次購買")
            }else if(this.orderdata.payment_status=="2"&&this.orderdata.status=="26") {
              this.orderdata.describe = "拒调中"
              this.orderdata.behaviour.push("再次購買")
            }else if(this.orderdata.payment_status=="2"&&this.orderdata.shipment_status=="2") {
              this.orderdata.describe = "待收货"
              this.orderdata.behaviour.push("查看物流")
            }else if(this.orderdata.shipment_status=="0"&&this.orderdata.status=="0"||this.orderdata.status=="1"||this.orderdata.status=="2"||this.orderdata.status=="3"||this.orderdata.status=="4"||this.orderdata.status=="5") {
              this.orderdata.describe = "備貨中"
            }else if(this.orderdata.shipment_status=="1"&&this.orderdata.status=="6") {
              this.orderdata.describe = "已發貨"
            }else if(this.orderdata.shipment_status=="2"&&this.orderdata.status=="7") {
              this.orderdata.describe = "已完成"
            }else if(this.orderdata.shipment_status=="2"&&this.orderdata.status=="21") {
              this.orderdata.describe = "拒收"
            }
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

  .order-status {
    width: 100%;
    height: 70px;
    background-color: #d4b56c;
    color: #fff;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 15px;

    p {
      display: -webkit-flex;
      display: flex;
      justify-content: space-between;
    }

    .top {
      margin-bottom: 10px;
      font-size: 18px;
    }

    .bottom {
      font-size: 13px;
    }
  }

  .outter {
    position: absolute;
    top: 114px;
    left: 0;
    right: 0;
    bottom: 50px;
    width: 100%;
    overflow: scroll;
    .address-info {
      width: 100%;
      background-color: #fff;
      padding: 12px 15px;

      .method {
        color: #333333;
        font-size: 15px;
        margin-bottom: 15px;
        font-weight: bold;
      }

      .name {
        color: #333333;
        font-size: 13px;
        margin-bottom: 15px;
      }

      .info {
        color: #333333;
        font-size: 13px;

        p {
          margin-bottom: 9px;
        }
      }
    }

    .order-list {
      width: 100%;
      margin-top: 10px;
      background-color: #fff;

      .products-num {
        width: 100%;
        height: 44px;
        display: -webkit-flex;
        display: flex;
        align-items: center;
        padding: 0 16px;
        span {
          color: #333333;
          font-size: 15px;
          font-weight: bold;
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

            span {
              margin-right: 10px;
            }
          }

          .price {
            color: #333333;
            font-size: 14px;

            span {
              margin-right: 10px;
            }
            .sp {
              color: #888888;
              text-decoration-line: line-through;
            }
          }
        }
      }

      .discount {
        width: 100%;
        height: 60px;
        padding: 0 16px;
        background-color: #fff;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        justify-content: center;

        p {
          display: -webkit-flex;
          display: flex;
          justify-content: space-between;
          color: #888888;
          font-size: 12px;
          margin-bottom: 7px;
        }
      }

      .order-price {
        width: 100%;
        height: 44px;
        display: -webkit-flex;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        border-top: 1px solid #e1e1e1;

        span {
          color: #333333;
          font-size: 15px;
        }
      }
    }
    .order-other {
      width: 100%;
      margin-top: 10px;
      padding: 10px 16px 1px 16px;
      background-color: #fff;
      margin-bottom: 10px;

      p {
        margin-bottom: 9px;
        color: #888888;
        font-size: 13px;
      }
    }
  }

  .function-btn {
    width: 100%;
    height: 50px;
    background-color: 9px;
    background-color: #fff;
    position: absolute;
    padding: 0 16px;
    bottom: 0;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    border-top: 1px solid #e1e1e1;

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
</style>
