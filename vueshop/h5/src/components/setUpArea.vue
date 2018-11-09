<template>
  <section class="address">
    <section class="adress-title">
      <span></span>
      <span class="title">選擇門市</span>
      <i name="close" class="close iconfont icon-ic_close_normal" @click="closePopup"></i>
    </section>
    <section class="area-bar">
      <span class="area" @click="provinceSelected()" :class="{'active': showProvince}">{{Province?Province:'請選擇'}}</span>
      <span class="area" @click="citySelected()" :class="{'active': showCity}" v-show="Province">{{City?City:'請選擇'}}</span>
      <span class="area" @click="districtSelected()" :class="{'active': showDistrict}" v-show="City&&this.$route.query.delivery === '7-11'">{{District?District:'請選擇'}}</span>
    </section>
    <ul id="addUl">
      <li class="addList" ref="psh" id="psh" v-for="(v,k) in info" @click="getProvinceId(v.id, v.name, k, v, $event)" v-show="showProvince" :class="v.selected ? 'active': '' ">
        <span class="v-name">{{v.name}}</span>
        <i v-show="v.selected" class="right iconfont icon-ic_user_selectedb_no"></i>
      </li>
      <li class="addList" ref="csh" id="csh" v-for="(v,k) in showCityList" @click="getCityId(v.id, v.name, k, v, $event)" v-show="showCity" :class="v.selected ? 'active' : ''">
        <span class="v-name">{{v.name}}</span>
        <i v-show="v.selected" class="right iconfont icon-ic_user_selectedb_no"></i>
      </li>
      <li class="addList" ref="dsh" id="dsh" v-for="(v,k) in showDistrictList" @click="getDistrictId(v.id, v.Address, k, v, $event)" v-show="showDistrict" :class="v.selected ? 'active' : ''">
        <span class="v-name">{{v.POIName}}&nbsp;—&nbsp;{{v.Address}}</span>
        <i v-show="v.selected" class="right iconfont icon-ic_user_selectedb_no"></i>
      </li>
    </ul>
  </section>
</template>
<script>
import { Popup } from "vant";
export default {
  created() {},
  mounted() {
    this.getAreaData();
  },
  props: ["areainfo"],
  data() {
    return {
      userArea: {
        //市
        city: "",
        //地區
        district: "",
        //市id
        cityid: null,
        //地區id
        districtid: null,
        //店名
        POIName: "",
        //店號
        POIID: "",
        //電話
        Telno: "",
        //7-11詳細地址
        address: "",
      },
      show: false,
      //顯示省份
      showProvince: true,
      //省份id
      province: false,
      //省份滾動條高度
      provinceScrollTop: 0,
      //省份名字
      Province: false,
      //顯示市區
      showCity: false,
      //市區清單
      showCityList: false,
      //市區id
      city: false,
      //市區滾動條高度
      cityScrollTop: 0,
      //市區名字
      City: false,
      //顯示地區
      showDistrict: false,
      //地區清單
      showDistrictList: false,
      //地區id
      district: false,
      //地區滾動條高度
      districtScrollTop: 0,
      //地區名字
      District: false,
      //v-for判斷是否為當前
      selected: false,
      //遍歷地址數據
      info: [],
      //是否是第一次修改地
      first: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    //初始化數據
    initArea(areainfo) {
      this.first = true;
      this.info.forEach((ele, index) => {
        if (ele.name === areainfo.province) {
          this.getProvinceId(ele.id, ele.name, index, ele);
        }
      });
      this.$nextTick(() => {
        this.showCityList.forEach((ele, index) => {
          if (ele.name === areainfo.city) {
            this.getCityId(ele.id, ele.name, index, ele);
          }
        });
      });
    },
    //獲取地區數據
    getAreaData() {
      this.$Axios.post("v1/user/ajax-address", { type: 1 }).then(res => {
        if (res.status == 200) {
          let area = res.data[0].area;
          area.forEach(ele => {
            if (ele.name == "台湾省") {
              this.info = ele.info;
              this.$nextTick(() => {
                //如果是修改地址的話 執行initArea方法將組建里的市、地區、711店鋪選上
                if (this.$route.query.id) {
                  this.initArea(this.areainfo);
                }
              });
            }
          });
        }
      });
    },
    //關閉遮罩層
    closePopup() {
      this.$emit("closePopup", false);
    },
    //三級聯動過濾下一層級數據
    _filter(add, name, code) {
      let result = [];
      for (let i = 0; i < add.length; i++) {
        if (code == add[i].id) {
          result = add[i][name];
        }
      }
      return result;
    },
    //選擇第一層級 顯示對應數據(地址nav欄)
    provinceSelected: function() {
      this.showProvince = true;
      this.showCity = false;
      this.showDistrict = false;
      setTimeout(() => {
        var ulh = document.getElementById("addUl");
        ulh.scrollTop = this.provinceScrollTop;
      }, 100);
    },
    //選擇市的具體數據
    getProvinceId(code, input, index, item, e) {
      //判斷第一次是否第一次進入？ 修改地址有初始的數據了 不通過點擊將數據賦值（模擬）
      if (this.first == false) {
        //通過點擊獲取該元素距離窗口滾動高度，為了讓選中的數據在第一條展示
        this.provinceScrollTop =
          (e.target.getBoundingClientRect().height + 10) * index;
      } else {
        //通過初始化的index取該元素距離窗口滾動高度，為了讓選中的數據在第一條展示
        this.provinceScrollTop =
          (this.$refs.psh[index].offsetHeight + 10) * index;
      }
      //獲取該窗口  賦值 設置crollTop進行滾動
      var ulh = document.getElementById("addUl");
      ulh.scrollTop = this.provinceScrollTop;
      //清除市级和区级列表
      this.showDistrictList = false;
      this.showCityList = false;
      //清除市级和区级选项
      this.City = false;
      this.District = false;
      // 选项页面的切换
      this.province = code;
      this.Province = input;
      this.showProvince = false;
      this.showCity = true;
      this.showDistrict = false;
      this.showCityList = this._filter(this.info, "city", this.province);
      //都加上未選中狀態
      this.info.map(a => (a.selected = false));
      //目標選中
      this.info[index].selected = true;
      this.userArea.cityid = item.id;
       this.userArea.city = item.name;
    },
    citySelected: function() {
      this.showProvince = false;
      this.showDistrict = false;
      this.showCity = true;
      setTimeout(() => {
        var ulh = document.getElementById("addUl");
        ulh.scrollTop = this.cityScrollTop;
      }, 100);
    },

    getCityId(code, input, index, item, e) {
      if (this.first == false) {
        this.cityScrollTop =
          (e.target.getBoundingClientRect().height + 10) * index;
      } else {
        this.cityScrollTop = (this.$refs.csh[index].offsetHeight + 10) * index;
      }
      var ulh = document.getElementById("addUl");
      ulh.scrollTop = this.cityScrollTop;
      // 清除市级和区级列表
      this.showDistrictList = false;
      //清除市级和区级选项
      this.District = false;
      this.city = code;
      this.City = input;
      this.showProvince = false;
      // 选择当前添加active
      this.showCityList.map(a => (a.selected = false));
      this.showCityList[index].selected = true;
      this.userArea.districtid = item.id;
      this.userArea.district = item.name;
      if (this.$route.query.delivery === "7-11") {
        let params = {
          type: 2,
          city: this.userArea.city,
          town: this.userArea.district
        };
        //選中市和地區 請求7-11店鋪地址
        this.$Axios.post("v1/user/ajax-address", params).then(res => {
          if (res.status == 200) {
            let district = JSON.parse(res.data);
            item.district = district.GeoPosition;
            this.showCity = false;
            this.showDistrict = true;
            this.showDistrictList = this._filter(
              this.showCityList,
              "district",
              this.city
            );
            //如果是修改地址的話 711店鋪選上
            if (this.$route.query.id) {
              this.$nextTick(() => {
                this.showDistrictList.forEach((ele, index) => {
                  if (ele.POIID == +this.areainfo.poiid) {
                    this.getDistrictId(ele.id, ele.Address, index, ele);
                  }
                });
              });
            }
          }
        });
      } else {
        //修改地址的時候不觸發
        if (this.first == false) {
          //選中完成后向父組件提交數據
          this.$emit("closePopup", false);
          this.$emit("selectArea", this.userArea);
        }
      }
      //配送方式為黑貓宅急便不需要選擇門店
      if (this.$route.query.delivery == "黑貓宅急便") {
        this.first = false;
      }
    },

    districtSelected: function() {
      // this.District = false;
      this.showProvince = false;
      this.showCity = false;
      this.showDistrict = true;

      // this.showDistrict = false;
      setTimeout(() => {
        var ulh = document.getElementById("addUl");
        ulh.scrollTop = this.districtScrollTop;
      }, 100);
    },

    getDistrictId: function(code, input, index, item, e) {
      if (this.$route.query.delivery === "7-11") {
        if (this.first == false) {
          this.districtScrollTop =
            (e.target.getBoundingClientRect().height + 10) * index;
        } else {
          this.districtScrollTop =
            (this.$refs.dsh[index].offsetHeight + 10) * index;
        }
        var ulh = document.getElementById("addUl");
        ulh.scrollTop = this.districtScrollTop;
        console.log(input)
        this.userArea.address = input;
        this.userArea.POIName = item.POIName;
        this.userArea.POIID = item.POIID;
        this.userArea.Telno = item.Telno;
        this.district = code;
        this.District = item.POIName;
        // 选择当前添加active
        this.showDistrictList.map(a => (a.selected = false));
        this.showDistrictList[index].selected = true;
        if (this.first == false) {
          // 选取市区选项之后关闭弹层
          this.$emit("closePopup", false);
          this.$emit("selectArea", this.userArea);
        }
      }
      this.first = false;
    }
  },
  components: {}
};
</script>
<style lang="scss" scoped>
@import "../styles/mixin.scss";
.address {
  width: 100%;
  .adress-title {
    width: 100%;
    height: 50px;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.1rem 0.2rem;

    .title {
      @include fz(15px);
      color: #888888;
    }

    .close {
      @include fz(12px);
      color: #333333;
    }
  }

  .area-bar {
    width: 100%;
    height: 31px;
    font-size: 15px;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    border-bottom: 0.01rem solid #e6e6e6;

    span {
      height: 100%;
      margin-left: 0.3rem;
      color: #333333;
      padding: 0.1rem;
      display: flex;
      align-items: center;
    }

    .active {
      border-bottom: 0.01rem solid #d4b56c;
      color: #d4b56c;
    }
  }
  ul {
    width: 100%;
    display: block;
    height: 370px;
    overflow: scroll;

    .addList {
      width: 100%;
      // height: 35px;
      font-size: 15px;
      color: #333333;
      display: -webkit-flex;
      display: flex;
      align-items: center;
      margin: 10px 0;

      .v-name {
        height: 100%;
        font-size: 15px;
        display: -webkit-flex;
        display: flex;
        align-items: center;
        padding: 0 15px;
      }

      .right {
        margin-left: 10px;
        font-size: 9px;
      }
    }

    .active {
      color: #d4b56c;
    }
  }
}
</style>
