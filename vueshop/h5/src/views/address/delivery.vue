<template>
  <div class="delivery">
    <!-- 頭部導航 -->
    <headers title="運送方式" back></headers>
    <!-- 選擇配送方式、地址信息模塊 -->
    <div class="seven-eleven">
      <!-- 配送方式循環遍歷 -->
      <div class="methods" v-for="(item,index) in deliverymethod" :key="index">
        <div class="store" :class="{'active':item.pitchon == 1}" @click="pitchonDelivery(item,index)" id="header" ref="header">
          <span class="left">
            <p class="name">{{item.name}}</p>
            <p class="time">{{item.time}}</p>
          </span>
          <span class="right">
            <i class="tick iconfont icon-ic_site_selected_nor" v-if="item.pitchon == 1"></i>
          </span>
        </div>
        <!-- 地址信息循環遍歷 -->
        <ul class="address-list" id="body" ref="body">
          <li v-for="(secitem,secindex) in item.children" @click="pitchonAddress(secitem,item)">
            <div class="select-btn">
              <i class="iconfont icon-ic_site_icon_unselec" v-if="secitem.pitchon == 0"></i>
              <i class="iconfont icon-ic_site_icon_selecte" v-if="secitem.pitchon == 1"></i>
            </div>
            <div class="address-information">
              <div>
                <p>{{secitem.district}}</p>
                <span v-if="secitem.default == 1">預設</span>
              </div>
              <p>{{secitem.consignee}}&nbsp;{{secitem.phone_nation}}{{secitem.phone}}</p>
              <p>{{secitem.address}}</p>
            </div>
            <!-- 修改地址功能 -->
            <div class="redact">
              <i class="iconfont icon-ic_site_edit_normal" @click="modificationAddress(secitem,item)"></i>
            </div>
          </li>
          <!-- 根據不同的配送方式 新增地址 -->
          <div class="add-address" v-if="item.name == '7-11'" @click="addAddress(item)">
            <span>新增&nbsp;7-11&nbsp;門市&nbsp;
              <i class="iconfont icon-ic_details_plus_norm"></i>
            </span>
          </div>
          <div class="add-address" v-if="item.name == '黑貓宅急便'" @click="addAddress(item)">
            <span>新增地址&nbsp;
              <i class="iconfont icon-ic_details_plus_norm"></i>
            </span>
          </div>
        </ul>
      </div>
    </div>
    <!-- 確認按鈕 進行提交、跳轉 -->
    <div class="confirm">
      <div class="confirm-btn" :class="{'active': useraddress != ''}" @click="confirmed">確認</div>
    </div>
  </div>
</template>
<script>
import { Toast, Icon, Dialog } from "vant";
import headers from "@/components/header";
export default {
  created() {},
  mounted() {
    //獲取用戶的地址信息
    this.getUserAddress();
  },
  data() {
    return {
      //用戶選擇地址
      useraddress: "",
      //配送方式
      deliverymethod: [
        {
          name: "7-11",
          pitchon: 0,
          time: "平均到貨時間3-5天",
          children: []
        },
        {
          name: "黑貓宅急便",
          pitchon: 0,
          time: "平均到貨時間3-5天",
          children: []
        }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
    //獲取用戶地址
    getUserAddress() {
      this.$Axios.post("v1/user/address").then(res => {
        if (res.status == 200) {
          res.data.forEach(ele => {
            //添加選中參數
            ele.pitchon = 0;
            //將設為默認的選中
            if (ele.default == 1) {
              ele.pitchon = 1;
              this.useraddress = ele.id;
            }
            //將兩種不同配送方式的數據放入對應數組
            if (ele.shipping_method == "711超商取貨") {
              this.deliverymethod[0].children.push(ele);
            } else {
              this.deliverymethod[1].children.push(ele);
            }
          });
        }
      });
    },
    //選擇配送方式
    pitchonDelivery(item, index) {
      //獲取對應的元素
      var otherI = Number(!index);
      var header = this.$refs.header[index];
      var body = this.$refs.body[index];
      var otherB = this.$refs.body[otherI];
      var height = body.getBoundingClientRect().height;
      //實現動畫
      if (!!height) {
        body.style.height = height + "px";
        var f = document.body.offsetHeight;
        body.style.height = "0px";
        if (item.pitchon != 1) {
          otherB.style.height = "auto";
        }
      } else {
        body.style.height = "auto";
        height = body.getBoundingClientRect().height;
        body.style.height = "0";
        var f = document.body.offsetHeight;
        body.style.height = height + "px";
        if (item.pitchon != 1) {
          otherB.style.height = "0px";
        }
      }
      this.deliverymethod.forEach(ele => {
        ele.pitchon = 0;
      });
      item.pitchon = !item.pitchon;
    },
    //選擇用戶地址
    pitchonAddress(secitem, item) {
      //分開兩種配送方式，只能選中一個
      if (secitem.pitchon == 1) {
        secitem.pitchon = !secitem.pitchon;
        this.useraddress = "";
      } else {
        this.deliverymethod.forEach(ele => {
          ele.children.forEach(el => {
            el.pitchon = 0;
          });
        });
        secitem.pitchon = !secitem.pitchon;
        this.useraddress = secitem.id;
      }
    },
    //用戶新增地址
    addAddress(item) {
      //跳轉頁面，並且在地址欄傳一個配送方式
      this.$router.push({
        path: "add-address",
        query: { delivery: item.name }
      });
    },
    //用戶修改地址
    modificationAddress(secitem, item) {
      //跳轉頁面，地址欄傳一個地址id和配送方式
      this.$router.push({
        path: "add-address",
        query: { id: secitem.id, delivery: item.name }
      });
    },
    confirmed() {
      if (this.useraddress != "") {
        this.$router.push({
          path: "/checkout",
          query: { id: this.useraddress }
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
.delivery {
  width: 100%;
  background-color: #efefef;

  .seven-eleven {
    width: 100%;
    .methods {
      width: 100;
      background-color: #fff;
      .store {
        width: 100%;
        height: 63px;
        border-left: 6px solid #ddd;
        display: -webkit-flex;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #fff;
        padding: 0 15px;
        border-top: 1px solid #ddd;

        .name {
          color: #333333;
          font-size: 14px;
        }

        .time {
          color: #777777;
          font-size: 13px;
        }

        p {
          margin-bottom: 10px;
        }

        i {
          font-size: 16px;
          color: #d4b56c;
        }
      }

      .active {
        border-left: 6px solid #d4b56c;
      }

      .address-list {
        width: 100%;
        height: 0px;
        transition: height 0.2s ease-in;
        overflow: hidden;

        li {
          width: 100%;
          background-color: #fff;
          border-top: 1px solid #ddd;
          padding: 12px 15px;
          display: -webkit-flex;
          display: flex;
          flex-direction: row;
          justify-content: space-between;

          .address-information {
            width: 100%;
            background-color: #fff;

            div {
              display: -webkit-flex;
              display: flex;
              justify-content: space-between;
              margin-bottom: 3px;
              background-color: #fff;

              p {
                color: #333333;
                font-size: 15px;
                background-color: #fff;
              }

              span {
                padding: 1px 7px;
                color: #fff;
                background-color: #d4b56c;
                font-size: 13px;
                @include flex-center;
                margin-right: 35px;
              }
            }

            p {
              padding: 0 5px;
              margin-bottom: 1px;
              color: #777777;
              font-size: 14px;
            }
          }

          .select-btn {
            display: -webkit-flex;
            display: flex;
            justify-content: center;
            width: 20px;

            .icon-ic_site_icon_unselec {
              color: #aaaaaa;
            }

            .icon-ic_site_icon_selecte {
              color: #d4b56c;
            }

            i {
              font-size: 18px;
            }
          }

          .redact {
            @include flex-center;
            width: 20px;

            .icon-ic_site_edit_normal {
              color: #aaaaaa;
            }

            .active {
              color: #d4b56c;
            }

            i {
              font-size: 24px;
            }
          }
        }
      }
    }

    .add-address {
      width: 100%;
      background-color: #fff;
      height: 48px;
      border-top: 1px solid #ddd;
      @include flex-center;
      span {
        color: #333333;
        font-size: 15px;

        i {
          color: #777777;
          font-size: 12px;
        }
      }
    }
  }

  .confirm {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 55px;
    background-color: #fff;
    @include flex-center;
    .confirm-btn {
      width: 345px;
      height: 42px;
      @include flex-center;
      font-size: 15px;
      color: #777777;
      background-color: #efefef;
    }

    .active {
      background-color: #d4b56c;
      color: #fff;
    }
  }
}
</style>
