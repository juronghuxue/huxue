<template>
    <div class="about-delivery">
        <!-- 頭部導航 -->
        <headers title="關於配送" back></headers>
        <div class="con" v-html="data">

        </div>
    </div>
</template>
<script>
import headers from "@/components/header";
export default {
  name: "about_delivery",
  created() {},
  mounted() {
    this.init();
  },
  data() {
    return {
      //展示數據
      data: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    init() {
      this.$Axios.post("/v1/site/cms-view", { id: 14 }).then(res => {
        if (res.status == 200) {
          this.data = res.data.data.content;
          console.log(this.data);
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
.about-delivery {
  width: 100%;
  background-color: #f5f5f5;

  .con {
    padding: 12px 21px;
    background-color: #fff;
    margin-top: 11px;
    position: absolute;
    top: 44px;
  }

  .con /deep/ p {
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    font-size: 13px;
    width: 100%;

    img {
      width: 100% !important;
    }
  }
}
</style>
