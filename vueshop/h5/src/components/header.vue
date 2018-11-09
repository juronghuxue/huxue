<template>
  <div class="header">
    <span class="close" v-if="close" @click="toBack">&times;</span>
    <span class="back iconfont icon-ic_back_normal" v-if="back" @click="toBack"></span>
    <span class="title">{{ title }}</span>
    <span class="edit" v-if="edit" @click="toEdit">{{editext}}</span>
  </div>
</template>

<script>
import { Icon } from "vant";
export default {
  data() {
    return {
      //title:'标题'
    };
  },
  props: {
    other: false,
    title: "",
    editext:"",
    back: {
      type: Boolean,
      dafult: true
    },
    close: {
      type: Boolean,
      dafult: true
    },
    edit:{
      type:Boolean,
      default:true
    }
  },
  methods: {
    toBack() {
      if(this.other == true){
        this.$emit('backUp')
      }else{
         this.$router.go(-1);
      }
    },
    toEdit(){
      this.$emit('changeEdit')
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
@import "../styles/mixin.scss";
.header {
  height: 44px;
  display: -webkit-flex;
  display: flex;
  align-items: center; 
  justify-content: space-between;
  padding: 0 15px;
  background-color: #fff;

  .close {
    @include fz(30px);
    color: #333333;
  }

  .back {
    @include fz(16px);
    font-weight: 700;
    color: #333333;
  }
  .edit{
    font-weight: 700;
    color: #333333;
  @include fz(15px);
    color: #333333;
  }
  .title {
      @include fz(18px);
      color: #333333;
      font-family: PingFangSC-Medium;
      font-weight: 700;
  }
}
</style>
