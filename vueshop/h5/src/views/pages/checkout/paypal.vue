<template>
 <div class="paypal">
   <div style="position:fixed;top:0;z-index: 100 ;background: #fff;width:100%"  >
     <Header title="Paypal" back ></Header>
   </div>
   <div class="pay-wrap">
      <div class="b-info p-price">
        <div class="txt">總付金額:</div>
        <div class="num">NT$1,499</div>
      </div>
      <div class="b-info pay-style">
          <div class="p-title-img">
            <div class="img">
              <img src="../../../assets/checkout/pay.png">
            </div>
          </div>
          <div class="p-txt">
            用貝寶付款
          </div>
          <div class="e-tip">
            輸入您的郵箱地址以開始。
          </div>
          <div class="email-address">
            <input placeholder="郵箱地址"/>
          </div>
          <div class="next-step">
            下一步
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
  	}
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .pay-wrap{
    position:absolute;
    top:44px;
    left:0;
    right:0;
    bottom:0;
    background: #f5f5f5;
  .b-info{
    background: #fff;
  }
  }
  .p-price{
    margin-top: 10px;
    height:44px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    padding:0 15px;
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
  .pay-style{
    margin-top: 10px;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    padding:30px 30px 52px;
    .p-title-img{
      margin-bottom:42px;
      .img{
        width: 117px;
        img{
          width: 100%;
        }
      }
    }
    .p-txt{
      font-size: 23px;
      color:#333;
      margin-bottom: 18px;
    }
    .e-tip{
      font-size: 14px;
      color:#333;
      margin-bottom: 30px;
    }
    .email-address{
      width: 100%;
      height:44px;
      border:1px solid #9DA3A6;
      border-radius:4px;
      margin-bottom:19px;
      input{
        width:100%;
        height:100%;
        padding-left:10px;
        border-radius:4px;
      }
    }
    .next-step{
      width:100%;
      height:44px;
      line-height: 44px;
      text-align: center;
      background: #0070BA;
      border-radius: 4px;
      font-size: 14px;
      color:#fff;
    }
  }
</style>
