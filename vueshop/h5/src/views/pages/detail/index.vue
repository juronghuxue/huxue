
<template>

	<div class="m-d-wrap">
    <!--<meta property='og:type' content='product' >-->
    <!--<meta property='og:title' content='我是詳情頁' >-->
    <!--<meta property='og:image' content='這里是一張圖片' >-->
    <!--<meta property='og:description' content='產品的描述內容' >-->
		<div class="m-d-top">
      <!--詳情頁頭部-->
        <div class="back" @click="$router.go(-1)">
          <span class="iconfont icon-ic_back_normal"></span>
        </div>
        <div class="tabs">
         <ul>
           <li v-for="(item,index) in navListData" :key="index" @click="pitchOn(item)" :class="{'active': item.pitchon == 1}">
             {{item.name}}
           </li>
         </ul>
        </div>
        <div class="share" @click="shareOn" >
          <span class="icon iconfont icon-ic_site_edit_normal"></span>
        </div>
    </div>
    <div class="m-d-container">
      <!--詳情頁輪播圖-->
      <div class="m-swiper">
        <van-swipe :autoplay="3000" :show-indicators="false" @change="onChange">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="'https://www.saritier.com/'+image.image" :src="'https://www.saritier.com/'+image.image" :pic-id="image.id" :pro-id="image.product_id"/>
          </van-swipe-item>
        </van-swipe>
        <div class="m-swiper-num-view">
          <span class="active-num">{{activenum}}</span>/<span class="imgs-total-num">{{images.length}}</span>
        </div>
      </div>
      <div class="m-d-p-wrap">
          <h4 class="m-d-p-title">{{modelData.name}}</h4>
          <p class="m-d-p-subtitle">{{modelData.brief}}</p>
          <p class="m-d-p-price">
            <span class="m-d-p-price-current">NT${{modelData.price}}</span>
            <span class="m-d-p-price-market">NT${{modelData.market_price}}</span>
          </p>
          <p class="m-custor-view">
            <span>收藏：{{modelData.favorite_count}}</span>
            <span class="left-right-margin">月銷售量：{{modelData.sale}}</span>
            <span>評價：{{modelData.count_comment}}</span>
          </p>
          <p class="sever-days">
            七天鑒賞期 | 滿NT$1,399免郵
          </p>
      </div>
      <!--已選屬性-->
      <div class="m-d-attr-view">
          <div class="select-attr-view">
            <i>選擇商品選項</i>
            <span v-if="!productId">例如:('選擇顏色' 或'選擇尺寸')</span>
            <span v-else>已選:("{{selectColor}}" "{{selectSize}}")</span>
          </div>
          <div class="choose-other-attr" @click="toChangeAtte(0)">
            <i class="iconfont icon-ic_details_see_norma"></i>
          </div>
      </div>
      <!--商品評論內容-->
      <div class="d-review-show">
          <div class="d-r-show-header">
              <div class="d-r-s-h-text">商品評價({{modelData.count_comment}})</div>
              <div class="show-more" @click="goLink(productid)">查看全部<i class="iconfont icon-ic_details_see_norma"></i></div>
          </div>
          <div class="d-new-review">
              <div class="d-user-msg">
                  <div class="user-avatar"><img src="../../../assets/detail/detail1.png"></div>
                  <div class="user-name">{{firstcomment.username}}</div>
              </div>
              <div class="content">{{firstcomment.content}}</div>
          </div>
      </div>
      <!--商品詳情內容-->
      <div class="p-d-lists" @mouseover="scrollFn($event)">
          <div class="d-title-text">
              — 商品詳情 —
          </div>
          <div class="d-imgs-content" v-html="modelData.content" :class="{'d-active': loadingends == true}" >
            <!--{{detailData.modeldata.content}}-->
          </div>
      </div>
      <!--猜你喜歡暫時不做-->
    </div>
    <Footer @ctrlAttr="ctrlAtterShow"></Footer>
    <Atta v-show="attrshow" @ctrlAtte="ctrlAtterHide" :ctrlMove="attrshow" :attr="detailattr"  @changeAttrVal="changeAttrValFn" :bchange="bstatus"></Atta>
    <!--分享-->
    <!--遮罩層-->
    <div class="cover" v-show="ctrlSw"></div>
    <div class="share-tip" v-show="ctrlSw">
        <div class="header">
          <h4>分享商品</h4>
          <p>快告訴你的親朋好友，你在這邊發現了什麼好東西</p>
        </div>
        <div class="share-to" @click="fbShare">
          <div class="fb">
            <img src="../../../assets/detail/fb.png"/>
          </div>
        </div>
        <div class="btn close" @click="shareOff">
          關閉
        </div>
    </div>
	</div>
</template>
<script>
  import Vue from 'vue'
  import { Lazyload,Swipe, SwipeItem } from 'vant';
  Vue.use(Lazyload)
  Vue.use(Swipe).use(SwipeItem);
  import Atta from './prodctattr'
  import Footer from './footer'
export default {
//  name: 'page3',
  components: {
    Atta,
    Footer
  },
  created () {
    this.getProductId();
  },
  mounted(){
//    console.log(this.productid);

    this.sendProduct();
    this.$nextTick(function(){
      this.loadingends = true
    });
//    this.imgurl=2
    let _this=this;
    window.onload=function () {
      _this.imgurl=Math.random();
    }

  },
  computed: {
      changeNum(){
      },
  },
  watch: {
    '$route': 'getProductId',

  },
  data () {
  	return {
      loadingends: false,
      activenum: 1,
      attrshow:false,
      images: [],
      productid:null,
      firstcomment:{
        username:'',
        content:''
      },
      // 是否顯示分享彈窗
      ctrlSw:0,
      //导航栏数据
      navListData: [
        {
            name: '商品',
           pitchon: 1,
        },
        {
          name: '評價',
          pitchon: 0,
        },
        {
          name: '詳情',
          pitchon: 0,
        }

      ],
      detailData:null,
      //給屬性選擇傳值對象
      detailattr:{
          p_img:[],
          p_size:[],
          p_child:[],
          mainMsg:{
              title:'',
              price:'',
          }
      },
      //基礎數據變量
      modelData: {},
      //子組件給父組件傳遞的已選的屬性值
      selectColor:'',
      selectSize:'',
      bstatus:1,
      imgurl:0,
      productId:''
  	}
  },
  methods: {
    //輪播獲取下一張圖片的索引
    onChange(index){
      this.activenum=(index+1)
    },
    toChangeAtte(status){
      this.attrshow=true;
      if(status==0){
        this.bstatus=0
      }else{
        this.bstatus=1
      }
    },
    showAllComment(){
        this.$router.push("/pages/detail/comment")
    },
    ctrlAtterHide(){
      this.attrshow=false;
    },
    pitchOn(item) {
        this.navListData.forEach(ele => {
            ele.pitchon = 0
        })
      item.pitchon = !item.pitchon;
      if(item.name=='評價'){
          this.goLink(this.productid);
      }else if(item.name=='詳情'){

      }
    },
    getProductId(){
      let routerParams = this.$route.query.dataObj;
      this.productid=routerParams;
//      this.imgurl=Math.random();
    },
    sendProduct(){
//        console.log(this.productid);
      this.$Axios.post('v1/product/view',{
          id:this.productid,
      })
        .then(res=>{
            if(res.status=="200"){
                console.log(res);
//                數據整理
                this.detailData=res.data;
                this.modelData = res.data.model;
                this.images=res.data.productImages;
//                傳遞到商品屬性選擇數據
                this.detailattr.p_img=res.data.productChildImages;
                this.detailattr.p_size=res.data.size;
                this.detailattr.p_child=res.data.productChildAttr;
                this.detailattr.mainMsg.title=res.data.model.name;
                this.detailattr.mainMsg.price=res.data.model.price;
                this.detailattr.p_id=res.data.model.id;
                this.detailattr.main_img=res.data.productImages[0].image;

                this.firstcomment.username=this.detailData.comment.data.name;
                this.firstcomment.content=this.detailData.comment.data.content;
                console.log(this.modeldata)

            }
//            console.log(this.detailattr);
        })
    },
    goLink(item){
//      this.productId=;
      this.$router.push({
        path:'/product/comment',
//          name:"index",
        query:{
          dataObj:item,
        }
      });
    },
    //改变父组件的属性值
    changeAttrValFn(attrs){
      this.selectColor=attrs.color;
      this.selectSize=attrs.size;
      this.productId=attrs.id;
//      this.productId=attrs
      console.log(this.selectColor,this.selectSize)
    },
      ctrlAtterShow(status){
        this.toChangeAtte(status);
    },
    scrollFn(e){
         let detail=document.querySelector('.p-d-lists');
         let detailTop=detail.offsetTop
         console.log(detailTop)
    },
    fbShare(){
      FB.init({
        appId: '473470043096011',
        autoLogAppEvents: true,
        xfbml: true,
        version: "v2.12"
      });
      FB.ui(
        {
          method: "share",
          mobile_iframe: true,
          href: window.document.href,
        },
        function(response) {
            console.log(response)
        }
      );
    },
    facebook() {
      // 初始化
      FB.init({
        appId: 'app',
        autoLogAppEvents: true,
        xfbml: true,
        version: "v3.0"
      });
      FB.ui(
        {
          method: "share",
          mobile_iframe: true,
          href: window.location.href
        },
        function(response) {}
      );
    },
    shareOn(){
      this.ctrlSw=1;
    },
    shareOff(){
      this.ctrlSw=0;
    }
  }
}
</script>

<style lang="scss" scoped>
  .m-d-container{
    position:absolute;
    bottom:65px;
    left:0;
    right:0;
    top:44px;
  }
  .cover{
    position: fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    z-index: 200;
    background: rgba(0,0,0,0.3);
  }
  .m-d-top{
    position:fixed;
    width:100%;
    padding-left:15px;
    padding-right:15px;
    background-color: #fff;
    height:44px;
    top:0;
    z-index: 100;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: space-between;

  .tabs {
    width: 62%;
    height: 100%;
    ul {
      height: 100%;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      justify-content: space-between;

      li {
        padding: 6px;
        color: #888888;
        font-size: 15px;
      }

      .active {
        border-bottom: 2px solid #D4B56D;
        color: #D4B56D;
      }
    }
  }
  .share{
    span{
      font-size: 20px;
      font-weight: 600;
      color: #333;
    }
  }
  .back{
  span{
    font-size: 15px;
    font-weight: 600;
    color: #333;
  }
  }
  }
.m-swiper{
  position:relative;
  img{
    width:100%;
  }
  .m-swiper-num-view{
    width:44px;
    background: #ccc;
    height:22px;
    border-radius: 10px;
    position: absolute;
    bottom:15px;
    right:20px;
    text-align: center;
    line-height: 22px;
    color:#fff;
    font-size:14px;
    .active-num{
      font-size: 15px;
      margin-right: 1px;
    }
    .imgs-total-num{
      margin-left:1px;
    }
  }
}
/*詳情頁產品介紹*/
.m-d-p-wrap{
  padding:20px 40px;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-bottom:10px solid #f8f8f8;
  h4{
    margin:0;
    color:#333;
    font-size: 16px;
    text-align: center;
  }
  .m-d-p-subtitle{
    color:#888;
    font-size:13px;
    margin-top: 2px;
    margin-bottom: 10px;
  }
  .m-d-p-price-current{
    font-size: 20px;
    color:#333;
    font-weight:600;
  }
  .m-d-p-price-market{
    font-size: 13px;
    color:#aaa;
    text-decoration: line-through;
    margin-left:5px;
  }
  .m-custor-view{
    color:#888;
    font-size:11px;
    margin-top: 8px;
    .left-right-margin{
      margin-right:20px;
      margin-left:20px;
    }
  }
  .sever-days{
    color: #D4B56D;
    font-size: 11px;
    margin-top:15px;

  }


}
/*詳情已選屬性選擇*/
  .m-d-attr-view{
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    height:75px;
    padding:0 15px;
    align-items: center;
    border-bottom: 10px solid #f8f8f8;
    .choose-other-attr{
      i{
        color:#D4B56D;
      }
    }
    .select-attr-view{
      font-size: 15px;
      color:#333;
      font-weight: 600;
      span{
          font-size: 15px;
          color:#333;
          margin-left:6px;
          font-weight: normal;
      }
    }
  }
/*商品詳情的展示*/
  .d-title-text{
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    height:45px;
    font-size: 15px;
    color:#333;
    font-weight: 600;
  }
  .d-imgs-content{
    width: 375px;
    p{
    width: 100%;
      img{
        width: 100%;
      }
    }

  }

  .d-active /deep/img {
    width: 100%;
  }
/*商品評價*/
  .d-review-show{
    border-bottom: 10px solid #f8f8f8;
    .d-r-show-header{
      height:45px;
      padding:0 15px;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      justify-content: space-between;
        .d-r-s-h-text{
          color:#333;
          font-size:15px;
          font-weight: 600;
        }
        .show-more{
          font-size: 14px;
          color:#D4B56D;
        i{
          margin-left:3px;
        }
        }
    }
    .d-new-review{
      display: flex;
      display: -webkit-flex;
      flex-direction: column;
      padding:15px;
      .d-user-msg{
        display:flex;
        display:-webkit-flex;
        align-items:center;
        .user-name{
          color:#888;
          font-size:12px;
        }
        .user-avatar{
          width:24px;
          height:24px;
          overflow: hidden;
          border-radius: 50%;
          border:1px solid #ccc;
          margin-right:6px;
          img{
            width:100%;
          }
        }
      }
      .content{
        font-size: 12px;
        color:#333;
        margin-top: 6px;
      }
    }
  }
  /*分享樣式*/
  .share-tip{
    background: #f6f6f6;
    position: fixed;
    bottom:0;
    width:100%;
    z-index: 202;
    .header{
      border-bottom:1px solid #e8e8e8;
      padding-bottom:10px;
    }
    h4{
      text-align: center;
      font-size:16px;
      color:#333;
      margin:0;
      margin-top:10px;
    }
    p{
      text-align: center;
      font-size:14px;
      color:#888;
      margin-top:5px;
    }
    .share-to{
      widht:100%;
      height:100px;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      align-items:center;
      .fb{
        width:57px;

        img{
          width:100%;
        }
      }
    }
    .close{
      margin: 0 auto;
      width:345px;
      height:42px;
      background: #fff;
      font-size: 15px;
      color:#333;
      margin-bottom: 20px;
      text-align: center;
      line-height: 42px;
    }
  }
</style>
