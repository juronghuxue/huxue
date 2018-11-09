<template>
  <div class="p-success">
    <div class="p-header">
      <span>訂單支付成功</span>
      <span @click="$router.push('/cart')">完成</span>
    </div>
    <div class="p-wrap">
      <div class="p-finish">
          <div class="left">
              <div class="img">
                <img src="../../../assets/checkout/finish.png">
              </div>
          </div>
          <div class="right">
            <div class="p-types info">
              <span>付款方式：</span>
              <span>{{type}}</span>
            </div>
            <div class="p-mount info">
              <span>訂單金額：</span>
              <span>NT${{amount}}</span>
            </div>
          </div>
      </div>
      <div class="group-btn">
          <div class="btn">
            查看訂單
          </div>
          <div class="btn" @click="$router.push('/home')">
            繼續購物
          </div>
      </div>
    </div>
	</div>
</template>

<script>
export default {

  components: {
  },
  created () {
      this.getsuccess();
  },
  computed: {
  },
  watch: {
  },
  data () {
  	return {
  	    type:'',
        amount:'',

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
                 this.type=res.data.model.payment_method==1 ? '貨到付款':'在線支付';
                 this.amount=res.data.model.amount;
            }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .p-header{
    height:44px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    padding-right:20px;
    span:nth-of-type(1){
      flex: 2;
      text-align: center;
      font-size: 15px;
      color:#333;
      font-weight:600;
     }
     span:nth-of-type(2){
      font-size: 14px;
      color:#777;
      }
  }
  .p-wrap{
    padding:40px 73px;
    .p-finish{
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      align-items: center;
      .left{
        .img{
          width:52px;
          height:66px;
          img{
            width:100%;
          }
        }
      }
      .right{
        .info{
          margin-bottom:6px;
          span:nth-of-type(1){
            font-size: 15px;
            color:#333;
          }
          span:nth-of-type(2){
            font-size: 16px;
            font-weight: 600;
            color:#DD4328;
          }
        }
      }
    }
    .group-btn{
      margin-top: 40px;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      align-items: center;
      .btn{
        width:104px;
        height:31px;
        border:1px solid #aaa;
        border-radius:3px;
        line-height: 31px;
        text-align: center;
        color:#777;
        font-size: 14px;
      }
    }
  }
</style>
