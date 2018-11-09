<template>
    <div class="browsing">
        <!-- 頭部導航 -->
        <headers title="瀏覽記錄" back></headers>
        <div class="history">
            <ul v-for="(item,index) in browsingdata" :key="index">
                <div class="list-date">
                    <span>{{item.date}}</span>
                </div>
                <li v-for="(secitem,secindex) in item.productInfo" @click="toProduct(secitem.product_id)">
                    <div class="prd-img">
                        <img :src="'https://www.saritier.com'+secitem.thumb" alt="">
                    </div>
                    <div class="prd-info">
                        <span>{{secitem.name}}</span>
                        <span>NT${{secitem.price}}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import headers from "@/components/header";
export default {
  name: "browsing",
  created() {},
  mounted() {
      this.getBrowsingData()
  },
  data() {
    return {
        browsingdata: [],
    };
  },
  watch: {},
  computed: {},
  methods: {
    //獲取瀏覽數據
    getBrowsingData() {
      this.$Axios.post("v1/product/show-record").then(res => {
        if (res.status == 200) {
          console.log(res)
          this.browsingdata = res.data.info
        }
      });
    },
    //跳轉到商品詳情
    toProduct(id){
         this.$router.push({
          path: "/product",
          query: {
            dataObj: id
          }
        });
    }
  },
  components: {
    headers
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/mixin.scss";
.browsing {
  width: 100%;
  background-color: #f5f5f5;

  .history {
    width: 100%;
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: scroll;

    ul {
      width: 100%;
      margin-bottom: 10px;
      .list-date {
        width: 100%;
        height: 40px;
        background-color: #fff;
        display: -webkit-flex;
        display: flex;
        align-items: center;
        padding: 0 15px;
      }

      li {
        width: 100%;
        height: 120px;
        border-top: 1px solid #E5E5E5;
        padding: 0 15px;
        background-color: #fff;
        display: -webkit-flex;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .prd-img {
          width: 90px;
          height: 90px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .prd-info {
          width: 230px;
          height: 90px;
          display: -webkit-flex;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>
