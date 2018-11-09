<template>
  <div class="logistics">
    <!-- 頭部導航 -->
    <headers title="物流信息" back></headers>
    <div class="head"></div>
    <div class="exhibition">
      <div class="outter">
        <div class="product" v-for="(item,index) in logisticsinfo.images" :key="index">
          <img :src="'https://www.saritier.com'+item" alt="">
        </div>
      </div>
    </div>
    <div class="prd-info">
      <p>共{{logisticsinfo.number_sum}}件商品，由黑貓宅急便運送</p>
      <p>訂單號：{{logisticsinfo.sn}}</p>
      <p class="status">物流狀態：
        <span>本地運輸</span>
      </p>
    </div>
    <div class="logistics-info">
      <div class="outter">
        <div v-for="(item,index) in dd" :key="index" :class="{'active': true}">
          <i class="origintick" v-if="true">
            <img src="../../assets/personal_center_images/origintick.png" alt="">
          </i>
          <p class="p-status">{{item}}</p>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import headers from "@/components/header";
import { Step, Steps } from "vant";
export default {
  name: "logistics",
  created() {},
  mounted() {
    this.init();
  },
  data() {
    return {
      //訂單物流狀態
      logisticsinfo: [],
      logisticsData: [
        {
          content: "【發貨】快件已發貨",
          times: "2018-08-18 13:51:18",
          isThis: 1
        },
        {
          content: "【簽收】已簽收",

          times: "2018-08-18 13:51:18",
          isThis: 1
        },
        {
          content: "【簽收】已簽收",
          times: "2018-08-18 13:51:18",
          isThis: 1
        },
        {
          content: "【簽收】已簽收",
          times: "2018-08-18 13:51:18",
          isThis: 0
        }
      ],
      dd: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    //獲取物流信息
    init() {
      this.$Axios.post("v1/order/logistics-query", { id: "666" }).then(res => {
        if (res.status == 200) {
          console.log(res.data.info);
          this.logisticsinfo = res.data.info.productInfo;
          this.dd = res.data.info.shipmentInfo;
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
.logistics {
  position: relative;
  width: 100%;
  overflow: scroll;
  background-color: #f5f5f5;

  .head {
    width: 100%;
    height: 10px;
    background-color: #fff;
  }

  .exhibition {
    width: 100%;
    height: 100px;
    display: -webkit-flex;
    display: flex;
    // flex-wrap: nowrap;
    overflow-x: auto;

    .outter {
      display: -webkit-flex;
      display: flex;
      // flex-direction: row;
      // flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      padding: 0 5px;

      .product {
        width: 90px;
        height: 89px;
        margin-left: 10px;
        // padding: 5px 0;
        background-color: #fff;

        img {
          width: 100%;
        }
      }
    }
  }

  .prd-info {
    width: 100%;
    padding: 10px 15px;
    margin-bottom: 10px;
    background-color: #fff;

    p {
      margin-bottom: 8px;
      color: #999999;
      font-size: 12px;
    }

    .status {
      color: #333333;
      span {
        color: #ff6c0b;
      }
    }
  }

  .logistics-info {
    width: 100%;
    background-color: #fff;
    padding: 12px 10px;
    .outter {
      padding-right: 30px;
      div {
        padding-left: 30px;
        position: relative;

        .p-status {
          margin-bottom: 14px;
          padding-top: 12px;
          color: #999999;
          font-size: 14px;
        }

        .times {
          padding-bottom: 12px;
          border-bottom: 1px solid #e8e8e8;
          color: #999999;
          font-size: 12px;
        }

        .origintick {
          z-index: 2;
          position: absolute;
          left: -2px;
          top: 14px;
          width: 12px;
          height: 12px;
          display: inline-block;
          img {
            width: 100%;
          }
        }
      }

      .active {
        p {
          color: #ff6c0b;
        }

        .p-status::after {
          background-color: #ff6c0b;
        }
      }

      .p-status::after {
        content: "";
        position: absolute;
        left: 4px;
        top: 20px;
        width: 1px;
        height: 45px;
      }

       div:nth-last-child(1) {
        .p-status::after {
          content: "";
          width: 0px;
          height: 0px;
        }
      }
    }
  }
}
</style>
