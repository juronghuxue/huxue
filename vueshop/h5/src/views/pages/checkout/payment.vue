<template>
<div class="pay-ment">
  <div style="position:fixed;top:0;z-index: 100 ;background: #fff;width:100%"  >
    <Header title="付款" back ></Header>
  </div>
  <div class="pay">
    <div class="pay-tip">
        <div class="order-save-time">
              <div class="o-txt">該訂單為您保留</div>
              <div class="o-time" v-model="daojishiFn">{{hour}}:{{minute}}:{{second}}</div>
        </div>
        <div class="o-price">
          <span class="o-txt">總付金額:</span>
          <span class="o-num">NT${{amount}}</span>
        </div>
    </div>
    <div class="pay-styles">
        <div class="title">
          付款方式
        </div>
        <div class="info" @click="tovisa">
          <div class="img">
            <img src="../../../assets/checkout/card.png">
          </div>
          <div class="right">
            <i class="iconfont icon-ic_see_normal"></i>
          </div>
        </div>
        <div class="info diff" @click="submitFn">
            <div class="img">
              <img src="../../../assets/checkout/pay.png">
            </div>
            <div class="right">
              <i class="iconfont icon-ic_see_normal"></i>
            </div>
          </div>
    </div>
  </div>
  <div v-html="str">

  </div>
</div>
</template>

<script>
  import Header from '@/components/header'
export default {
    components: {
      Header
    },
    created () {
      this.getsuccess();

    },
    mounted(){
      this.topaypal()
    },
    computed: {
    },
    watch: {
      daojishiFn(){}
    },
    data () {
      return {
        type:'',
        amount:'',
        str:'',
        daojishi:0,
        hour:23,
        minute:59,
        second:59
      }
    },
    methods: {
      getsuccess(){
        this.$Axios.post('v1/cart/pay-success',{
          sn:this.$route.query.ordernumber
        })
          .then(res=>{
            if(res.status==200){
              console.log(res);
//              this.type=res.data.model.payment_method==1 ? '貨到付款':'在線支付';
              this.amount=res.data.model.amount;
              this.daojishi=res.data.model.created_at
              this.daojishiFn(this.daojishi);
            }
          })
      },
      tovisa(){
        this.$router.push(
            {
              path:'/checkout/visa',
              query:{
                  ordernumber:this.$route.query.ordernumber,
                  price:this.amount
              }
            })
      },
      topaypal(){
          this.$Axios.post('/v1/cart/paypal',{
            sn:this.$route.query.ordernumber,
            payment:"2"
          })
            .then(res=>{
                this.str=res.data.payment;
            })
      },
      submitFn(){
        window.document.getElementById('ppSaritier').submit();
      },
      daojishiFn(time){
        var tt;
        var btime=new Date();
        var ctime=btime.getTime()
        let dtime=(time*1000)+(24*3600*1000);
        var etime=(dtime-ctime)/1000
        var _this=this;
        if(dtime>ctime){
            tt=setInterval(function () {
              _this.hour = Math.floor(etime/60/60%24);
              _this.minute = Math.floor(etime/60%60);
              _this.second = Math.floor(etime%60);
              etime--
              if(_this.hour<10){
                  _this.hour="0"+_this.hour;
              }else if(_this.minute<10){
                _this.minute="0"+_this.minute;
              }else if(_this.second<10){
                _this.second="0"+_this.second;
              }
            },1000)

        }else{
          clearInterval(tt);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pay{
    position:absolute;
    top:44px;
    left:0;
    right:0;
    bottom:0;
    background: #f5f5f5;
  }
  .pay-tip{
    padding:0 15px;
    margin-bottom:15px;
    background:#fff;
    .order-save-time{
      height:94px;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      align-items: center;
      flex-flow: column;
      border-bottom:1px solid #e1e1e1;
      .o-txt{
        color:#333;
        font-size:14px;
        margin-bottom: 10px;
      }
      .o-time{
        color:#333;
        font-size:14px;
      }
    }
  .o-price{
    height:44px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    .o-txt{
      color:#333;
      font-size:14px;
    }
    .o-num{
      color:#D74E45;
      font-size: 15px;
      font-weight: 600;
    }
  }
  }
  .pay-styles{
    background: #fff;
    .title{
      height:44px;
      line-height: 44px;
      text-align: center;
      color:#333;
      font-size: 14px;
      border-bottom: 1px solid #e1e1e1;
    }
    .info{
      height:61px;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      align-items: center;
      padding:0 15px;
      border-bottom:1px solid #e1e1e1;
      .img{
        width:196px;
        img{
          width:100%;
        }
      }
      .right{
        i{
          width:13px;
          color:#aaa;
        }
      }
    }
    .diff{
      border-bottom:none;
      .img{
        width:65px;
        img{
          width:100%;
        }
      }
    }
  }
</style>
