<template>
  <div class="shopping-cart">
    <div style="position:fixed;top:0;z-index: 100 ;background: #fff;width:100%"  >
      <headers title="購物袋" back edit :editext="isedit" @changeEdit="toEdits"></headers>
    </div>
    <!--購物袋內容-->

    <div class="s-wrap" >
      <div class="freight-msg"  v-show="isfreight">
        <span>訂單滿 NT$1,399 免運費.</span>
        <i @click="closeBtn">&times</i>
      </div>
      <div :class="{'s-items':isfreight}" v-if="isempty">
        <div class="s-item" v-for="item in items" :p-id="item.p_id">
            <div class="is-select" @click="isSelect(item)">
              <van-icon name="success" class="icon-success" v-show="item.is_select == 1"></van-icon>
            </div>
            <div class="s-p-img">
              <img :src="'https://www.saritier.com'+item.image">
            </div>
            <div class="s-p-attr">
                <h5 class="s-p-title">{{item.name}}</h5>
                <p class="s-p-attr-text">
                  <span>顏色:{{item.color}}</span>
                  <span>尺寸:{{item.size}}</span>
                </p>
                <div class="is-freight" :class="{'isshow':true}">免運費</div>
                <div class="s-p-box">
                    <div class="s-p-price">NT${{item.price}}</div>
                    <div class="s-p-count">
                      <span class="subnum" @click="subNum(item)">-</span>
                      <input v-model="item.number">
                      <span class="addnum" @click="addNum(item)">+</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <!--購物袋內容為空-->
      <div class="empty-box" v-else style="background:#fff;">
        <div class="s-empty">
          <img src="../../assets/cart/s-empty.png">
        </div>
        <div class="s-text">
          您的購物袋還沒有商品
        </div>
        <router-link class="s-goback" to="/">
          現在就去逛逛！
        </router-link>
      </div>
      <!--編輯操作-->

    </div>
    <div class="action-content" v-show="isempty">
      <div class="all-select" @click="allIsSelect">
        <van-icon name="success" class="icon-success" v-show="isallempty"></van-icon>
        全選
      </div>
      <div class="checked-price" v-show="!iseditstatus">
        小計:<span>NT${{totalPrice}}</span>
      </div>
      <div class="action-btn" v-show="!iseditstatus">
        <div class="go-checked " :class="{active:allnoselect}" @click="checkOutFn">去買單<i v-show="iss">({{buynums}})</i></div>
      </div>
      <div class="action-btn" v-show="iseditstatus">
        <div class="collection-btn" @click="loveFn">移入收藏</div>
        <div class="delete-btn" @click="showDialogs">刪除</div>
      </div>
    </div>
       <van-popup v-model="dialogsShow" :overlay="true" ref="dpopup" style="borderRadius: 5px">
        <dia-logs :dialogsShow="dialogsShow" @cancelBtn="cancelBtn" @confirmBtn="confirmBtn" :tips="dialogsTips" :leftBtn="leftcontent" :rightBtn="rightcontent"></dia-logs>
      </van-popup>
  </div>

</template>
<script>
import {postUserLogin,firstRequest} from '../../api/user/account.js'
import { Icon,Popup } from "vant";
import headers from '@/components/header'
import diaLogs from "@/components/diaLogs";
import store from '@/store'
import {getToken, setToken, removeToken,setUserPdt,setType} from '../../util/auth'
//{"num":"0",isselect: 1,price:125.00,count:1},
//{"num":"1",isselect: 1,price:563.00,count:1},
//{"num":"2",isselect: 1,price:986.00,count:1},
//{"num":"3",isselect: 1,price:1230.00,count:1}
  export default {
    name: 'page2',
    components:{
      headers,
      diaLogs
    },
    created () {
//      firstRequest()
    },
    mounted(){
      this.cartInitData();
    },
    data () {
      return {
        //購物袋是不為空
        isempty:true,
        isallempty:true,
        isedit:"編輯",
        iseditstatus:false,
        allnoselect:false,
        isfreight:true,
        //是否選中
//        is_select:
        username: '',
        password: '',
        userid: '',
        items:[],
        d_product:[],
        //購買數量
        buynums:0,
        iss:true,
        //控制彈窗組建顯示
        dialogsShow: false,
      //彈窗左邊內容
      leftcontent: "取消",
        //彈窗右邊內容
        rightcontent: "確定",
        //dialogs提示框信息
        dialogsTips: "确定要删除吗？",




      }
    },
    watch: {
    },
    computed: {
        totalPrice(){
            var sum=0,num=0;
            this.items.forEach(item=>{
                if(item.is_select==1){
                  sum+=(item.price)*(item.number);
                  num++;
                }
            })
            if(num>0){
              this.allnoselect=true;
              this.iss=true;
              this.buynums=num;
            }else{
              this.allnoselect=false
              this.iss=false;
            }
          return sum
        },
        totalNum(){

        }
    },
    methods: {
      isSEmpty(){
         if(this.items.length<=0){
             this.isempty=false;
             this.isfreight=false;
             this.isedit=''
         }else{
           this.isempty=true;
           this.isfreight=true;
           this.isedit='編輯'
         }
      },
      isSelect(item){
          var num=0;
          item.is_select = !item.is_select
        this.items.forEach(ele =>{
            if(ele.is_select==1){
              num++;
            }
        });
        if(this.items.length==num){
          this.isallempty=true;
        }else{
          this.isallempty=false;
        }
      },
      allIsSelect(){
        this.isallempty=!this.isallempty;
        if(this.isallempty==1){
            this.items.forEach(ele =>{
                ele.is_select=1
            })
        }else{
          this.items.forEach(ele =>{
            ele.is_select=0
          })
        }
      },
      toEdits() {
        if(this.isedit=="編輯"){
          this.iseditstatus=!this.iseditstatus;
          this.isedit="完成"
        }else{
          this.iseditstatus=!this.iseditstatus;
          this.isedit="編輯"
        }
      },
      addNum(item){
        this.ctrlTypes(item,"add")
//        item.number++
      },
      subNum(item){
        this.ctrlTypes(item,"sub")
      },
      removeFn(){
         this.d_product=[];
          var deletepros=this.items.filter(function (item) {
            return item.is_select==1
          });
          if(deletepros.length==0){
              this.$toast('您沒有選擇要刪除的產品哦');
          }else {
            for(var i=0;i<deletepros.length;i++){
              let product = { productId : '',currentNum : 0};
              product.productId = deletepros[i].p_id;
              product.currentNum = 0;
              console.log(this.d_product instanceof Array)
              this.d_product.push(product);
            }
            this.d_product=JSON.stringify(this.d_product);
            this.$Axios.post('v1/cart/change-cart',{
              deleteproducts:this.d_product
            }).then(res=>{
                //刪除成功
                if(res.status==200){
                  if(this.items.length==0){
                    this.isempty=false;
                    this.isedit=""
                  }else {
                    for(var j=0;j<this.items.length;j++){
                        if(this.items[j].is_select){
                          this.items.splice(j,1);
                          j--;
                        }
                    }
                    if(this.items.length==0){
                      this.isempty=false;
                      this.isedit=""
                    }
                  }
                }
            })
          }
      },
      loveFn(){
        this.d_product=[];
        var deletepros=this.items.filter(function (item) {
          return item.is_select==1
        });
        if(deletepros.length==0){
          this.$toast('您沒有選擇要收藏的產品哦');
        }else {
          for(var i=0;i<deletepros.length;i++){
            let product = { productId : ''};
            product.productId = deletepros[i].p_id;
//            console.log(this.d_product instanceof Array)
            this.d_product.push(product);
          }
          this.d_product=JSON.stringify(this.d_product);
          this.$Axios.post('v1/cart/collection',{
            collectionproducts:this.d_product
          }).then(res=>{
            //添加收藏夾成功
            if(res.status==200){
              if(this.items.length==0){
                this.isempty=false;
                this.isedit=""
              }else {
                for(var j=0;j<this.items.length;j++){
                  if(this.items[j].is_select){
                    this.items.splice(j,1);
                    j--;
                  }
                }
                if(this.items.length==0){
                  this.isempty=false;
                  this.isedit=""
                }
              }
            }
          })
        }
      },
      closeBtn(){
          this.isfreight=!this.isfreight;
      },
//      數據請求接口
      cartInitData(){
        this.$Axios.post("v1/cart/index").then(ele=>{
           if(ele.status==200){
                this.items=ele.data;
//                console.log(this.items);
                 this.isSEmpty();
           }
        })
      },
//      點擊發送請求函數
      ctrlTypes(item,type){
          var p_id=item.p_id;
          var c_num=parseInt(item.number);
          if(type=="add"){
            c_num=c_num+1;
            this.sendData(item,p_id,c_num,"add")
//            console.log(p_id,c_num)
          }else if(type=="sub"){
              if(c_num<=1){
                item.number=c_num;
              }else{
                c_num=c_num-1
                this.sendData(item,p_id,c_num,"sub")
              }
          }

      },
//      發送axios請求修改產品數量
      sendData(item,id,num,type){
        this.$Axios.post('v1/cart/change-cart',{
          productId:id,
          currentNum:num
        }).then(res=>{
            if(res.status=='200'){
                if(type=="add"){
                  item.number=num;
                }else{
                  item.number=num;
                }
            }else {
                if(type=="add"){
                  item.number=num-1;
                }else{
                  item.number=num+1
                }

            }
      })
      },
//     去買單
      checkOutFn(){
          let arr=[];
          this.items.forEach(res=>{
//              console.log(res);
            let data={productId:'',currentNum:''}
            if(res.is_select==1){
                data.productId=res.p_id;
                data.currentNum=res.number;
                arr.push(data);
            }
          })
          if(arr.length==0){
//            this.$toast('您還選擇要結帳的產品！')
            return false;
          }
          else{
              let json=JSON.stringify(arr);
              this.$Axios.post('v1/cart/checkout-product',{
                  data:json
              })
                .then(msg=>{
                    if(msg.status==200){
                        let queryjson=msg.data;
                        if(msg.data.token){
                          let token = msg.data.token;
                          store.state.app.token = token
                          setToken(token);
                        }
                        console.log(queryjson)
                        console.log(setUserPdt(json));
                      setType(2)
                        this.$router.push('/checkout')

                    }
                })
          }
          console.log(arr)
      },
      //關閉確認彈窗
      cancelBtn() {
        this.dialogsShow = closed;
        //   this.dialogsTips = "";
      },
      //點擊確認執行方法
      confirmBtn() {
        let that = this;
        this.dialogsShow = false;
        this.removeFn();
      },
      //唤起弹窗
      showDialogs(){
        this.dialogsShow = true;
      },
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../styles/mixin.scss";
  .freight-msg{
    position: fixed;
    top:44px;
    margin-bottom:44px;
    width: 100%;
    z-index: 100;
    display: flex;
    height:44px;
    background:#D4B56C;
    color:#fff;
    @include fz(14px);
    padding:0 15px;
    flex-flow:row nowrap;
    justify-content:space-between;
    align-items:center;
    i{
      font-size: 24px;
    }
  }
  .s-wrap{
    position: absolute;
    overflow-y: auto;
    top:44px;
    left: 0;
    right:0;
    bottom:104px;
    background-color: #f5f5f5;
  }
  .s-items{
    padding-top:44px;
  }

  .s-item{
    height:160px;
    background-color: #fff;
    margin-top:10px;
    padding:0 13px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content:space-between;
    .is-select{
      width:18px;
      height:18px;
      border-radius: 2px;
      border:1px solid #ccc;
      .icon-success{
        font-size: 16px;
      }
    }
  }
  .s-p-img{
    width: 110px;
    height:110px;
    border:1px solid #eee;
    overflow: hidden;
    img{
      width:100%;
    }
  }

  .s-p-attr{
      width:200px;
    h5{
      @include fz(15px);
      color:#333;
      font-weight: normal;
      margin-top:0;
      margin-bottom: 6px;
    }
    p{
    @include fz(13px);
      color:#888;
      span{
        marign-right:8px;
      }
    }
  .is-freight{
    margin-top:6px;
    padding:2px 4px;
    display: inline-block;
    background-color: #D4B56C;
    color:#fff;
    @include fz(12px);
  }
  .isshow{
    visibility:hidden ;
  }
  .s-p-box{
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items:flex-end;
    .s-p-price{
      color:#333;
      @include fz(18px);
    }
    .s-p-count{
      display: -webkit-flex;
      display: flex;
      justify-content: space-between;
      width:80px;
      border:1px solid #cccccc;
      padding:2px 6px;
      align-items:center;
      input{
        width:40px;
        text-align: center;
      }
      span{
        font-size:20px;
        color:#ccc;
      }
    }
  }
  }
.action-content{
  display: flex;
  display: -webkit-flex;
  justify-content:space-between;
  height:55px;
  width: 100%;
  border-top:1px solid #ccc;
  border-bottom:1px solid #ccc;
  align-items: center;
  background-color: #fff;
  position:fixed;
  bottom:50px;
  z-index:100;
.action-btn{
  display: flex;
}
  .all-select{
   padding-left:10px;
  }
  .go-checked{
    width:130px;
    background: #ccc;
    color:#fff;
    height:55px;
    line-height:55px;
    text-align: center;
    @include fz(15px);

  }
  .collection-btn{
    width: 140px;
    background: #D4B56C;
    line-height: 55px;
    font-size: 15px;
    color: #fff;
    text-align: center;
  }
  .delete-btn{
    width: 130px;
    background: #333;
    line-height: 55px;
    font-size: 15px;
    color: #fff;
    text-align: center;
  }
  .active{
    background:#333;
  }
  .checked-price{
    font-size:14px;
    color:#333;
    font-weight:600;
    span{
    @include fz(18px);
      color:#DD4328;
      font-weight:normal;
    }
  }
}
/*购物袋为空*/
 .empty-box{
   display: flex;
   display: -webkit-flex;
   flex-direction: column;
   align-items: center;
   padding-top:45px;
   height:100%;
   .s-empty{
     width:66px;
     height:74px;
     img{
       width:100%;
     }
   }
   .s-text{
     color:#888;
     font-size: 16px;
     margin-top: 19px;
   }
   .s-goback{
     display: flex;
     display: -webkit-flex;
     width:130px;
     background:#D4B56C ;
     border-radius: 5px;
     height:36px;
     align-items: center;
     justify-content: center;
     color:#fff;
     font-size: 14px;
     margin-top: 26px;
   }
 }
</style>
