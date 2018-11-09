<template>
  <div class="dialogs">
    <div class="Finished-msg">
      <span>{{tips}}</span>
    </div>
    <div class="click-btn">
      <span class="left" @click="cancel">{{leftBtn}}</span>
      <span class="right" @click="confirm">{{rightBtn}}</span>
    </div>
  </div>
</template>

<script>
import { Popup} from "vant";
export default {
  data() {
    return {
      
    };
  },
  props: {
   tips: "",
   leftBtn: "",
   rightBtn: "",
  },
  methods: {
    confirm(){
      this.$emit("confirmBtn")
    },
    cancel(){
      this.$emit("cancelBtn",false)
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/mixin.scss";
 .dialogs {
   width: 275px;
   height: 170px;
   background-color: #fff;
   border-radius: 5px;
   border: 1px solid hidden;

   .Finished-msg {
     width: 100%;
     height: 120px;
     @include flex-center;

     span {
       padding: 0 33px;
       text-align: center;
       line-height: 25px;

     }
   }

   .click-btn {
     width: 100;
     height: 50px;
     border-top: 1px solid #E1E1E1;
     display: flex;
     span {
       width: 50%;
       height: 100%;
       @include flex-center;
     }

     .left {
       border-right: 1px solid #E1E1E1;
     }
   }
 }
</style>