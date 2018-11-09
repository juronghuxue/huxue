<template>
  <div class="visitor-order">
    <!-- 頭部導航 -->
    <headers title="遊客訂單" back></headers>
    <!--訂單列表 -->
    <div class="order-list" v-if="switchover">
      <ul>
        <li v-for="(item,index) in showList" :key="index">
          <div class="order-id">
            <span class="left">訂單號：{{item.order.sn}}</span>
            <span class="right">{{item.order.describe}}</span>
          </div>
          <div class="order-content" v-for="(secitem,secindex) in item.order.productInfo">
            <div class="left">
              <div>
                <img :src="'https://www.saritier.com'+secitem.image" alt="">
              </div>
            </div>
            <div class="right">
              <p class="intro">{{secitem.name}}</p>
              <p class="attribute">
                <span>顏色:{{secitem.color}}</span>
                <span v-if="secitem.size != ''">尺碼:{{secitem.size}}</span>
                <span>數量:{{secitem.number}}</span>
              </p>
              <p class="price">
                <span>NT${{secitem.price}}</span>
                <span class="sp">NT${{secitem.market_price}}</span>
              </p>
            </div>
          </div>
          <div class="order-sum">
            <span class="price">
              <span class="small">訂單金額:</span>NT${{item.order.price_sum}}</span>
            <span class="num">共{{item.order.number_sum}}件商品</span>
          </div>
          <!-- <div class="order-other">
            <span>{{item.i}}</span>
          </div> -->
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
  </div>
</template>
<script>
import headers from "@/components/header";
export default {
  name: "visitor-order",
  created() {},
  mounted() {
    // this.init();
    this.init(this.$route.query.phone);
  },
  data() {
    return {
      //切換頁面
      switchover: true,
      //展示的訂單數據
      showList: []
    };
  },
  watch: {},
  computed: {
   
  },
  methods: {
    init(phone) {
      this.$Axios
        .post("v1/order/tourist-order-query", { mobile: phone })
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            console.log(res);
            this.showList = res.data.orderList;
            this.showList.forEach(ele => {
              switch (ele.order.status) {
                case "0":
                  ele.order.describe = "待審查";
                  break;
                case "1":
                  ele.order.describe = "审查中";
                  break;
                case "2":
                  ele.order.describe = "审核通过";
                  break;
                case "3":
                  ele.order.describe = "备货中";
                  break;
                case "4":
                  ele.order.describe = "补货中";
                  break;
                case "5":
                  ele.order.describe = "待检查";
                  break;
                case "6":
                  ele.order.describe = "已发货";
                  break;
                case "7":
                  ele.order.describe = "已签收";
                  break;
                case "20":
                  ele.order.describe = "废弃单";
                  break;
                case "21":
                  ele.order.describe = "拒收";
                  break;
                case "22":
                  ele.order.describe = "已退货";
                  break;
                case "23":
                  ele.order.describe = "待改签";
                  break;
                case "24":
                  ele.order.describe = "待改废";
                  break;
                case "25":
                  ele.order.describe = "改签成功";
                  break;
                case "26":
                  ele.order.describe = "拒调中";
                  break;
                case "-1":
                  ele.order.describe = "已取消";
                  break;
              }
            });
          }
        });
    },
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
    headers
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/mixin.scss";
.visitor-order {
  width: 100%;
  background-color: #f5f5f5;

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
    top: 44px;
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
            display: -webkit-flex;
            display: flex;
            align-items: center;
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
            @include flex-center;
            background-color: #d4b56c;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
