<template>
  <div class="discounts">
    <!-- 頭部導航 -->
    <headers title="優惠政策" back></headers>
    <div class="con" v-html="data">

    </div>
  </div>
</template>
<script>
import headers from "@/components/header";
export default {
  name: "nickname",
  created() {
    this.init();
  },
  mounted() {},
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
      this.$Axios.post("/v1/site/cms-view", { id: 60 }).then(res => {
        if (res.status == 200) {
          this.data = res.data.data.content.replace(/：/g, "");
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
.discounts {
  width: 100%;
  background-color: #f5f5f5;

  .con {
    padding: 15px 15px;
    background-color: #fff;
    margin-top: 11px;
  }

  .con /deep/ p {
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    font-size: 13px;

    span {
      margin-bottom: 14px;
    }
  }

  .con /deep/ p:nth-child(1) {
    span {
      display: none;
    }
  }

  .con /deep/ p:nth-child(2) {
    display: none;
  }
}
</style>
