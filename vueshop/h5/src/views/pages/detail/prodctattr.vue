<template>
  <div class="d-p-a-wrap">
    <!--遮罩層-->
    <div class="cover"></div>
    <div class="attr-box" :class="{'move': ctrlMove == true}">
        <div class="attr-header">
          <div class="top">請選擇商品規格</div>
          <div class="close" @click="closeAttr"><i class="iconfont icon-ic_details_coles_nor"></i></div>
        </div>
        <div class="p-item">
            <div class="item-img">
              <img :src="'https://www.saritier.com'+attr.main_img">
            </div>
            <div class="item-box">
              <h4 class="title">{{attr.mainMsg.title}}</h4>
              <p class="price">NT¥{{attr.mainMsg.price}}</p>
            </div>
        </div>
        <div class="line"></div>
        <div class="color-attr">
          <div class="title">選擇顏色<i class="attr-tip" v-show="colorTipOn">請選擇顏色</i></div>
          <div class="c-imgs">
            <div class="c-img" v-for="(item,index) in attr.p_img" :key="" :img_id="item.imgId" @click="optionColor(item)" :class='{"active":item.is_select == 1}'>
              <img :src="'https://www.saritier.com'+item.image">
            </div>
          </div>
        </div>
      <div class="line" v-show="attr.p_size.length>0"></div>
        <div class="other-attr" v-show="attr.p_size.length>0">
          <div class="title"><span>選擇尺寸<i class="attr-tip" v-show="sizeTipOn">請選擇尺寸</i></span><span class="size-to">女士飾品尺碼表<i class="iconfont icon-ic_details_see_norma"></i></span></div>
          <div class="o-types" >
            <div class="o-type" v-for="(item,index) in attr.p_size" :key="index" :p-id="item.id"  @click="optionSize(item)" :class='{"active":item.is_select == 1}'>{{item.attribute_value}}</div>
          </div>
        </div>
      <div class="line"></div>
      <div class="buy-nums">
        <div class="text">數量</div>
        <div class="num">
          <span class="info minus" @click="minusFn">&minus;</span>
          <input class="num-show" value="1" v-model="count" @keyup="numRex(count)"/>
          <span class="iconfont icon-ic_details_plus_norm add info" @click="addFn"></span>
        </div>
      </div>
      <div class="sure">
        <div class="btn" @click="sendProductId" v-if='bchange':class="{'bchange':bchange == true}">
          <span >加入購物袋</span>
        </div>
        <div class="btn" @click="rSendProductId" v-else>
          <span >直接購買</span>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
  import{setUserPdt,getUserPdt,removeUserPdt,setType} from '../../../util/auth'
  import store from "@/store";
  export default {

  props:{
    'ctrlMove': null,
    attr:{

    },
    bchange:null
  },
  components: {

  },
  created () {
  },
  mounted(){
//    this.addStatus()
    console.log(this.attr);
//    this.pPId=this.attr.p_id;

    console.log(this)
  },
  computed: {
  },
  watch: {
  },
  data () {
  	return {
  	    testdata:{},
        isAciveColor:1,
        //屬性數量
        count:1,
        //尺寸提示文字開關
        sizeTipOn:1,
        //顏色提示文字開關
        colorTipOn:1,
        //子產品id
        productId:'',
        //主產品id
        pPId:'',
        //傳遞給父組件已選擇屬性
        p_attrs:{
  	        color:'',
            size:'',
            id:""
        }
  	}
  },
  methods: {
    //彈出子產品的屬性框
    closeAttr(){
      this.$emit('ctrlAtte');
    },
    //選擇屬性顏色
    optionColor(item){
      var statusOn=item.is_select;
//      console.log(statusOn)
      this.attr.p_img.forEach(res=>{
        res.is_select=0;
//        this.sizeTipOn=1;
//        this.colorTipOn=1;
      })
      if(statusOn==0){
        item.is_select=!item.is_select;
        this.colorTipOn=0;
        //遍歷有沒有選擇尺寸
        if(this.attr.p_size.length!=0){
          this.attr.p_size.forEach(res=>{
//            console.log(res.is_select);
            if(res.is_select==1){
              var sizeid=res.id;
              this.childProductId(item,sizeid);
            }
          })
        }else{
            //沒有尺寸的存在
          this.attr.p_child.forEach(re=> {
            if(item.imgId==re.imgId){
              re.product.forEach(res=>{
//                console.log(res.id)
//                console.log(res.price)
                  this.productId=res.id;
                  this.p_attrs.color=res.colorValue;
                  this.p_attrs.id=res.id;
              })
            }

          })
          this.$emit('changeAttrVal',this.p_attrs);
          console.log(this.productId)
        }

      }else{
        item.is_select=0;
        this.colorTipOn=1
        this.productId='';
        this.p_attrs.id=''
        this.$emit('changeAttrVal',this.p_attrs);
      }

//      console.log(item.is_select)
    },
    //選擇屬性尺寸
    optionSize(item){
      var statusOn=item.is_select;
      this.attr.p_size.forEach(res=>{
        res.is_select=0;
      })
      if(statusOn==0){
        item.is_select=!item.is_select;
        this.sizeTipOn=0;

        this.attr.p_img.forEach(res=>{
            if(res.is_select==1){
                  this.attr.p_child.forEach(re=>{
                      if(res.imgId==re.imgId){
                            re.product.forEach(r=>{
                                if(item.id==r.sizeId){
                                      this.productId=r.id;
                                      this.p_attrs.id=r.id;
                                      this.p_attrs.size=res.sizeValue;
                                      this.p_attrs.color=res.colorValue;
                                }
                            })
                      }
                  })

            }else {
              this.productId='';
            }

        })
      }else{
        item.is_select=0;
        this.sizeTipOn=1;
      }
      this.$emit('changeAttrVal',this.p_attrs);
    },
    childProductSize(){

    },
    //確定子新產品id
    childProductId(item,id){
        console.log(item.imgId);
        this.attr.p_child.forEach(re=> {
         if(item.imgId==re.imgId){
           re.product.forEach(res=>{
             if(res.sizeId==id){
               this.productId=res.id;
               this.p_attrs.size=res.sizeValue;
               this.p_attrs.color=res.colorValue;
//               console.log(this.p_attrs.size)
             }
           })
         }
        })
      this.$emit('changeAttrVal',this.p_attrs);
    },
    //請求發送添加購物車接口
    sendProductId(){
        console.log(this.attr.p_id,this.productId,this.count,this.attr)
        if(this.productId!=''&&this.productId!=null){
          this.$Axios.post('v1/cart/add-cart',{
            productId:this.attr.p_id,
            pId:this.productId,
            number:this.count,
          }).then(res=>{
            console.log(res);
            if(res.status==200){
//                alert("添加購物車成功")  import { Toast } from 'vant';
              this.$toast({message:'添加購物車成功',duration:500});
            }
          })
        }else{
//            alert("你還不能提交喲,選擇產品屬性吧");
          this.$toast({message:'選擇產品屬性',duration:1000});
        }

    },
    rSendProductId(){
      var arr=[],json={};
      json.productId=this.productId;
      json.currentNum=this.count;
      arr.push(json);
      json=JSON.stringify(arr);
      if(this.productId!=''&&this.productId!=null){
          this.$Axios.post('/v1/cart/checkout-product',{
            data:json,
          })
            .then(res=>{
              if(res.status==200){
                if(res.data.token){
                  let token = res.data.token;
                  store.state.app.token = token
                  setToken(token);
                }
                setUserPdt(json);
                setType(1)
                this.$router.push('/checkout');
              }
            })
      }else{
        this.$toast('你還不能提交喲,選擇產品屬性吧');
      }
    },
    //減少產品數量
    minusFn(){
        if(this.count>1){
          this.count--
        }else{
          this.count=1;
          this.$toast({'message':'最小數量為1','mask':true,'forbidClick':true,'duration':1000,'type':'loading'});
        }
    },
    //增加產品數量
    addFn(){
        if(this.count>200){
          this.count=200;
          this.$toast('最多可以購買200');
        }else{
          this.count++
        }
    },
    numRex(num){
        let rex=/^([1-9]{1})\d{1,2}$/;
      if(rex.test(num)){

      }else{
        this.count=1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @keyframes slideTop {
    0% {
      bottom: -100%;
    }
    20% {
      bottom: -80%;
    }
    40% {
      bottom: -60%;
    }
    60% {
      bottom: -40%;
    }
    80% {
      bottom: -20%;
    }
    100% {
      bottom: 0%;
    }
  }
  @-webkit-keyframes slideTop {
    0% {
      bottom: -100%;
    }
    20% {
      bottom: -80%;
    }
    40% {
      bottom: -60%;
    }
    60% {
      bottom: -40%;
    }
    80% {
      bottom: -20%;
    }
    100% {
      bottom: 0%;
    }
  }

  .d-p-a-wrap{
    .cover{
      position: fixed;
      top:0;
      bottom:0;
      left:0;
      right:0;
      z-index: 200;
      background: rgba(0,0,0,0.3);
    }
    .attr-box{
      position: fixed;
      bottom:-100%;
      /*bottom:0;*/
      left:0;
      right:0;
      z-index: 202;
      background: #fff;
    }
    .move{
      animation: slideTop 300ms forwards;
      -webkit-animation: slideTop 300ms forwards;
    }
    .attr-header{
      display: flex;
      display: -webkit-flex;
      height:42px;
      background: #f6f6f6;
      flex-direction: row;
      align-items: center;
      padding:0 15px;
      justify-content: flex-end;
      .top{
        flex: 2;
        text-align: right;
        font-size: 16px;
        color:#333;
        font-weight: 600;
        letter-spacing: 1.1px;
      }
      .close{
        flex: 1;
        text-align: right;
        color:#ccc;
        i{
          font-size: 25px;
        }
      }
    }
    .p-item{
      padding:15px 15px 20px 15px;
      display: flex;
      display: -webkit-flex;
      flex-direction: row;
      align-items:flex-start;
      h4{
        margin:0;
        color: #333;
        font-size: 13px;
        font-weight: normal;
        line-height: 20px;
        margin-top:10px;
      }
      p{
        margin-top:14px;
        color:#333;
        font-size: 15px;
      }
      .item-img{
        width:100px;
        height:100px;
        overflow:hidden;
        margin-right:10px;
        img{
          width:100%;
        }
      }
    }
  /*選擇顏色*/
  .color-attr{
    padding:15px 15px;
    .title{
      color:#333;
      font-size:15px;
      font-weight: 600;
      .attr-tip{
        color:#F24431;
        font-size: 13px;
        margin-left: 10px;
      }
    }
    .c-imgs{
      margin-top:10px;
      display: flex;
      display: -webkit-flex;
      flex-direction: row;
      .c-img{
        width:44px;
        height:44px;
        overflow: hidden;
        margin-right:10px;
        img{
          width:100%;
        }
      }
      .active{
        border:1px solid #D4B56D;
      }
    }
  }
  .other-attr{
    padding:15px 15px;
    .title{
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      color:#333;
      font-size:15px;
      font-weight: 600;
      .attr-tip{
        color:#F24431;
        font-size: 13px;
        margin-left: 10px;
      }
      .size-to{
        font-size:12px;
        color:#aaa;
        font-weight:normal;
        i{
          font-size: 8px;
          margin-left:4px;
        }
      }
    }
    .o-types{
      display: flex;
      display: -webkit-flex;
      flex-direction: row;
      margin-top:10px;
      .o-type{
        width:50px;
        height:30px;
        border:1px solid #ccc;
        border-radius: 2px;
        text-align: center;
        line-height: 30px;
        margin-right:10px;
        font-size: 13px;
        color:#777;
      }
      .active{
        background: #D4B56D;
        color:#fff;
        border:1px solid #D4B56D;
      }
    }
  }
  .line{
    background:#e8e8e8;
    margin-left:15px;
    margin-right:15px;
    height: 1px;
  }
  .sure{
    padding:10px 15px;
    margin-top:10px;
    .btn{
      height:60px;
      line-height: 60px;
      background: #D4B56D;
      text-align: center;
      color:#fff;
      font-size:17px;
    }
    .bchange{
      background-color: #333;
    }
  }
  .buy-nums{
    padding:12px 15px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    align-items:center;
    .text{
      color:#333;
      font-size: 15px;
    }
    .num{
      display: flex;
      display: -webkit-flex;
      justify-content: flex-end;
      align-items: center;
      .info{
        width:33px;
        height:30px;
        background: #FAFAFA;
        color: #c9c9c9;
        text-align: center;
        line-height: 30px;
      }
      .minus{
        font-size: 20px;
      }
      .add{
        font-size: 8px;
      }
      .num-show{
        width:38px;
        height:30px;
        background: #fafafa;
        text-align: center;
        line-height: 30px;
        color:#333;
        font-size:15px;
        margin-left:2px;
        margin-right:2px;
      }
    }
  }
  }

</style>
