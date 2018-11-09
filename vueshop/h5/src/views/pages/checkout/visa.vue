<template>
<div class="visa">
  <div style="position:fixed;top:0;z-index: 100 ;background: #fff;width:100%"  >
    <Header title="信用卡" back ></Header>
  </div>
  <div class="v-wrap">
      <div class="content">
        <div class="type">
          <div class="img">
            <img src="../../../assets/checkout/card.png">
          </div>
        </div>
        <div class="v-msg">
          <div class="card-num" :class="{active:card}">
            <input placeholder="Card Number" v-model="cardnum" @keyup="cardNumTest('card')"/>
            <i></i>
          </div>
          <div class="limit">
            <div class="info y-m" :class="{active:date}" >
              <input placeholder="MM/YY" v-model="carddata" @keyup="cardNumTest('date')"/>
            </div>
            <div class="info i-num" :class="{active:vcc}">
              <input placeholder="CVV2 Code" v-model="cardcvv" @keyup="cardNumTest('vcc')"/>
            </div>
          </div>
          <div class="v-price">
            <div class="txt">總付金額:</div>
            <div class="num">NT${{price}}</div>
          </div>
          <div class="v-pay-btn" @click="paymentVisa">
            付款
          </div>
        </div>
      </div>
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
  },
  computed: {
  },
  watch: {
  },
  data () {
  	return {
      cardnum:'',
      carddata:'',
      cardcvv:'',
      card:0,
      date:0,
      vcc:0,
      price:this.$route.query.price,
  	}
  },
  methods: {
      cardNumTest(type){
        let cardNoReg = /^\d+$/,
          expMonthReg = /^\d{2}\/\d{4}$/,
          cvvReg = /^\d+$/;
        if(type=='card'){
          if(!cardNoReg.test(this.cardnum)){
            this.card=1;
            return;
          }else{
            this.card=0;
          }
        }
        else if(type=='date'){
          if(!expMonthReg.test(this.carddata)){
            this.date=1;
            return;
          }else{
            this.date=0;
          }
        }
        else if(type=='vcc'){
          if(!cvvReg.test(this.cardcvv)){
            this.vcc=1;
            return;
          }else{
            this.vcc=0;
          }
        }

      },
      paymentVisa(){
        if(this.cardnum==''){
          this.card=1;
        }else if(this.carddata==''){
           this.date=1;
        }
        else if(this.cardcvv==''){
          this.vcc=1;
        }else{
          this.$Axios.post('v1/cart/pay-visa',{
            sn:this.$route.query.ordernumber,
            payment:"2",
            cardNO:this.cardnum,
            expMonth:this.carddata,
            cvv:this.cardcvv
          })
            .then(res=>{
              if(res==200){
                this.$router.push({
                  path:'/checkout/paymentsuccess',
                  query:{
                    ordernumber:res.data.order_sn
                  }
                })
              }else{
                console.log(res.data.msg)
              }
            })
        }

      }
  }
}
</script>

<style lang="scss" scoped>
  .v-wrap{
    position:absolute;
    top:44px;
    left:0;
    right:0;
    bottom:0;
    background: #f5f5f5;
  }
  .content{
    margin-top: 10px;
    background: #fff;
    padding:0 15px;
    .type{
      height:44px;
      border-bottom: 1px solid #e1e1e1;
      line-height: 44px;
      img{
        width:196px;
        img{
          width:100%;
        }
      }
    }
    .v-msg{
      padding-top:20px;
      padding-bottom: 18px;
      .card-num{
        width: 100%;
        height:40px;
        border:1px solid #d6d6d6;
        margin-bottom: 10px;
        input{
          width: 100%;
          height:100%;
          padding-left:10px;
        }

      }
      .limit{
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        align-items: center;
        .info{
            width:168px;
            height:41px;
            border:1px solid #d6d6d6;
            input{
              width: 100%;
              height:100%;
              padding-left:10px;
            }

        }
        .active{
          border:1px solid #D74E45
        }
      }
      .v-price{
        height:44px;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        align-items: center;
        .txt{
          font-size: 14px;
          color:#333;
        }
        .num{
          font-size: 15px;
          color:#D74E45;
          font-weight: 600;
        }
      }
      .active{
        border:1px solid #D74E45
      }
      .v-pay-btn{
        height:40px;
        width:100%;
        background: #D74A42;
        line-height: 40px;
        text-align: center;
        color: #ffffff;
        font-size: 15px;
      }
    }
  }

</style>
