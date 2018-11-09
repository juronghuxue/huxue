<template>
  <div class="d-c-wrap">
    <div class="d-c-header">
      <div class="go-back" @click="backStep"><i class="iconfont icon-ic_back_normal"></i></div>
      <div class="all-comment" @click="changeStyleAll" :class="{active:ctrlIsShowAll}">
        全部({{commentDataAll.count}})
      </div>
      <div class="content-img-comment" @click="changeStylePart" :class="{active:ctrlIsShowPart}">
        有圖({{commentDataPart.count}})
      </div>
      <div>

      </div>
    </div>
    <!--有評論-->
    <div class="d-c-content" v-if="!isShow">
      <div class="d-c-all" v-show="ctrlIsShowAll">
        <ul>
          <li class="item" v-for="item in commentDataAll.comment">
            <div class="user-msg">
              <div class="user-avatar">
                <img src="../../../assets/detail/detail1.png">
              </div>
              <div class="score">
                <div class="usre-name">{{item.username}}</div>
                <div class="usre-star" v-if="item.star==5">
                  <i class="iconfont icon-ic_comment_icona_nor active" ></i>
                  <i class="iconfont icon-ic_comment_icona_nor active" ></i>
                  <i class="iconfont icon-ic_comment_icona_nor active"></i>
                  <i class="iconfont icon-ic_comment_icona_nor active"></i>
                  <i class="iconfont icon-ic_comment_icona_nor active"></i>
                </div>
                <div class="usre-star" v-else-if="item.star==4">
                  <i class="iconfont icon-ic_comment_icona_nor active" ></i>
                  <i class="iconfont icon-ic_comment_icona_nor active" ></i>
                  <i class="iconfont icon-ic_comment_icona_nor active"></i>
                  <i class="iconfont icon-ic_comment_icona_nor active"></i>
                  <i class="iconfont icon-ic_comment_icona_nor "></i>
                </div>
                <div class="usre-star" v-else-if="item.star==3">
                  <i class="iconfont icon-ic_comment_icona_nor active" ></i>
                  <i class="iconfont icon-ic_comment_icona_nor active" ></i>
                  <i class="iconfont icon-ic_comment_icona_nor active"></i>
                  <i class="iconfont icon-ic_comment_icona_nor "></i>
                  <i class="iconfont icon-ic_comment_icona_nor "></i>
                </div>
                <div class="usre-star" v-else-if="item.star==2">
                  <i class="iconfont icon-ic_comment_icona_nor active" ></i>
                  <i class="iconfont icon-ic_comment_icona_nor active" ></i>
                  <i class="iconfont icon-ic_comment_icona_nor "></i>
                  <i class="iconfont icon-ic_comment_icona_nor "></i>
                  <i class="iconfont icon-ic_comment_icona_nor "></i>
                </div>
                <div class="usre-star" v-else>
                  <i class="iconfont icon-ic_comment_icona_nor active" ></i>
                  <i class="iconfont icon-ic_comment_icona_nor active" ></i>
                  <i class="iconfont icon-ic_comment_icona_nor active"></i>
                  <i class="iconfont icon-ic_comment_icona_nor active"></i>
                  <i class="iconfont icon-ic_comment_icona_nor active"></i>
                </div>
              </div>
            </div>
            <div class="dec">{{item.content}}</div>
            <div class="info">
              <span>{{item.created_at}}</span>
            </div>
          </li>
        </ul>
      </div>
      <!--有圖的評論展示-->
      <div class="has-imgs-comment" v-show="ctrlIsShowPart">
        <ul>
          <li class="item" v-for="item in commentDataPart.comment">
            <div class="user-msg">
              <div class="user-avatar">
                <img src="../../../assets/detail/detail1.png">
              </div>
              <div class="score">
                <div class="usre-name">{{item.username}}</div>
                <div class="usre-star" v-if="item.star==5">
                  <i class="iconfont icon-ic_comment_icona_nor active" ></i>
                  <i class="iconfont icon-ic_comment_icona_nor active" ></i>
                  <i class="iconfont icon-ic_comment_icona_nor active"></i>
                  <i class="iconfont icon-ic_comment_icona_nor active"></i>
                  <i class="iconfont icon-ic_comment_icona_nor active"></i>
                </div>
                <div class="usre-star" v-else-if="item.star==4">
                  <i class="iconfont icon-ic_comment_icona_nor active" ></i>
                  <i class="iconfont icon-ic_comment_icona_nor active" ></i>
                  <i class="iconfont icon-ic_comment_icona_nor active"></i>
                  <i class="iconfont icon-ic_comment_icona_nor active"></i>
                  <i class="iconfont icon-ic_comment_icona_nor "></i>
                </div>
                <div class="usre-star" v-else-if="item.star==3">
                  <i class="iconfont icon-ic_comment_icona_nor active" ></i>
                  <i class="iconfont icon-ic_comment_icona_nor active" ></i>
                  <i class="iconfont icon-ic_comment_icona_nor active"></i>
                  <i class="iconfont icon-ic_comment_icona_nor "></i>
                  <i class="iconfont icon-ic_comment_icona_nor "></i>
                </div>
                <div class="usre-star" v-else-if="item.star==2">
                  <i class="iconfont icon-ic_comment_icona_nor active" ></i>
                  <i class="iconfont icon-ic_comment_icona_nor active" ></i>
                  <i class="iconfont icon-ic_comment_icona_nor "></i>
                  <i class="iconfont icon-ic_comment_icona_nor "></i>
                  <i class="iconfont icon-ic_comment_icona_nor "></i>
                </div>
                <div class="usre-star" v-else>
                  <i class="iconfont icon-ic_comment_icona_nor active" ></i>
                  <i class="iconfont icon-ic_comment_icona_nor active" ></i>
                  <i class="iconfont icon-ic_comment_icona_nor active"></i>
                  <i class="iconfont icon-ic_comment_icona_nor active"></i>
                  <i class="iconfont icon-ic_comment_icona_nor active"></i>
                </div>

              </div>
            </div>
            <div class="dec">{{item.content}}</div>
            <div class="cmt-imgs">
              <ul>
                <li v-for="(it,index) in item.image" :key="index" @click="PicView(it)"><img :src="'https://www.saritier.com'+it"/></li>
              </ul>
            </div>
            <div class="info">
              <span>{{item.created_at}}</span>
            </div>
          </li>
        </ul>
      </div>
 </div>
    <!--無評論-->
    <div class="empty" v-else>
      <div class="icon">
        <img src="../../../assets/detail/empty.png">
      </div>
      <div class="text">
        暫無評論
      </div>
    </div>
	</div>
</template>

<script>
  import { ImagePreview } from 'vant';
export default {

  components: {
  },
  created () {
    this.getProductId();
  },
  mounted(){
//    console.log(this.productid)
    this.sendProductId();
    this.infoComment();
  },
  computed: {
  },
  watch: {
  },
  data () {
  	return {
      items:[
        {name:"lihua"},
        {name:"xiaoli"},
        {name:"pengpeng"},
        {name:"lili"},
      ],
      isShow:true,
      productid:0,
      commentDataAll:{},
      commentDataPart:{},
//      控制是否显示
      ctrlIsShowAll:1,
      ctrlIsShowPart:0,
      pView:[]
  	}
  },
  methods: {
    changeStyle(){

    },
    backStep(){
      this.$router.go(-1);
    },
    getProductId(){
      let routerParams = this.$route.query.dataObj;
//      console.log(routerParams)
      this.productid=routerParams;
    },
    sendProductId(){
      this.$Axios.post('v1/product/comment',{
        id:this.productid,
      })
        .then(res=>{
          if(res.status=="200"){
            console.log(res.data);
//                數據整理
            this.commentDataAll=res.data.all;
            this.commentDataPart=res.data.hasImageComment;
            this.commentDataAll.comment.forEach(res=>{
              res.created_at=this.formatTime(res.created_at);
//                console.log(this.formatTime(res.created_at))
            }) ;
            this.commentDataPart.comment.forEach(res=>{
              res.created_at=this.formatTime(res.created_at);
//                console.log(this.formatTime(res.created_at))
              res.image=res.image.split(",");
              for(var i=0;i<res.image.length;i++){
                this.pView.push("https://www.saritier.com"+res.image[i])
              }
            });
//            評論圖片整理
//            this.commentDataPart.comment.image.splice(",")
          }
//            console.log(this.detailattr);
        })
    },
    formatTime (time, option) {
      time = +time * 1000
      const d = new Date(time)
      const now = Date.now()
//      console.log(d,now)
      const diff = (now - d) / 1000

      if (diff < 30) {
        return '剛剛'
      } else if (diff < 3600) { // less 1 hour
        return Math.ceil(diff / 60) + '分鐘前'
      } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小時前'
      } else if (diff < 3600 * 24 * 2) {
        return '1天前'
      }
      if (option) {
        return parseTime(time, option)
      } else {
        return d.getFullYear()+'.'+(d.getMonth() + 1 )+ '.' + d.getDate()
      }
    },
    changeStyleAll(){
      this.ctrlIsShowAll=1;
      this.ctrlIsShowPart=0;
      if(parseInt(this.commentDataAll.count)==0){
        this.isShow=true;
      }else {
        this.isShow=false;
      }
    },
    changeStylePart(){
      this.ctrlIsShowAll=0;
      this.ctrlIsShowPart=1;
      if(parseInt(this.commentDataPart.count)==0){
        this.isShow=true;
      }else{
        this.isShow=false;
      }
    },
    infoComment(){
      if(parseInt(this.commentDataAll.count)==0&&parseInt(this.commentDataPart.count)==0){
        this.isShow=true;
      }else if(parseInt(this.commentDataAll.count)==0){
        this.isShow=true;
      }else{
        this.isShow=false;
      }
    },
    PicView(it){
      var num=1
      if(it){
            for(var j=0;j<this.pView.length;j++){
                if(this.pView[j]=="https://www.saritier.com"+it){
                    num=j;
                }
            }
      }
      ImagePreview({
        images: this.pView,
        startPosition: num,
        onClose() {
          // do something
        }
      });
    }

  }
}
</script>

<style lang="scss" scoped>
  .d-c-wrap{
    background: #f8f8f8;
  }
  .all-comment,.content-img-comment{
    font-size: 15px;
    color:#333;
    font-weight: 600;
  }
  .d-c-header{
    position:fixed;
    top:0;
    z-index: 2;
    width: 100%;
    padding:0 15px;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: space-between;
    height:44px;
    background: #fff;
    .active{
      color:#D4B56C;
    }
  }
  .d-c-content,.empty{
    position: absolute;
    top:44px;
    left:0;
    right:0;
    bottom:0;
  }
  .d-c-content{
    .item{
      background: #fff;
      padding:30px 15px;
      margin-bottom: 10px;
      display: flex;
      display: -webkit-flex;
      align-items: left;
      flex-direction: column;
      .dec,.info{
        font-size: 13px;
        color:#888;
        margin-top:10px;
      }
      .info{
        span{
          margin-right:10px;
        }
      }
      .cmt-imgs{
        height:100px;
        width:100%;
        overflow-x: auto;
        overflow-y: hidden;
        margin-top:10px;
        margin-bottom:4px;
        display: flex;
        display: -webkit-flex;
        ul{
          display: flex;
          display: -webkit-flex;
          justify-content: left;
        }
        ul li{
          width:100px;
          margin-right:6px;
          img{
            width:100%;
          }
        }
      }
      .user-msg{
        display: flex;
        display: -webkit-flex;
        align-items: left;
        flex-direction: row;
        .user-avatar{
          width:28px;
          height:28px;
          border-radius: 50%;
          overflow: hidden;
          img{
            width:100%;
          }
        }
        .score{
          margin-left:10px;
        }
        .usre-star{
          color:#ccc;
          i{
            font-size: 10px;
          }
          .active{
            color:#F8A120;
          }
        }
      }
    }
  }
  /*无评论*/
  .empty{
    height: 537px;
    background: #fff;
    padding-top:95px;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    flex-direction: column;
    .icon{
      width:90px;
      height:62px;
      img{
        width:100%;
      }
    }
  .text{
    color:#888;
    font-size: 14px;
    margin-top:14px;
  }
  }
</style>
