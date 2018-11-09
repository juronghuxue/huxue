<template>
  <div @click="changecart">
    <van-tabbar v-model="active" class="vantabber" @change="changeActive(active)">
      <van-tabbar-item v-for="(item,index) in tabbarData" :key="index" :to="item.path" :info="item.name=='購物袋'? info :''">
        <span>{{item.name}}</span>
        <i slot="icon" slot-scope="props" :class="props.active ? item.icon.active : item.icon.normal"></i>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>


<script>
import "./tabber.css";
import { Tabbar, TabbarItem } from "vant";
import { mapState,mapActions,mapGetters } from "vuex";
import store from "../../store/index.js";
export default {
  name: "tabber",
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,

  },
  data() {
    return {
      selected: "home",
      active: 0,
      info:0,
      tabbarData: [
        {
          icon: {
            normal: "iconfont icon-ic_home_home_unselec",
            active: "iconfont icon-ic_home_home_selecte"
          },
          name: "首頁",
          path: "/home",
        },
        {
          icon: {
            normal: "iconfont icon-ic_home_fclass_unsel",
            active: "iconfont icon-ic_home_fclass_selec"
          },
          name: "分類",
          path: "/lists",
        },
        {
          icon: {
            normal: "iconfont icon-ic_home_shop_unsele",
            active: "iconfont icon-ic_home_shop_selecte"
          },
          name: "購物袋",
          path: "/cart",
        },
        {
          icon: {
            normal: "iconfont icon-ic_home_my_unselecte",
            active: "iconfont icon-ic_home_my_selected"
          },
          name: "我的",
          path: "/personal/personal-center",
        }
      ]
    };
  },
  created() {
    this.info = this.testnum;
  },
  watch: {
    $route(to, from) {
      this.active = this.$store.state.tabactive;
    },
    testnum(n,o){
        this.info=n
    }
  },
  mounted() {
    this.active = this.$store.state.tabactive;
//    console.log(this.$store.state.cartNums);
    this.changecart();
    this.info = this.testnum;
  },
  computed: {
    ...mapState(["tabactive"]),
//    ...mapActions(['cartNums'])
    ...mapGetters(['testnum'])
  },
  methods: {
    toNavRouter(item) {
      this.$router.push(item.path);
    },
    changeActive(active) {
      this.$store.commit("setTabActive", active);
    },
    changecart(){
      this.$store.dispatch('cartchangeNum')
    },
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.vantabber {
  color: #7e7e7e;
}

.van-tabbar-item__icon {
  i {
    font-size: 21px;
  }

  span {
    font-size: 11px;
  }
}
.van-info{
  background: #DF5E58!important;
}
</style>
