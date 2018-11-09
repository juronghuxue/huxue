<template>
    <div class="sex">
        <!-- 頭部導航 -->
        <headers title="性別" back></headers>
        <div class="outter" v-for="(item,index) in sexdata" :key="index">
            <div @click="setSex(item)">
                <span>{{item.sex}}</span>
                <i class="iconfont icon-ic_site_selected_nor" v-if="item.pitchon == 1"></i>
            </div>
        </div>
    </div>
</template>
<script>
import headers from "@/components/header";
export default {
  name: "nickname",
  created() {},
  mounted() {
    if (this.$route.query.sex) {
      this.sexdata.forEach(ele => {
        if(ele.sex ==  this.$route.query.sex){
            ele.pitchon = 1
        }
      });
    }
  },
  data() {
    return {
      sexdata: [
        {
          sex: "男",
          id: 1,
          pitchon: 0
        },
        {
          sex: "女",
          id: 2,
          pitchon: 0
        }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
    //選擇性別
    pitchSex(item) {},
    //設置性別
    setSex(item) {
      this.sexdata.forEach(ele => {
        ele.pitchon = 0;
      });
      item.pitchon = !item.pitchon;
       this.$Axios
          .post("v1/user/edit-sex", { sex: item.id })
          .then(res => {
            if (res.status == 200) {
              this.$router.push({
                path: "personal-data"
              });
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
.sex {
  width: 100%;
  background-color: #f5f5f5;

  .outter {
    width: 100%;
    div {
      width: 100%;
      height: 49px;
      display: -webkit-flex;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #eeeeee;
      padding: 0 15px;
      background-color: #fff;

      i {
        font-size: 14px;
        color: #d4b56c;
      }

      span {
        font-size: 15px;
        color: #333;
      }
    }
  }
}
</style>
