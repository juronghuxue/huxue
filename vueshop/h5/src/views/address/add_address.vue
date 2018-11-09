<template>
  <div class="manage-address">
    <!-- 頭部導航欄 -->
    <headers title="運送方式" back class="headers" other="true" @backUp="backUp"></headers>
    <!-- 用戶輸入區域  包括展示內容 -->
    <div class="information-list">
      <ul>
        <li>
          <span class="left">姓名</span>
          <span class="right">
            <input type="text" placeholder="設定 姓名" v-model="userAddress.consignee" @blur="verifyInput(userAddress.consignee,'^\\S{1,10}$','name','請輸入姓名','請輸入有效的姓名',1000)" @keyup="verifyInput(userAddress.consignee,'^\\S{1,10}$','name')">
          </span>
        </li>
        <li>
          <span class="left">電話號碼</span>
          <span class="right">
            <input type="text" placeholder="設定 電話號碼" v-model="userAddress.phone" @blur="verifyInput(userAddress.phone,'^(09)\\d{8}$','phone','請輸入電話號碼','請輸入有效的電話號碼',1000)" @keyup="verifyInput(userAddress.phone,'^(09)\\d{8}$','phone')">
          </span>
        </li>
        <li @click="callSetArea">
          <span class="left">所在地區</span>
          <span class="right">
            <div v-if="userAddress.cityname == ''">設定 城市 行政區 郵遞編號</div>
            <div>{{userAddress.cityname}} {{userAddress.districtname}}</div>
            <i class="iconfont icon-ic_see_normal"></i>
          </span>
        </li>
        <li class="detailed">
          <div class="title">詳細地址</div>
          <div class="tips">里道路或街名， 巷弄號</div>
          <textarea class="detailed-address-one" readonly="readonly" v-model="userAddress.address" style="resize:none" v-if="this.$route.query.delivery === '7-11'" @blur="verifyInput(userAddress.address,'[\\s\\S]*','address')" @keyup="verifyInput(userAddress.address,'[\\s\\S]*','address')"></textarea>
          <input type="text" v-if="this.$route.query.delivery !== '7-11'" placeholder="請輸入詳細地址" class="detailed-address-two" v-model="userAddress.address" @blur="verifyInput(userAddress.address,'[\\s\\S]*','address')" @keyup="verifyInput(userAddress.address,'[\\s\\S]*','address')">
        </li>
      </ul>
      <!-- 設為預設地址 vant Switch  -->
      <div class="default-address">
        <span class="left">設為預設地址</span>
        <span class="right">
          <van-switch v-model="checked" size="20px" :chenge="changeSwitch(checked)" />
        </span>
      </div>
      <!-- 刪除地址 -->
      <div class="delete-address" v-if="this.$route.query.id" @click="deleteUp">
        <span>刪除地址</span>
      </div>
    </div>
    <!-- 完成 提交功能 -->
    <div class="confirme-bn" v-if="tabshow">
      <span class="btn" :class="{'active-btn':verifyUserInfo}" @click="accomplish">完成</span>
    </div>
    <!--  選擇地址組建 vant popup、set-up-area為自身組件 -->
    <van-popup v-model="areaShow" position="bottom" :overlay="true">
      <set-up-area :areaShow="areaShow" @closePopup="closePop" @selectArea="selectArea" :areainfo="areainfo"></set-up-area>
    </van-popup>
    <!-- 彈窗組建 -->
    <van-popup v-model="dialogsShow" :overlay="true" ref="dpopup" style="borderRadius: 5px">
      <dia-logs :dialogsShow="dialogsShow" @cancelBtn="cancelBtn" @confirmBtn="confirmBtn" :tips="dialogsTips" :leftBtn="leftcontent" :rightBtn="rightcontent"></dia-logs>
    </van-popup>
  </div>
</template>
<script>
import { Toast, Popup, Switch } from "vant";
import setUpArea from "@/components/setUpArea";
import headers from "@/components/header";
import diaLogs from "@/components/diaLogs";
export default {
  created() {},
  mounted() {
    if (this.$route.query.id) {
      //獲取配送方式
      this.getShopMethod();
      //獲取用戶準備修改的地址信息
      this.getmodification();
    } else {
      this.getShopMethod();
    }
    // window.onresize监听页面高度的变化
    window.onresize = () => {
      return (() => {
        this.showHeight = document.documentElement.clientHeight;
      })();
    };
  },
  data() {
    return {
      //用戶地址信息
      userAddress: {
        //用戶名
        consignee: "",
        //用戶電話
        phone: "",
        //用戶id
        id: "",
        //設置默認
        default: 0,
        //配送方式
        shipping_method: null,
        //國家
        country: -1,
        //台灣省
        province: "710000",
        //市
        city: null,
        //地區
        district: null,
        //店鋪名
        POIName: "",
        //店鋪名
        poiid: "",
        //店鋪號碼
        Telno: "",
        //詳細地址
        address: "",
        //市名稱
        provincename: "",
        //市名稱
        cityname: "",
        //地區名稱
        districtname: ""
      },
      //將要傳值給子組件的信息集合
      areainfo: {},
      //控制地址組件顯示
      areaShow: false,
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
      //控制設為默認開關
      checked: false,
      //默认屏幕高度
      docmHeight: document.documentElement.clientHeight,
      //实时屏幕高度
      showHeight: document.documentElement.clientHeight,
      //控制底部元素隱藏
      tabshow: true,
      //驗證用戶名是否合法
      verifyname: "",
      //驗證用戶手機是否合法
      verifyphone: "",
      //驗證用戶地址是否合法
      verifyaddress: "",
      //是否启动定时器
      finishTimer: false
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
    //驗證用戶輸入信息
    verifyUserInfo() {
      if (
        this.verifyname == "pass" &&
        this.verifyphone == "pass" &&
        this.verifyaddress == "pass"
      ){
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    //完成
    accomplish() {
      this.toastVerify();
      if (this.verifyUserInfo) {
        if (this.$route.query.id) {
          this.modificationAddress();
        } else {
          this.newAddress();
        }
      }
    },
    //喚起選擇地區組件
    callSetArea() {
      this.areaShow = true;
    },
    //後退按鈕
    backUp() {
      this.leftcontent = "取消";
      this.rightcontent = "捨棄"
      this.dialogsShow = true;
      this.dialogsType = 1;
      this.dialogsTips = "您尚未儲存變更，您確定要離開？";
    },
    //刪除按鈕
    deleteUp() {
      this.leftcontent = "取消";
      this.rightcontent = "確定"
      this.dialogsType = 2;
      this.dialogsShow = true;
      this.dialogsTips = "確定刪除地址？";
    },
    //關閉地址彈窗
    closePop(closed) {
      this.areaShow = closed;
    },
    //關閉確認彈窗
    cancelBtn(closed) {
      this.dialogsShow = closed;
      this.dialogsTips = "";
    },
    //點擊確認執行方法
    confirmBtn() {
      this.dialogsShow = false;
      this.dialogsTips = "";
      if(this.dialogsType == 1){
        this.$router.go(-1);
      }else if(this.dialogsType == 2){
        this.deleteAddress()
      }else{

      }
    },
    //賦值組件對應地址對應地址組件對應地址對應地址
    selectArea(area) {
      console.log(area);
      this.userAddress.province = "710000";
      this.userAddress.cityname = area.city;
      this.userAddress.districtname = area.district;
      this.userAddress.city = area.cityid;
      this.userAddress.district = area.districtid;
      this.userAddress.POIName = area.POIName;
      this.userAddress.poiid = area.POIID;
      this.userAddress.Telno = area.Telno;
      if (this.$route.query.delivery === "7-11") {
        this.userAddress.address =
          area.address +
          "。 " +
          "店名：" +
          area.POIName +
          "。 " +
          "店號:" +
          area.POIID.trim() +
          "。 " +
          "電話： " +
          area.Telno.trim();
        this.verifyInput(this.userAddress.address, "[\\s\\S]*", "address");
      }
    },
    //提示驗證信息
    toastVerify() {
      if (this.verifyname == "") {
        this.$toast({
          message: "請輸入姓名",
          duration: 1000
        });
        return false;
      } else if (this.verifyname == "fail") {
        this.$toast({
          message: "請輸入有效的姓名",
          duration: 1000
        });
        return false;
      }

      if (this.verifyphone == "") {
        this.$toast({
          message: "請輸入電話號碼",
          duration: 1000
        });
        return;
      } else if (this.verifyphone == "fail") {
        this.$toast({
          message: "請輸入有效的電話號碼",
          duration: 1000
        });
        return false;
      }

      if (this.verifyaddress == "") {
        this.$toast({
          message: "請輸入詳細地址",
          duration: 1000
        });
        return false;
      } else if (this.verifyaddress == "fail") {
        this.$toast({
          message: "請輸入有效的詳細地址",
          duration: 1000
        });
        return false;
      }
      return true;
    },
    //驗證信息是否合法
    verifyInput(str, rexps, type, emptymsg, msg, time) {
      if (this.finishTimer) {
        window.clearTimeout(this.finishTimer);
      }
      //因為用了keyup事件、避免每次輸入都進行判斷 設置800ms延遲 如再無輸入才判斷
      this.finishTimer = setTimeout(() => {
        //正則表達式
        let rexp = new RegExp(rexps);
        if (str == "") {
          switch (type) {
            case "name":
              this.verifyname = "fail";
              break;
            case "phone":
              this.verifyphone = "fail";
              break;
            case "address":
              this.verifyaddress = "fail";
              break;
            default:
              return;
              break;
          }
          return;
        }
        if (rexp.test(str)) {
          switch (type) {
            case "name":
              this.verifyname = "pass";
              break;
            case "phone":
              this.verifyphone = "pass";
              break;
            case "address":
              this.verifyaddress = "pass";
              break;
            default:
              return;
              break;
          }
        } else {
          switch (type) {
            case "name":
              this.verifyname = "fail";
              break;
            case "phone":
              this.verifyphone = "fail";
              break;
            case "address":
              this.verifyaddress = "fail";
              break;
            default:
              return;
              break;
          }
        }
      }, 800);
    },
    //切換開關
    changeSwitch(checked) {
      if (checked) {
        this.userAddress.default = 1;
      } else {
        this.userAddress.default = 0;
      }
    },
    //新增用戶地址
    newAddress() {
      if (this.verifyUserInfo) {
        let params = this.userAddress;
        this.$Axios.post("/v1/user/created-address", params).then(res => {
          if (res.status == 200) {
            this.$router.push("delivery");
          }
        });
      }
    },
    //修改用戶地址
    modificationAddress() {
      if (this.verifyUserInfo) {
        let params = this.userAddress;
        this.$Axios.post("v1/user/update-address", params).then(res => {
          if (res.status == 200) {
            this.$router.push("delivery");
          }
        });
      }
    },
    //刪除用戶地址
    deleteAddress() {
      this.$Axios
        .post("v1/user/delete-address", { id: this.$route.query.id })
        .then(res => {
          if (res.status == 200) {
            this.$router.push("delivery");
          }
        });
    },
    //獲取query配送方式
    getShopMethod() {
      if (this.$route.query.delivery === "7-11") {
        this.userAddress.shipping_method = "711超商取貨";
      } else {
        this.userAddress.shipping_method = "黑貓宅急便";
      }
    },
    //獲取用戶修改地址數據
    getmodification() {
      let id = this.$route.query.id;
      this.$Axios.post("v1/user/query-address", { id: id }).then(res => {
        if (res.status == 200) {
          let parameter = res.data;
          console.log(parameter);
          //給變量賦值
          this.userAddress.consignee = parameter.consignee;
          this.userAddress.phone = parameter.phone;
          this.userAddress.id = parameter.id;
          this.userAddress.default = parameter.default;
          this.userAddress.shipping_method = parameter.shipping_method;
          this.userAddress.country = parameter.country;
          this.userAddress.address = parameter.address;
          this.userAddress.cityname = parameter.city;
          this.userAddress.districtname = parameter.district;
          this.userAddress.city = parameter.city_id;
          this.userAddress.district = parameter.district_id;
          //將需要的參數傳給組件
          this.areainfo.province = parameter.city;
          this.areainfo.city = parameter.district;
          this.areainfo.poiid = parameter.poiid;
          //根據字段切換默認按鈕
          if (this.userAddress.default == 1) {
            this.checked = true;
          } else {
            this.checked = false;
          }
          //修改驗證通過
          this.verifyname = "pass";
          this.verifyphone = "pass";
          this.verifyaddress = "pass";
        }
      });
    }
  },
  components: {
    setUpArea,
    diaLogs,
    headers
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/mixin.scss";

.manage-address {
  width: 100%;
  background-color: #f5f5f5;

  .headers {
    width: 100%;
    position: absolute;
    top: 0;
  }

  .information-list {
    width: 100%;
    position: absolute;
    top: 44px;
    background-color: #f5f5f5;

    ul {
      width: 100%;
      margin-bottom: 20px;
      background-color: #fff;
      li {
        width: 100%;
        height: 44px;
        padding: 0 15px;
        display: -webkit-flex;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 1px solid #f5f5f5;

        .left {
          color: #333;
          font-size: 14px;
        }

        .right {
          height: 100%;
          color: #aaa;
          font-size: 14px;
          display: -webkit-flex;
          display: flex;
          align-items: center;

          div {
            color: #aaa;
            font-size: 14px;
          }

          input {
            text-align: end;
            height: 100%;
            color: #333;
          }

          input::-webkit-input-placeholder {
            color: #aaa;
          }
          input::-moz-placeholder {
            /* Mozilla Firefox 19+ */
            color: #aaa;
          }
          input:-moz-placeholder {
            /* Mozilla Firefox 4 to 18 */
            color: #aaa;
          }
          input:-ms-input-placeholder {
            /* Internet Explorer 10-11 */
            color: #aaa;
          }

          i {
            margin-left: 15px;
          }
        }
      }

      .detailed {
        width: 100%;
        height: auto;
        padding: 17px 15px;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .title {
          color: #333;
          font-size: 14px;
          margin-bottom: 5px;
        }

        .tips {
          color: #aaa;
          font-size: 12px;
          margin-bottom: 17px;
        }

        .detailed-address-one {
          width: 100%;
          height: 88px;
          color: #333;
          font-size: 14px;
          padding: 10px;
          border: 1px solid #efefef;
          border-radius: 10px;
        }

        .detailed-address-two {
          width: 100%;
          color: #333;
          font-size: 14px;
        }

        input::-webkit-input-placeholder {
          color: #aaa;
        }
        input::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #aaa;
        }
        input:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: #aaa;
        }
        input:-ms-input-placeholder {
          /* Internet Explorer 10-11 */
          color: #aaa;
        }
      }
    }
  }

  .default-address {
    width: 100%;
    height: 44px;
    padding: 0 15px;
    background-color: #fff;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {
    }

    .right {
      .van-switch--on {
        background-color: #75cf6f;
      }
    }
  }

  .delete-address {
    width: 100%;
    height: 44px;
    padding: 0 15px;
    background-color: #fff;
    margin-top: 21px;
    display: -webkit-flex;
    display: flex;
    align-items: center;

    span {
      color: red;
    }
  }

  .confirme-bn {
    width: 100%;
    height: 55px;
    background-color: #fff;
    padding: 7px 15px;
    position: absolute;
    bottom: 0;

    .btn {
      @include flex-center;
      width: 100%;
      height: 42px;
      background-color: #efefef;
      color: #777777;
      font-size: 15px;
    }

    .active-btn {
      background-color: #d4b56c;
      color: #fff;
    }
  }
}
</style>
