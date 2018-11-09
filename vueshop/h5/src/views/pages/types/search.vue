<template>
  <div class="search" id="search">
    <div class="search_outter">
      <div class="search_box">
        <span class="left">
          <i class="magnifying">
            <img src="../../../assets/search/magnifying@2x.png" @click="searchProduct">
          </i>
          <input type="text" class="search_input" placeholder="請輸入關鍵詞進行搜索" v-model="searchRecord.queryStr">
        </span>
        <span class="right">
          <i class="clear" @click="clearContent">
            <img src="../../../assets/search/clear@2x.png">
          </i>
        </span>
      </div>
      <div class="search_return" @click="returnOrFiltrate">{{searchReturn}}</div>
    </div>
    <div class="history_outter" v-if="changeshow">
      <div class="history_box">
        <div class="history_title">
          <span class="left">歷史搜索</span>
          <i class="right">
            <img src="../../../assets/search/delet@2x.png">
          </i>
        </div>
        <div class="history_content">
          <span class="history_item" v-for="(item,index) in searchhistory">{{item.content}}</span>
        </div>
      </div>
      <div class="classify_box">
        <div class="classify_title">
          <span class="left">常用分類</span>
          <i class="right"></i>
        </div>
        <div class="classify_content">
          <span class="classify_item" v-for="(item,index) in classify" :key="index">{{item.name}}</span>
        </div>
      </div>
    </div>
    <div class="not_found" v-if="notfound">
      <p>抱歉，沒有找到與 &Prime;{{errortips}}&Prime;相關的商品</p>
    </div>
    <div class="goods_outter" v-if="searchshow">
      <ul class="sorting_column">
        <li v-for="(item,index) in sorting" @click="pitchonItem(item)" :class="{'active': item.pitchon == 1||item.select == 1}">{{item.content}}
          <i v-if="item.content == '綜合排序'">
            <img src="../../../assets/search/downward@2x.png" :class="item.reversal == 0? 'uparrow':'downarrow'" v-if="item.pitchon == 1">
            <img src="../../../assets/search/garyward@2x.png" :class="item.reversal == 0? 'uparrow':'downarrow'" v-if="item.pitchon == 0">
          </i>
        </li>
      </ul>
      <ul class="sorting_options">
        <li v-for="(item,index) in sortingpotions" @click="pitchonTick(item)" v-show="optionshow">
          {{item.content}}
          <i v-show="item.pitchon">
            <img src="../../../assets/search/tick@2x.png">
          </i>
        </li>
      </ul>
    </div>
    <div class="filtrate" v-show="filtrateshow" :class="{'filactive': filtrateshow == true}">
      <div class="filtrate_title">
        <i class="iconfont icon-ic_back_normal" @click="closeFiltrate"></i>
        <i class="filtrate_title">篩選</i>
        <i class="filtrate_reset" @click="filtrateReset">重置</i>
      </div>
      <div class="filtrate_classify">
        分類
      </div>
      <ul class="classify_nav">
        <li class="icon" v-for="(item,index) in classifypotions" @click="pitchonClassify(item)" :class="{'active':item.pitchon == 1}">
          <i :class="item.img"></i>
          <span>{{item.content}}</span>
        </li>
      </ul>
      <div class="price_range">
        <div class="title">價格區間</div>
        <div class="scope">
          <ul>
            <li v-for="(item,index) in classifyprice" @click="filtratePrice(item)" :class="{'active': item.is_select == 1}">{{item.parameter}}</li>
          </ul>
        </div>
      </div>
      <div class="confirm">
        <div class="confirm_btn" @click="submitFiltrate">確定</div>
      </div>
    </div>
    <div class="masklayer" :class="{'maskactive':filtrateshow == true}" v-show="shadeshow" @click="closeMasklayer()"></div>
    <div class="water_outter" v-if="searchshow">
      <vueWaterfallEasy ref="waterfall" :imgsArr="imgsArr" @click="pitchonProduct">
        <!-- @scrollReachBottom="fetchImgsData" -->
        <template slot-scope="props">
          <div class="prd_info">
            <p class="prd_name">{{props.value.name}}</p>
            <p class="prd_price">NT${{props.value.price}}</p>
            <p class="prd_title">{{props.value.type}}</p>
          </div>
        </template>
        <div slot="waterfall-over">我瀑布流也是有底線的！</div>
      </vueWaterfallEasy>
    </div>
  </div>
</template>
<script>
import vueWaterfallEasy from "../../../components/vue-waterfall-easy";
export default {
  name: "srarch",
  created() {},
  mounted() {
    // window.onresize监听页面高度的变化
    window.onresize = () => {
      return (() => {
        document.body.height = document.body.clientHeight;
      })();
    };
    this.initializeData();
    if (this.$route.query.name) {
      this.searchRecord.queryStr = this.$route.query.name;
      this.searchProduct();
    }
  },
  data() {
    return {
      //搜索記錄
      searchRecord: {
        orderBy: "id desc",
        queryStr: "",
        type: "",
        price: "",
        category: ""
      },
      //錯誤提示語
      errortips: "",
      //記錄圖片起始
      star: 7,
      //記錄圖片結束
      end: 9,
      //圖片大小
      imgsWidth: 80,
      //篩選&取消
      searchReturn: "取消",
      //圖片集合
      imgData: [],
      //後備圖片數組
      imgsArr: [],
      //後備圖片數組
      fetchImgsArr: [],
      //未找到商品后的提示
      notfound: false,
      //搜索頁面顯示
      searchshow: false,
      //排序選項顯示
      optionshow: false,
      //遮罩層顯示
      shadeshow: false,
      //篩選顯示
      filtrateshow: false,
      //控制元素切換
      changeshow: true,
      //默认屏幕高度
      docmHeight: document.documentElement.clientHeight,
      //实时屏幕高度
      showHeight: document.documentElement.clientHeight,
      //搜索歷史記錄
      searchhistory: [
        { content: "珠寶首飾 18K金" },
        { content: "鑽戒玫瑰金渡銀" },
        { content: "手鐲" },
        { content: "女士戒指" },
        { content: "925銀色" },
        { content: "銀渡金色" }
      ],
      //常用分類
      classify: [],
      //暫存分類id
      momentId: 0,
      //暫存價錢
      momentPrice: 0,
      //排序按鈕
      sorting: [
        {
          content: "綜合排序",
          pitchon: 0,
          reversal: 1
        },
        {
          content: "推荐",
          pitchon: 0,
          select: 0
        },
        {
          content: "新品",
          pitchon: 0,
          select: 0
        },
        {
          content: "热卖",
          pitchon: 0,
          select: 0
        }
      ],
      //排序選項
      sortingpotions: [
        {
          content: "綜合排序",
          pitchon: 0
        },
        {
          content: "價格升序",
          pitchon: 0
        },
        {
          content: "價格降序",
          pitchon: 0
        }
      ],
      //分類選項
      classifypotions: [
        {
          content: "項鏈",
          img: "iconfont icon-ic_user_jif_normal",
          pitchon: 0,
          id: 3
        },
        {
          content: "戒指",
          img: "iconfont icon-ic_user_jif_normal",
          pitchon: 0,
          id: 5
        },
        {
          content: "耳飾",
          img: "iconfont icon-ic_user_jif_normal",
          pitchon: 0,
          id: 4
        },
        {
          content: "手鏈",
          img: "iconfont icon-ic_user_jif_normal",
          pitchon: 0,
          id: 1
        }
      ],
      //分類價格
      classifyprice: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    //清空搜索內容
    clearContent() {
      this.searchRecord.queryStr = "";
    },
    //清除對象中的空屬性
    deletObj(obj) {
      for (let key in obj) {
        if (
          obj.hasOwnProperty(key) &&
          (obj[key] == null || obj[key] == undefined || obj[key] == "")
        ) {
          delete obj[key];
        }
      }
      return obj;
    },
    //初始化頁面獲取數據
    initializeData() {
      this.$Axios.post("v1/site/search", { orderBy: "id desc" }).then(res => {
        if (res.status == 200) {
          console.log(res);
          res.data.data.price.forEach(ele => {
            ele.is_select = 0;
          });
          this.classifyprice = res.data.data.price;
          this.classify = res.data.data.category;
          console.log(this.classifyprice);
        }
      });
    },
    //篩選商品
    filtrateProduct() {},
    //選擇綜合排序
    pitchonItem(item) {
      if (item.content == "綜合排序") {
        this.optionshow = !this.optionshow;
        this.shadeshow = !this.shadeshow;
        item.reversal = !item.reversal;
        item.pitchon = !item.pitchon;
      } else {
        this.optionshow = false;
        this.shadeshow = false;
        this.sorting.forEach(ele => {
          ele.reversal = 1;
          if(ele.content == "綜合排序") {
            ele.pitchon = 0;
          }
        });
        if (item.select != 0) {
          item.select = !item.select;
          this.searchRecord.type = "all";
        } else {
          this.sorting.forEach(ele => {
            ele.select = 0;
          });
          item.select = !item.select;
          this.searchRecord.type = item.content;
          console.log(item);
        }

        let params = this.deletObj(this.searchRecord);
        console.log(params);
        this.$Axios.post("v1/site/search", params).then(res => {
          if (res.status == 200) {
            res.data.data.product.data.forEach(ele => {
              ele.thumb = "https://www.saritier.com/" + ele.thumb;
              this.$set(ele, "src", ele.thumb);
            });

            if (res.data.data.product.data.length !== 0) {
              // this.imgData = res.data.data.product.data;
              // this.imgsArr = this.initImgsArr(0, 7);
              this.imgsArr = res.data.data.product.data;
              this.optionshow = false;
              this.shadeshow = false;
              this.notfound = false;
              this.searchshow = true;
            } else {
              this.imgsArr = [];
              this.notfound = true;
              this.searchshow = false;
              this.optionshow = false;
              this.shadeshow = false;
              this.filtrateshow = false;
              this.changeshow = false;
              this.searchReturn = "取消";
            }
          }
        });
      }
    },
    //選擇綜合排序子選項
    pitchonTick(item) {
         this.sorting.forEach(ele => {
          ele.reversal = 1;
          if(ele.content == "綜合排序") {
            ele.pitchon = 0;
          }
        });
      this.sortingpotions.forEach(ele => {
        ele.pitchon = 0;
      });
      item.pitchon = !item.pitchon;
      switch (item.content) {
        case "綜合排序":
          this.searchRecord.orderBy = "id desc";
          break;
        case "價格升序":
          this.searchRecord.orderBy = "price asc";
          break;
        case "價格降序":
          this.searchRecord.orderBy = "price desc";
          break;
        default:
          this.searchRecord.orderBy = "id desc";
          break;
      }
      let params = this.deletObj(this.searchRecord);
      console.log(params);
      this.$Axios.post("v1/site/search", params).then(res => {
        if (res.status == 200) {
          res.data.data.product.data.forEach(ele => {
            ele.thumb = "https://www.saritier.com/" + ele.thumb;
            this.$set(ele, "src", ele.thumb);
          });

          if (res.data.data.product.data.length !== 0) {
            // this.imgData = res.data.data.product.data;
            // this.imgsArr = this.initImgsArr(0, 7);
            this.imgsArr = res.data.data.product.data;
            this.optionshow = false;
            this.shadeshow = false;
            this.notfound = false;
            this.searchshow = true;
          } else {
            this.imgsArr = [];
            this.notfound = true;
            this.searchshow = false;
            this.optionshow = false;
            this.shadeshow = false;
            this.filtrateshow = false;
            this.changeshow = false;
            this.searchReturn = "取消";
          }
        }
      });
    },
    //選擇商品
    pitchonProduct(event, { index, value }) {
      // 阻止a标签跳转
      event.preventDefault();
      // 只有当点击到图片时才进行操作
      if (event.target.tagName.toLowerCase() == "img") {
        console.log(value.id);
        this.$router.push({
          path: "/product",
          query: {
            dataObj: value.id
          }
        });
      }
    },
    //關閉遮罩層
    closeMasklayer() {
      this.shadeshow = false;
      this.optionshow = false;
      this.filtrateshow = false;
      this.momentId = "";
      this.momentPrice = "";
    },
    //初始化圖片數組
    initImgsArr(n, m) {
      //num 图片数量
      var arr = [];
      for (var i = n; i < m; i++) {
        arr.push(this.imgData[i]);
      }
      return arr;
    },

    //滾動加載圖片數組
    fetchImgsData() {
      this.fetchImgsArr = [];
      if (this.end > this.imgData.length) {
        if (this.imgData.length % 2 == 0) {
          this.star = this.imgData.length - 1;
          this.end = this.imgData.length;
          this.fetchImgsArr = this.initImgsArr(this.star, this.end);
          this.imgsArr = this.imgsArr.concat(this.fetchImgsArr);
        }
        this.$refs.waterfall.waterfallOver();
        return;
      } else {
        this.fetchImgsArr = this.initImgsArr(this.star, this.end);
        this.imgsArr = this.imgsArr.concat(this.fetchImgsArr);
        this.star += 2;
        this.end += 2;
      }
    },
    //後退&彈出篩選頁面
    returnOrFiltrate() {
      if (this.searchReturn == "取消") {
        this.$router.go(-1);
      } else {
        this.filtrateshow = true;
        this.shadeshow = true;
        this.optionshow = false;
      }
    },
    //關閉篩選頁面
    closeFiltrate() {
      this.filtrateshow = false;
      this.shadeshow = false;
      this.momentId = "";
      this.momentPrice = "";
    },
    //搜索商品
    searchProduct() {
      console.log(this.searchRecord);
      let params = this.deletObj(this.searchRecord);
      this.$Axios.post("v1/site/search", params).then(res => {
        if (res.status == 200) {
          res.data.data.product.data.forEach(ele => {
            ele.thumb = "https://www.saritier.com/" + ele.thumb;
            this.$set(ele, "src", ele.thumb);
          });
          if (res.data.data.product.data.length !== 0) {
            // this.imgData = res.data.data.product.data;
            // this.imgsArr = this.initImgsArr(0, 7);
            this.imgsArr = res.data.data.product.data;
            this.changeshow = false;
            this.searchshow = true;
            this.notfound = false;
            this.searchshow = true;
            this.searchReturn = "篩選";
          } else {
            this.imgsArr = [];
            this.notfound = true;
            this.searchshow = false;
            this.optionshow = false;
            this.shadeshow = false;
            this.filtrateshow = false;
            this.changeshow = false;
            this.searchReturn = "取消";
            this.errortips = this.searchRecord.queryStr;
          }
        }
      });
    },
    //選擇分類
    pitchonClassify(item) {
      this.classifypotions.forEach(ele => {
        ele.pitchon = 0;
      });
      item.pitchon = !item.pitchon;
      this.momentId = item.id;
      this.errortips = item.content
      // this.searchRecord.category = item.id;
    },
    //篩選價格
    filtratePrice(item) {
      this.classifyprice.forEach(ele => {
        ele.is_select = 0;
      });
      item.is_select = !item.is_select;
      this.momentPrice = item.id;
      // this.searchRecord.price = item.id;
    },
    //提交篩選
    submitFiltrate() {
      this.searchRecord.category = this.momentId;
      this.searchRecord.price = this.momentPrice;
      this.sorting.forEach(ele => {
        ele.pitchon = 0;
      });
      this.sortingpotions.forEach(ele => {
        ele.pitchon = 0;
      });
      this.classifypotions.forEach(ele => {
        if (ele.pitchon == 1) {
          this.searchRecord.queryStr = "";
        }
      });
      this.searchRecord.orderBy = "id desc";
      this.searchRecord.type = "";
      let params = this.deletObj(this.searchRecord);
      this.$Axios.post("v1/site/search", params).then(res => {
        console.log(res.status);
        if (res.status == 200) {
          res.data.data.product.data.forEach(ele => {
            ele.thumb = "https://www.saritier.com/" + ele.thumb;
            this.$set(ele, "src", ele.thumb);
          });
          if (res.data.data.product.data.length !== 0) {
            // this.imgData = res.data.data.product.data;
            // this.imgsArr = this.initImgsArr(0, 7);
            this.imgsArr = res.data.data.product.data;
            this.optionshow = false;
            this.shadeshow = false;
            this.filtrateshow = false;
            this.notfound = false;
            this.searchshow = true;
          } else {
            this.imgsArr = [];
            this.notfound = true;
            this.searchshow = false;
            this.optionshow = false;
            this.shadeshow = false;
            this.filtrateshow = false;
            this.changeshow = false;
            this.searchReturn = "取消";
          }
        }
      });
    },
    //篩選重置
    filtrateReset() {
      this.classifypotions.forEach(ele => {
        ele.pitchon = 0;
      });
      this.classifyprice.forEach(ele => {
        ele.is_select = 0;
      });
      this.momentId = "";
      this.momentPrice = "";
    }
  },
  components: {
    vueWaterfallEasy
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/mixin.scss";
.search {
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .masklayer {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #333333;
    opacity: 0.5;
    z-index: 100;
  }

  .maskactive {
    z-index: 101;
  }

  .search_outter {
    // position: fixed;
    background-color: #fff;
    height: 44px;
    display: -webkit-flex;
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 101;

    .search_return {
      color: #333333;
      @include fz(15px);
      // font-weight: 600;
      margin-right: 10px;
    }

    .search_box {
      width: 295px;
      height: 30px;
      background-color: #f7f7f7;
      display: -webkit-flex;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .left {
        display: -webkit-flex;
        display: flex;
        .magnifying {
          width: 17px;
          height: 17px;
          display: inline-block;
          margin-left: 10px;
          img {
            width: 100%;
          }
        }

        .search_input {
          margin-left: 12px;
          background-color: #f7f7f7;
          color: #888888;
          @include fz(13px);
        }
      }

      .right {
        display: -webkit-flex;
        display: flex;
        .clear {
          width: 22px;
          height: 22px;
          display: inline-block;
          margin-right: 6px;
          img {
            height: 100%;
          }
        }
      }
    }

    .search_return {
      color: #333;
      @include fz(15px);
    }
  }

  .history_outter {
    position: absolute;
    top: 44px;
    padding: 0 15px;
    border-top: 1px solid #f7f7f7;
    .history_box {
      margin-bottom: 20px;
      .history_title {
        height: 40px;
        display: -webkit-flex;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left {
          color: #333333;
          @include fz(15px);
          font-weight: 600;
        }

        .right {
          width: 22px;
          height: 22px;

          img {
            height: 100%;
          }
        }
      }

      .history_content {
        width: 100%;
        .history_item {
          margin-top: 10px;
          margin-right: 10px;
          display: inline-block;
          padding: 10px 17px 11px 17px;
          background-color: #f5f5f5;
          color: #333;
          @include fz(13px);
        }
      }
    }

    .classify_box {
      .classify_title {
        height: 40px;
        display: -webkit-flex;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left {
          color: #333333;
          @include fz(15px);
          font-weight: 600;
        }
      }

      .classify_content {
        width: 100%;
        .classify_item {
          margin-top: 10px;
          margin-right: 10px;
          display: inline-block;
          padding: 10px 38px 11px 38px;
          background-color: #f5f5f5;
          color: #333;
          @include fz(13px);
        }
      }
    }
  }

  .not_found {
    width: 100%;
    @include flex-center;
    p {
      width: 209px;
      text-align: center;
      padding: 24px;
      color: #333;
    }
  }

  .goods_outter {
    background-color: #fff;
    z-index: 101;
    position: absolute;
    top: 41px;
    padding: 0 15px;
    width: 100%;
    .sorting_column {
      width: 100%;
      height: 44px;
      display: -webkit-flex;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 8px;

      li {
        color: #777777;
        margin-right: 10px;
        padding: 5px 18px;
        border: 1px solid #cccccc;
        @include fz(13px);
        display: flex;
        align-items: center;

        i {
          width: 9px;
          height: 5px;
          display: flex;
          align-items: center;
          margin-left: 2px;
          img {
            width: 100%;
            height: 100%;
          }

          .uparrow {
            animation: uparrow 200ms forwards;
            -webkit-animation: uparrow 200ms forwards;
          }

          .downarrow {
            animation: downarrow 200ms;
            -webkit-animation: downarrow 200ms;
          }

          @keyframes uparrow {
            0% {
              transform: rotate(-30deg);
            }
            20% {
              transform: rotate(-60deg);
            }

            40% {
              transform: rotate(-90deg);
            }
            60% {
              transform: rotate(-120deg);
            }
            80% {
              transform: rotate(-150deg);
            }
            100% {
              transform: rotate(-180deg);
            }
          }

          @-webkit-keyframes uparrow {
            0% {
              -webkit-transform: rotate(-30deg);
            }
            20% {
              -webkit-transform: rotate(-60deg);
            }

            40% {
              -webkit-transform: rotate(-90deg);
            }
            60% {
              -webkit-transform: rotate(-120deg);
            }
            80% {
              -webkit-transform: rotate(-150deg);
            }
            100% {
              -webkit-transform: rotate(-180deg);
            }
          }

          @keyframes downarrow {
            0% {
              transform: rotate(30deg);
            }
            20% {
              transform: rotate(60deg);
            }

            40% {
              transform: rotate(90deg);
            }
            60% {
              transform: rotate(120deg);
            }
            80% {
              transform: rotate(150deg);
            }
            100% {
              transform: rotate(180deg);
            }
          }

          @-webkit-keyframes downarrow {
            0% {
              -webkit-transform: rotate(30deg);
            }
            20% {
              -webkit-transform: rotate(60deg);
            }

            40% {
              -webkit-transform: rotate(90deg);
            }
            60% {
              -webkit-transform: rotate(120deg);
            }
            80% {
              -webkit-transform: rotate(150deg);
            }
            100% {
              -webkit-transform: rotate(180deg);
            }
          }
        }
      }

      .active {
        color: #d4b56c;
        border-color: #d4b56c;
        background-color: #f7f7f7;
      }
    }

    .sorting_options {
      width: 100%;
      li {
        border-bottom: 1px solid #eeeeee;
        height: 44px;
        display: -webkit-flex;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #333333;
        cursor: pointer;
        @include fz(14px);

        i {
          width: 14px;
          height: 10px;
          display: inline-block;
          display: flex;
          align-items: center;
          margin-right: 10px;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }

  .filtrate {
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: 102;
    position: absolute;
    right: -90%;
    // padding: 0 15px;
    width: 90%;

    .filtrate_title {
      padding: 0 15px;
      height: 44px;
      display: -webkit-flex;
      display: flex;
      align-content: center;
      justify-content: space-between;

      i {
        @include flex-center;
      }

      .filtrate_title {
        @include fz(17px);
      }

      .filtrate_reset {
        @include fz(14px);
      }
    }

    .filtrate_classify {
      padding: 0 15px;
      height: 44px;
      display: -webkit-flex;
      display: flex;
      align-items: center;
      color: 333333;
      @include fz(15px);
    }

    .classify_nav {
      padding: 0 15px;
      display: -webkit-flex;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .icon {
        width: 83px;
        height: 83px;
        flex-direction: column;
        color: #999999;
        @include flex-center;

        i {
          font-size: 25px;
          @include flex-center;
          margin-bottom: 8px;
        }

        span {
          // color: #999999;
          @include fz(13px);
        }
      }

      .active {
        color: #dab45f;
      }
    }

    .price_range {
      padding: 0 15px;
      .title {
        height: 44px;
        display: -webkit-flex;
        align-items: center;
        display: flex;
        color: 333333;
        @include fz(15px);
      }

      .scope {
        ul {
          width: 100%;
          display: -webkit-flex;
          display: flex;
          flex-wrap: wrap;

          li {
            width: 115px;
            height: 33px;
            background-color: #f6f6f6;
            color: #333;
            border-radius: 8px;
            margin-right: 14px;
            margin-bottom: 15px;
            @include fz(15px);
            @include flex-center;
          }

          .active {
            background-color: #dab45f;
            color: #fff;
          }
        }
      }
    }

    .confirm {
      width: 100%;
      height: 65px;
      position: absolute;
      bottom: 0;
      border-top: 1px solid #cccccc;
      @include flex-center;

      .confirm_btn {
        width: 301px;
        height: 45px;
        background-color: #333333;
        color: #fff;
        @include flex-center;
      }
    }
  }

  .filactive {
    animation: filtrateA 200ms forwards;
    -webkit-animation: filtrateA 200ms forwards;
  }

  @keyframes filtrateA {
    0% {
      right: -90%;
    }
    20% {
      right: -70%;
    }
    40% {
      right: -50%;
    }
    60% {
      right: -30%;
    }
    80% {
      right: -10%;
    }
    100% {
      right: 0%;
    }
  }

  @-webkit-keyframes filtrateA {
    0% {
      right: -90%;
    }
    20% {
      right: -70%;
    }
    40% {
      right: -50%;
    }
    60% {
      right: -30%;
    }
    80% {
      right: -10%;
    }
    100% {
      right: 0%;
    }
  }

  .water_outter {
    width: 100%;
    position: absolute;
    top: 84px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    padding: 0 15px;
    margin-top: 10px;

    .prd_info {
      width: 100%;

      .prd_name {
        color: #333333;
        @include fz(13px);
        text-align: center;
        margin-bottom: 8px;
      }

      .prd_price {
        color: #333333;
        @include fz(16px);
        text-align: center;
        margin-bottom: 4px;
      }

      .prd_title {
        color: #aaaaaa;
        @include fz(10px);
        text-align: center;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
