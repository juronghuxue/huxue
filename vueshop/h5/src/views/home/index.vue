<template>
  <div class="home">
  <!--首頁開始啦-->
    <!--首頁頭部-->
    <header class="m-top-nav">
        <div class="m-logo">
          <i></i>
          <i class="iconfont icon-logo"></i>
          <div class="position:relative">
            <i class="iconfont icon-ic_home_shop_unsele" style="font-size: 20px;font-weight: 600"></i>
            <div style="min-width:15px;min-height:15px;background: #DF5E58;border-radius: 50%;position: absolute;right:15px;top:6px;color:#fff;text-align: center">{{cartNumt}}</div>
          </div>

        </div>
        <router-link class="m-search" to="/types/search">
          <div>
              <i class="iconfont icon-ic_home_search_norma"></i>
              <span>搜索你的精致生活</span>
          </div>
        </router-link>
    </header>

    <main class="m-wrap">
      <!--首頁輪播-->
      <div class="m-swiper">
        <van-swipe :autoplay="3000">
          <van-swipe-item  v-for="(image,index) in bannerdatas" :key="index">
            <img v-lazy="image.pic" :src="image.pic":data-url="image.pic"/>
          </van-swipe-item>
        </van-swipe>
      </div>
      <!--首頁導航菜單-->
      <div class="m-nav">
          <div class="m-nav-item" v-for="(item,index) in types" :key="index" :data-id="item[0].id" @click="$router.push({path:'types/search',query:{name:item[0].cn_name}})">
                <div class="m-nav-img">
                  <img :src="item[0].pic" :data-src="item[0].pic"/>
                </div>
                <div class="m-nav-text">
                  <span class="m-text-ch">{{item[0].cn_name}}</span>
                  <span class="m-text-en">{{item[0].en_name}}</span>
                </div>
          </div>
      </div>
      <!--新品上市-->
      <div class="m-new-wrap">
        <div class="m-new-t" @click="$router.push({path:'types/search',query:{type:'新品'}})">
          <div class="m-new-t-ch">- 新品上市 -</div>
          <div class="m-new-t-en">NEW ARRIVALS</div>
        </div>
        <div class="m-new-box">
          <div class="m-new-ad-img">
            <img src="../../assets/index/new.png">
          </div>
          <div class="m-new-items">
            <div class="m-new-items-wrap">
              <div class="m-new-item" v-for="(item,index) in newdatas" :key="index" :product-id="item.id" @click="goLink(item.id)">
                <div class="m-new-item-img">
                  <img :src="item.thumb" :data-src="item.thumb">
                </div>
                <div class="m-new-item-title">
                  {{item.name}}
                </div>
                <div class="s-new-item-price">
                  <span class="m-item-price">NT$ {{item.price}}</span>
                  <span class="m-item-marketprice" v-if="item.sales_product==0? false:true">NT$ {{item.market_price}}</span>
                </div>
              </div>

            </div>
            <div class="m-new-more">
              <div class="m-new-more-text" @click="$router.push({path:'types/search',query:{type:'新品'}})">
                查看更多
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--精品推荐-->
      <div class="m-hot-wrap">
        <div class="m-hot-t" @click="$router.push({path:'types/search',query:{type:'推薦'}})">
          <div class="m-hot-t-ch">- 精品推薦 -</div>
          <div class="m-hot-t-en">RECOMMENDATIONS</div>
        </div>
      </div>
      <vueWaterfallEasy ref="waterfall" :imgsArr="imgsArr" @scrollReachBottom="fetchImgsData" @click="pitchonProduct">
        <template slot-scope="props">
          <div class="prd_info">
            <p class="prd_name">{{props.value.name}}</p>
            <p class="prd_price">{{props.value.price}}</p>
            <p class="prd-marketprice">{{props.value.market_price}}</p>
            <!--<p class="line"></p>-->
            <!--<p class="prd_title">{{props.value.prd_title}}</p>-->
          </div>
        </template>
        <!--<div slot="waterfall-over">我瀑布流也是有底線的！</div>-->
      </vueWaterfallEasy>
    </main>
  </div>

</template>

<script>
import Vue from 'vue'
import { Lazyload,Swipe, SwipeItem} from 'vant'
import vueWaterfallEasy from "../../components/vue-waterfall-easy";
import { mapState,mapActions,mapGetters } from "vuex";
import store from "../../store/index.js";
Vue.use(Lazyload)
Vue.use(Swipe).use(SwipeItem)
  import './style.scss'
  export default {
    components:{
      vueWaterfallEasy
    },
    created () {
//      this.initData();
    },
    mounted () {
      this.initData();
      this.changecart();
    },
    data () {
      return {
        //axios請求回來的數據
        bannerdatas:[],
        types:[],
        hotdatas:[],
        newdatas:{},
        productId:null,
        //記錄圖片起始
        star: 7,
        //記錄圖片結束
        end: 9,
        //後備圖片數組
        imgsArr: [],
        //後備圖片數組
        fetchImgsArr: [],
        imgData: [
          {
            prd_name: "Lace Chandelier穿孔耳環 白色, 鍍白金色",
            prd_price: "NT$ 9,990",
            prd_title:
              "密鑲Swarovski仿水晶的花形飾框內，鑲嵌一顆閃亮悅目、懸浮的xxxxx仿水晶",
            src: require("../../assets/search/20180731154649.png")
            // href: "https://www.baidu.com"
          },
          {
            prd_name: "Lace Chandelier穿孔耳環 白色, 鍍白金色",
            prd_price: "NT$ 9,990",
            src: require("../../assets/search/20180731154649.png")
            // href: "https://www.baidu.com"
          },
          {
            prd_name: "Lace Chandelier穿孔耳環 白色, 鍍白金色",
            prd_price: "NT$ 9,990",
            prd_title:
              "密鑲Swarovski仿水晶的花形飾框內，鑲嵌一顆閃亮悅目、懸浮的xxxxx仿水晶",
            src: require("../../assets/search/20180731154649.png")
            // href: "https://www.baidu.com"
          },
          {
            prd_name: "Lace Chandelier穿孔耳環 白色, 鍍白金色",
            prd_price: "NT$ 9,990",
            src: require("../../assets/search/20180731154649.png")
            // href: "https://www.baidu.com"
          },
          {
            prd_name: "Lace Chandelier穿孔耳環 白色, 鍍白金色",
            prd_price: "NT$ 9,990",
            prd_title:
              "密鑲Swarovski仿水晶的花形飾框內，鑲嵌一顆閃亮悅目、懸浮的xxxxx仿水晶",
            src: require("../../assets/search/20180731154649.png")
            // href: "https://www.baidu.com"
          },
          {
            prd_name: "Lace Chandelier穿孔耳環 白色, 鍍白金色",
            prd_price: "NT$ 9,990",
            src: require("../../assets/search/20180731154649.png")
            // href: "https://www.baidu.com"
          },
          {
            prd_name: "Lace Chandelier穿孔耳環 白色, 鍍白金色",
            prd_price: "NT$ 9,990",
            prd_title:
              "密鑲Swarovski仿水晶的花形飾框內，鑲嵌一顆閃亮悅目、懸浮的xxxxx仿水晶",
            src: require("../../assets/search/20180731154649.png")
            // href: "https://www.baidu.com"
          },
          {
            prd_name: "Lace Chandelier穿孔耳環 白色, 鍍白金色",
            prd_price: "NT$ 9,990",
            prd_title:
              "密鑲Swarovski仿水晶的花形飾框內，鑲嵌一顆閃亮悅目、懸浮的xxxxx仿水晶",
            src: require("../../assets/search/20180731154649.png")
            // href: "https://www.baidu.com"
          },
          {
            prd_name: "Lace Chandelier穿孔耳環 白色, 鍍白金色",
            prd_price: "NT$ 9,990",
            src: require("../../assets/search/20180731154649.png")
            // href: "https://www.baidu.com"
          },
          {
            prd_name: "Lace Chandelier穿孔耳環 白色, 鍍白金色",
            prd_price: "NT$ 9,990",
            src: require("../../assets/search/20180731154649.png")
            // href: "https://www.baidu.com"
          },
          {
            prd_name: "Lace Chandelier穿孔耳環 白色, 鍍白金色",
            prd_price: "NT$ 9,990",
            prd_title:
              "密鑲Swarovski仿水晶的花形飾框內，鑲嵌一顆閃亮悅目、懸浮的xxxxx仿水晶",
            src: require("../../assets/search/20180731154649.png")
            // href: "https://www.baidu.com"
          },
          {
            prd_name: "Lace Chandelier穿孔耳環 白色, 鍍白金色",
            prd_price: "NT$ 9,990",
            prd_title:
              "密鑲Swarovski仿水晶的花形飾框內，鑲嵌一顆閃亮悅目、懸浮的xxxxx仿水晶",
            src: require("../../assets/search/20180731154649.png")
            // href: "https://www.baidu.com"
          },
          {
            prd_name: "Lace Chandelier穿孔耳環 白色, 鍍白金色",
            prd_price: "NT$ 9,990",
            src: require("../../assets/search/20180731154649.png")
            // href: "https://www.baidu.com"
          },
          {
            prd_name: "Lace Chandelier穿孔耳環 白色, 鍍白金色",
            prd_price: "NT$ 9,990",
            src: require("../../assets/search/20180731154649.png")
            // href: "https://www.baidu.com"
          },
          {
            prd_name: "Lace Chandelier穿孔耳環 白色, 鍍白金色",
            prd_price: "NT$ 9,990",
            prd_title:
              "密鑲Swarovski仿水晶的花形飾框內，鑲嵌一顆閃亮悅目、懸浮的xxxxx仿水晶",
            src: require("../../assets/search/20180731154649.png")
            // href: "https://www.baidu.com"
          },
          {
            prd_name: "Lace Chandelier穿孔耳環 白色, 鍍白金色",
            prd_price: "NT$ 9,990",
            prd_title:
              "密鑲Swarovski仿水晶的花形飾框內，鑲嵌一顆閃亮悅目、懸浮的xxxxx仿水晶",
            src: require("../../assets/search/20180731154649.png")
            // href: "https://www.baidu.com"
          },
          {
            prd_name: "Lace Chandelier穿孔耳環 白色, 鍍白金色",
            prd_price: "NT$ 9,990",
            src: require("../../assets/search/20180731154649.png")
            // href: "https://www.baidu.com"
          },
          {
            prd_name: "Lace Chandelier穿孔耳環 白色, 鍍白金色",
            prd_price: "NT$ 9,990",
            src: require("../../assets/search/20180731154649.png")
            // href: "https://www.baidu.com"
          },
          {
            prd_name: "Lace Chandelier穿孔耳環 白色, 鍍白金色",
            prd_price: "NT$ 9,990",
            prd_title:
              "密鑲Swarovski仿水晶的花形飾框內，鑲嵌一顆閃亮悅目、懸浮的xxxxx仿水晶",
            src: require("../../assets/search/20180731154649.png")
            // href: "https://www.baidu.com"
          },
          {
            prd_name: "Lace Chandelier穿孔耳環 白色, 鍍白金色",
            prd_price: "NT$ 9,990",
            prd_title:
              "密鑲Swarovski仿水晶的花形飾框內，鑲嵌一顆閃亮悅目、懸浮的xxxxx仿水晶",
            src: require("../../assets/search/20180731154649.png")
            // href: "https://www.baidu.com"
          },
          {
            prd_name: "Lace Chandelier穿孔耳環 白色, 鍍白金色",
            prd_price: "NT$ 9,990",
            src: require("../../assets/search/20180731154649.png")
            // href: "https://www.baidu.com"
          },
          {
            prd_name: "Lace Chandelier穿孔耳環 白色, 鍍白金色",
            prd_price: "NT$ 9,990",
            src: require("../../assets/search/20180731154649.png")
            // href: "https://www.baidu.com"
          },
        ],
        cartNumt:0
      }
    },
    computed: {
      ...mapGetters(['testnum'])
    },
    watch:{
      testnum(n,o){
        this.cartNumt=n
      }
    },
    methods: {
      changecart(){
        this.$store.dispatch('cartchangeNum')
      },
      pitchonProduct(event, { index, value }) {
        // 阻止a标签跳转
        event.preventDefault();
        // 只有当点击到图片时才进行操作
        if (event.target.tagName.toLowerCase() == "img") {
//          console.log(value.id);
          this.$router.push({
            path: "/product",
            query: {
              dataObj: value.id
            }
          });
        }
      },
      fetchImgsData() {
        this.fetchImgsArr = [];
        if (this.end > this.hotdatas.length) {
          if (this.hotdatas.length % 2 == 0) {
            this.star = this.hotdatas.length - 1;
            this.end = this.hotdatas.length;
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
      //初始化圖片數組
      initImgsArr(n, m) {
        //num 图片数量
        var arr = [];
        for (var i = n; i < m; i++) {
          arr.push(this.hotdatas[i]);
        }
        return arr;
      },
    //axios數據請求接口函數
      initData(){
        this.$Axios.post("v1/site/index").then(res => {
            if(res.status == 200) {
              var banner = [],datatypes=[],news=[],hots=[];
//            banner數據整理
              banner = res.data.data.banner[1];
              banner.forEach(function(item,index){
                // Vue.set(item,"banner",'https://www.saritier.com'+item.pic)
                item.pic = 'https://www.saritier.com'+item.pic
              });
//              分類導航數據整理
              datatypes.push(res.data.data.banner[2],res.data.data.banner[3],res.data.data.banner[4],res.data.data.banner[5]);
              datatypes.forEach(function (item,index) {
                datatypes[index][0].pic = 'https://www.saritier.com'+datatypes[index][0].pic;
              })
              this.types=datatypes;
//              console.log(this.types)
              this.bannerdatas = banner
//            新產品
              news=res.data.data.new.data;
              news.forEach(function(item,index){
                // Vue.set(item,"banner",'https://www.saritier.com'+item.pic)
                item.thumb = 'https://www.saritier.com'+item.thumb
              });
              this.newdatas=news;
//              console.log(this.newdatas)
//              this.newdatas.forEach(res=>{
//                  console.log(res.sales_product)
//              })
//            精品推薦
              hots=res.data.data.hot.data;
              hots.forEach((item,index)=>{
                // Vue.set(item,"banner",'https://www.saritier.com'+item.pic)
                item.thumb = 'https://www.saritier.com'+item.thumb
                this.$set(item,'src',item.thumb);
              });
              this.hotdatas=hots;
              this.imgsArr = this.initImgsArr(0, 10);
            }
        })
      },
      goLink(item){
        this.productId=item;
        this.$router.push({
          path:'product',
//          name:"index",
          query:{
            dataObj:item,
          }
        });
      },

    },

  }
</script>
<style lang="scss" scoped>
  .m-top-nav{
    position: fixed;
    top:0;
    z-index: 10;
    background: #fff;
    height:89px;
    width: 100%;
  }
  .m-wrap{
    position: absolute;
    left:0;
    right:0;
    top:90px;
    bottom:50px;
    overflow-y: auto;
  }
  .m-logo{
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    height:44px;
    padding-right:20px;
  }
  .m-search{
    height:45px;
    padding:8px 25px;
    display: flex;
    display: -webkit-flex;
    div{
      width: 100%;
      background-color: #f5f5f5;
      text-align: center;
      line-height:29px;
      i{
        color:#ccc;
        font-size: 14px;
        margin-right: 4px;
      }
      span{
        color:#ccc;
        font-size: 12px;
      }
    }
  }
  .m-nav{
    padding:10px 0;
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    .m-nav-item{
      width:48%;
      display: flex;
      display: -webkit-flex;
      justify-content: left;
      align-items: center;
      padding:5px 20px;
      .m-nav-img{
        width:72px;
        height:72px;
        margin-right:10px;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
        img{
          width:90%;
        }
      }
    .m-nav-text{
      display: flex;
      display: -webkit-flex;
      flex-direction: column;
      .m-text-ch{
        color:#333;
        font-size:15px;
      }
      .m-text-en{
        color:#aaa;
        font-size:12px;
      }
    }
    }

  }
  .m-new-wrap{
    border-top:10px solid #f8f8f8;

    .m-new-t{
      display: flex;
      display: -webkit-flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height:90px;
    .m-new-t-ch{
      color:#333;
      font-size: 20px;
    }
    .m-new-t-en{
      color:#aaa;
      font-size: 12px;
      margin-top: 6px;
      letter-spacing: 5px;
    }
    }
  }
  .m-new-ad-img{
    width:375px;
    img{
      width:100%;
    }
  }
  .m-new-items{
    height:254px;
    display:flex;
    display:-webkit-flex;
    flex-wrap:nowrap;
    overflow-x: auto;
  }
.m-swiper{
  width:100%;
  height:210px;
  overflow:hidden;
  img{
    width:100%;
  }
}
  .m-new-items{
    width: 375px;
    overflow-x: auto;
    .m-new-items-wrap{
      display: flex;
      display: -webkit-flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      .m-new-item{
        width: 122px;
        padding:20px 10px 0 10px;
        .m-new-item-img{
          width:103px;
          height:103px;
          img{
            width:100%;
          }
        }
        .m-new-item-title{
          color:#333;
          font-size:12px;
          display: -webkit-box;
          text-align: center;
          height:32px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          word-break: break-all;
        }
        .s-new-item-price{
          display: flex;
          display: -webkit-flex;
          flex-direction:column;
          text-align:center;
          .m-item-price{
            margin-top:8px;
            color:#333;
            font-size:15px;
          }
          .m-item-marketprice{
              margin-top:3px;
              color:#aaa;
              font-size:14px;
              text-decoration: line-through;
          }
        }
      }
    }
  }
.m-hot-wrap {
  border-top:10px solid #f8f8f8;
  .m-hot-t{
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height:90px;
  }
  .m-hot-t-ch{
    color:#333;
    font-size: 20px;
  }
  .m-hot-t-en{
    color:#aaa;
    font-size: 12px;
    margin-top: 6px;
    letter-spacing: 5px;
  }
}
  /**/
  .m-new-more{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    width:122px;
    padding-left:20px;
    padding-right:20px;
    .m-new-more-text{
      width:81px;
      height:54px;
      color:#777;
      font-size: 15px;
      border-top:1px solid #777;
      border-bottom:1px solid #777;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      align-items: center;
    }
  }

/*瀑布流樣式*/
  .prd_info {
    width: 100%;

  .prd_name {
    color: #333333;
    font-size: 13px;
    text-align: center;
    margin-bottom: 8px;
    padding-left:16px;
    padding-right:16px;
  }

  .prd_price {
    color: #333333;
  font-size: 16px;
    text-align: center;
    margin-bottom: 4px;
  }

  .prd_title {
    color: #aaaaaa;
    font-size: 10px;
    text-align: left;
    margin-bottom: 10px;
    padding-left:10px;
    padding-right:10px;
  }
  .prd-marketprice{
    font-size: 15px;
    color:#aaa;
    text-decoration: line-through;
    text-align: center;
  }
  .line{
    width:30px;
    height:1px;
    background-color:#ccc;

    margin:6px auto;
  }
  }


</style>
