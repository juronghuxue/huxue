<template>
  <div class="d-footer-wrap">
      <div class="love-lists info" @click="addToFavorate">
          <i class="iconfont icon-ic_details_hide_norm"></i>
          <span class="text">願望單</span>
      </div>
      <div class="shopping-box info" @click="$router.push('/cart')">
        <i class="iconfont icon-ic_home_shop_unsele"></i>
        <span class="text">購物袋</span>
      </div>
      <div class="add-shopping" @click="addToCart">加入購物袋</div>
      <div class="buy" @click="onceBuy">直接購買</div>
	</div>
</template>

<script>
export default {

  components: {
  },
  created () {
  },
  computed: {
  },
  watch: {
  },
  data () {
  	return {
      addtocart:1,
      oncebuy:0

  	}
  },
  methods: {
    addToCart(){
        this.$emit('ctrlAttr',this.addtocart)
    },
    onceBuy(){
      this.$emit('ctrlAttr',this.oncebuy)
    },
    addToFavorate(){
      this.$router.push("personal/wish-list")
    }
  }
}
</script>

<style lang="scss" scoped>
  .d-footer-wrap {
    background: #fff;
    width: 100%;
    position: fixed;
    bottom: 0;
    left:0;
    right:0;
    z-index: 100;
    height: 65px;
    padding: 10px 15px 10px 5px;
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    flex-direction: row;
    .info{
      width:50px;
      height:50px;
      display: flex;
      display: -webkit-flex;
      flex-direction: column;
      align-items:center;
      .text{
        font-size: 10px;
        color:#333;
      }
      i{
        font-size: 21px;
      }
    }
    .shopping-box{
      i{
        font-size: 21px;
        font-weight: 600;
      }
    }
    .buy{
      height:45px;
      line-height: 45px;
      text-align: center;
      width:130px;
      background: #D4B56D;
      font-size: 15px;
      color:#fff;
    }
    .add-shopping{
      height:45px;
      line-height: 45px;
      text-align: center;
      width:130px;
      background: #333;
      font-size: 15px;
      color:#fff;

    }
  }
</style>
