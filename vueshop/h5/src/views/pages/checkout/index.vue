<template>
  <div class="c-o-wrap">
    <div style="position:fixed;top:0;z-index: 100 ;background: #fff;width:100%"  >
      <Header title="結賬" back ></Header>
    </div>
    <div class="c-o-cotent">
        <div class="address">
          <!--地址为空-->
          <div class="send-type">
            寄送方式
          </div>
          <div class="empty" v-if="count==0" @click="$router.push('/address/delivery')">
              <div class="dec">
                <div class="img">
                  <img src="../../../assets/checkout/dizhi.png"/>
                </div>
                <div class="text">
                  您還沒有收貨地址，點擊這裡添加
                </div>
              </div>
              <div class="r-icon">
                <i class="iconfont icon-ic_see_normal"></i>
              </div>
          </div>
          <!--地址不为空-->
          <div class="user-address" v-else @click="$router.push('/address/delivery')" >
              <div class="dec dis">
                  <div class="t-types">{{addAddContent.shipping_method}}</div>
                  <div class="u-msg">
                    <span>{{addAddContent.consignee}}</span>
                    <span>{{addAddContent.phone}}</span>
                  </div>
                  <div class="u-s-address">{{addAddContent.address}}</div>
              </div>
              <div class="r-icon">
                <i class="iconfont icon-ic_see_normal"></i>
              </div>
          </div>
          <div class="line">

          </div>
        </div>
      <div class="c-o-order-info">
        <div class="title">
          訂單詳情
        </div>
        <div class="items">
          <ul>
            <li v-for="(item,index) in infoData" :key="index" :c_id="item.childId" p_id="item.parentId">
              <div class="img">
                <img :src="'https:www.saritier.com'+item.image"/>
              </div>
              <div class="info">
                <div class="o-d-title">{{item.productName}}</div>
                <div class="o-attr">
                  顏色:{{item.color}}  尺码:{{item.size}}  數量:{{item.number}}
                </div>
                <div class="o-price">
                  NT${{item.price}}
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="u-words">
          <div class="txt">留言</div>
          <div class="u-info">
            <input v-model="words"/>
          </div>
        </div>
        <div class="price">
            <div class="txt">訂單金額（{{infoData.length}}件商品):</div>
            <div class="o-mount">NT${{amount}}</div>
        </div>
      </div>
      <div class="o-pay-ment">
        <div class="types">
          <div class="txt">
            付款方式
          </div>
          <div class="pay-types">
            <div class="info" v-for="(item,index) in status" :key="index" @click="payTypesFn(item)" :class="{active:item.option==1}">{{item.name}}</div>
          </div>
        </div>
        <div class="checkout-order">
          <div class="box">
            <span class="check-text-info">商品總金額</span>
            <span class="check-price-info">NT${{amount}}</span>
          </div>
          <div class="box">
            <span class="check-text-info">運費總金額</span>
            <span class="check-price-info">NT$133</span>
          </div>
        </div>
      </div>
    </div>

    <div class="c-o-bottom">
        <div class="price">
          <span class="text">總付金額:</span>
          <span class="num">NT${{amount}}</span>
        </div>
        <div class="order-btn" @click="checkoutOrder">
          下訂單
        </div>
    </div>
	</div>
</template>

<script>
import Header from '@/components/header'
import{setUserPdt,getUserPdt,removeUserPdt,getType} from '../../../util/auth'
export default {
  components: {
    Header
  },
  created () {
//    this.infoDataFn()
//    this.changeAds();
  },
  mounted(){
      this.changeAds();
//      console.log(this.$route.params.id)
  },
  computed: {
  },
  watch: {
  },
  data () {
  	return {
  	    status:[{
  	      name:'貨到付款',
          option:1,
          state:1,
        },{
  	        name:'在線支付',
            option:0,
            state:2
        }],
  	    infoData:[],
        addAddress:null,
        amount:'',
        addAddContent:null,
        words:'',
        Type:1,
        count:0
  	}
  },
  methods: {
      payTypesFn(item){
          this.status.forEach(res=>{
              res.option=0;
          })
          item.option=1;

      },

    checkoutOrder(){
          let arry=[],statenum='';
        this.infoData.forEach(re=>{
            let sendproduct={productId:'',currentNum:''}
                sendproduct.productId=re.childId;
                sendproduct.currentNum=re.number;
                arry.push(sendproduct);
        });
        this.status.forEach(res=>{
            if(res.option==1){
              statenum=res.state;
            }
        })
        let senddatajson=JSON.stringify(arry);
        console.log(getType())
        if(getType()==1){
            this.Type='buy'
        }else{
          this.Type='cart'
        }
        this.$Axios.post('v1/cart/checkout-order',{
            address:this.addAddContent.id,
            remark:this.words,
            type:this.Type,
            payment:statenum,
            products:senddatajson,
        }).then(res=>{
            console.log(res);
            if(res.status==200){
                console.log(res)
              if(statenum==1){
                this.$router.push({
                  path:'/checkout/paymentsuccess',
                  query:{
                    ordernumber:res.data.order_sn
                  }
                })
              }else{
                  this.$router.push({
                    path:'/checkout/payment',
                    query:{
                      ordernumber:res.data.order_sn
                    }
                  })
              }

            }
        })
    },
    changeAds(){
        if(this.$route.query.id){
//            console.log(JSON.stringify(getUserPdt()))
            this.$Axios.post("v1/cart/checkout-product",{
              data:getUserPdt(),
              address_id:this.$route.query.id
            }).then(res=>{
              if(res.status==200){
                this.infoData= res.data.productData;
                this.addAddress=res.data.address;
                this.amount=res.data.amount;
                this.count=this.addAddress.count;
//                console.log(this.amount)
                this.addAddContent=this.addAddress.addressData;
              }
            })
        }else {
          this.$Axios.post("v1/cart/checkout-product",{
            data:getUserPdt(),
          }).then(res=>{
            if(res.status==200){
              this.infoData= res.data.productData;
              this.addAddress=res.data.address;
              this.amount=res.data.amount;
              this.count=this.addAddress.count;
              this.addAddContent=this.addAddress.addressData;
            }
          })
        }
    }
  }
}
</script>

<style lang="scss" scoped>
  .c-o-cotent{
    position: absolute;
    top:44px;
    left:0;
    right:0;
    bottom: 55px;
    overflow-y: auto;
    background: #f3f3f3;
    .address{
      background: #fff;
    }
  }
  .send-type{
    height:44px;
    display: flex;
    display: -webkit-flex;
    padding-left:15px;
    border-top:1px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;
    align-items: center;
    color:#333;
    font-size:15px;
    font-weight: 600;
  }
  .line{
    height:3px;
    background-image: url("../../../assets/checkout/xian.png");
    background-size:100% 100%;
    overflow-y: hidden;
  }
  .empty,.user-address{
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    padding-top:11px;
    padding-bottom:18px;
    padding-right:15px;
    .dec{
      display: flex;
      display: -webkit-flex;
      flex-flow: column;
      /*justify-content: left;*/
      justify-content: center;
      align-items: center;
      flex:2;
      .img{
        width:43px;
        hieght:52px;
          img{
            width: 100%;
          }
      }
      .text{
        color:#333;
        font-size: 12px;
      }
      .t-types{
        color:#333;
        font-size: 15px;
        margin-bottom: 10px;
      }
      .u-msg,.u-s-address{
        color:#333;
        font-size: 13px;
        margin-bottom: 5px;
      }
    }
  .dis{
    align-items: flex-start;
    padding-left:15px;
  }
  .r-icon{
    i{
      font-size: 13px;
      color:#aaa;
    }
  }
  }

  .c-o-order-info{
    background:#fff;
    margin-top:10px;
    .txt{
      color:#333;
      font-size:15px;
      font-weight: 600;
    }
    .title{
      height:44px;
      line-height: 44px;
      padding-left:15px;
      color:#333;
      font-size: 15px;
      font-weight: 600;
    }
    .items{
      background: #f5f5f5;
      li{
        height:92px;
        padding:10px 15px;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        align-items: center;
        .img{
          width:68px;
          height:68px;
          background:#fff;
          overflow:hidden;
          img{
            width:100%;
          }
        }
        .info{
          display: flex;
          display: -webkit-flex;
          align-items: left;
          flex-flow: column;
          width:254px;

          .o-d-title{
            color:#333;
            font-size: 14px;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .o-attr{
            color:#888;
            font-size: 13px;
            margin-top: 8px;
          }
          .o-price{
            color:#333;
            font-size: 14px;
            font-weight: 600;
            margin-top: 16px;
          }
        }
      }


    }
    .u-words{
      border-bottom: 1px solid #e8e8e8;
    }
    .u-words,.price{
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        align-items: center;
        height:44px;
        padding:0 15px;
        .o-mount{
          color:#333;
          font-size:15px;
          font-weight: 600;
        }
    }
  }
  .o-pay-ment{
    margin-top:10px;
    margin-bottom:10px;
    background: #fff;
    .types{
      height:44px;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      align-items: center;
      border-bottom:1px solid #e8e8e8;
      padding:0 15px;
      .txt{
        color: #333;
        font-size: 15px;
        font-weight: 600;
      }
      .pay-types{
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        align-items: center;
        .info{
          width:100px;
          height:30px;
          line-height:30px;
          border:1px solid #ccc;
          color:#888;
          font-size: 12px;
          text-align: center;
          margin-right: 5px;
        }
        .active{
          border:1px solid #000;
        }
      }
    }
    .checkout-order{
      padding:15px;
      .box{
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }
      .check-text-info{
        font-size: 12px;
        color:#333;
      }
      .check-price-info{
        font-size: 12px;
        color:#777;
      }
    }
  }
  .c-o-bottom{
    height:55px;
    width:100%;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    padding:0 16px;
    position:fixed;
    bottom:0;
    .text{
      color:#333;
      font-size: 16px;
      font-weight: 600;
    }
    .num{
      font-size: 17px;
      color:#DD4328;
      font-weight: 600;
    }
    .order-btn{
      width:140px;
      height:42px;
      text-align: center;
      line-height: 42px;
      background: #333;
      color:#fff;
      font-size: 15px;
    }
  }
</style>
