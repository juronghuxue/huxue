<template>
    <div class="contact_us">
        <!-- 頭部導航 -->
        <headers title="聯繫我們" back></headers>
        <div class="outter">
            <div>
                <span>電郵</span>
                <span>service@saritier.com</span>
            </div>
            <div>
                <span>客服時間</span>
                <span>週一至週六 09:00 a.m.-18:00 p.m.</span>
            </div>
        </div>
    </div>
</template>
<script>
import headers from "@/components/header";
export default {
  name: "contact_us",
  created() {},
  mounted() {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  components: {
    headers
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/mixin.scss";
.contact_us {
  width: 100%;
  background-color: #f5f5f5;

  .outter {
      width: 100%;
      background-color: #fff;
      margin-top: 11px;

      div {
          width: 100%;
          height: 50px;
          padding: 0 14px;
          display: -webkit-flex;
          display: flex;
          align-items: center;
          justify-content: space-between;

          span {
              color: #333;
              font-size: 14px;
          }
      }
  }
}
</style>
