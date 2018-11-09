<template>
  <div class="testM">
    這里是測試頁面
    {{msg}}
  </div>
</template>

<script>
//  import{setUserPdt,getUserPdt,removeUserPdt,setType} from '../../../util/auth'
//  import store from "@/store";
  export default {

  props:{

  },
  components: {

  },
  created () {
  },
  mounted(){
  },
  data () {
      return {
        msg1:"我是mes111",
        msg2:"我是mes3333",
        wTest:"wo bian le"
      }
   },
  computed: {
    msg:function () {
      return this.msg1+this.msg2;
    }
  },
  watch: {
    wTest(val) {
      console.log("wTest:"+val)
    }
  },

  methods: {
//    msg:function () {
//      return this.msg1+this.msg2;
//    }
  }
}
</script>

<style lang="scss" scoped>
  @keyframes slideTop {
    0% {
      bottom: -100%;
    }
    20% {
      bottom: -80%;
    }
    40% {
      bottom: -60%;
    }
    60% {
      bottom: -40%;
    }
    80% {
      bottom: -20%;
    }
    100% {
      bottom: 0%;
    }
  }
  @-webkit-keyframes slideTop {
    0% {
      bottom: -100%;
    }
    20% {
      bottom: -80%;
    }
    40% {
      bottom: -60%;
    }
    60% {
      bottom: -40%;
    }
    80% {
      bottom: -20%;
    }
    100% {
      bottom: 0%;
    }
  }

  .d-p-a-wrap{
    .cover{
      position: fixed;
      top:0;
      bottom:0;
      left:0;
      right:0;
      z-index: 200;
      background: rgba(0,0,0,0.3);
    }
    .attr-box{
      position: fixed;
      bottom:-100%;
      /*bottom:0;*/
      left:0;
      right:0;
      z-index: 202;
      background: #fff;
    }
    .move{
      animation: slideTop 300ms forwards;
      -webkit-animation: slideTop 300ms forwards;
    }
    .attr-header{
      display: flex;
      display: -webkit-flex;
      height:42px;
      background: #f6f6f6;
      flex-direction: row;
      align-items: center;
      padding:0 15px;
      justify-content: flex-end;
      .top{
        flex: 2;
        text-align: right;
        font-size: 16px;
        color:#333;
        font-weight: 600;
        letter-spacing: 1.1px;
      }
      .close{
        flex: 1;
        text-align: right;
        color:#ccc;
        i{
          font-size: 25px;
        }
      }
    }
    .p-item{
      padding:15px 15px 20px 15px;
      display: flex;
      display: -webkit-flex;
      flex-direction: row;
      align-items:flex-start;
      h4{
        margin:0;
        color: #333;
        font-size: 13px;
        font-weight: normal;
        line-height: 20px;
        margin-top:10px;
      }
      p{
        margin-top:14px;
        color:#333;
        font-size: 15px;
      }
      .item-img{
        width:100px;
        height:100px;
        overflow:hidden;
        margin-right:10px;
        img{
          width:100%;
        }
      }
    }
  /*選擇顏色*/
  .color-attr{
    padding:15px 15px;
    .title{
      color:#333;
      font-size:15px;
      font-weight: 600;
      .attr-tip{
        color:#F24431;
        font-size: 13px;
        margin-left: 10px;
      }
    }
    .c-imgs{
      margin-top:10px;
      display: flex;
      display: -webkit-flex;
      flex-direction: row;
      .c-img{
        width:44px;
        height:44px;
        overflow: hidden;
        margin-right:10px;
        img{
          width:100%;
        }
      }
      .active{
        border:1px solid #D4B56D;
      }
    }
  }
  .other-attr{
    padding:15px 15px;
    .title{
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      color:#333;
      font-size:15px;
      font-weight: 600;
      .attr-tip{
        color:#F24431;
        font-size: 13px;
        margin-left: 10px;
      }
      .size-to{
        font-size:12px;
        color:#aaa;
        font-weight:normal;
        i{
          font-size: 8px;
          margin-left:4px;
        }
      }
    }
    .o-types{
      display: flex;
      display: -webkit-flex;
      flex-direction: row;
      margin-top:10px;
      .o-type{
        width:50px;
        height:30px;
        border:1px solid #ccc;
        border-radius: 2px;
        text-align: center;
        line-height: 30px;
        margin-right:10px;
        font-size: 13px;
        color:#777;
      }
      .active{
        background: #D4B56D;
        color:#fff;
        border:1px solid #D4B56D;
      }
    }
  }
  .line{
    background:#e8e8e8;
    margin-left:15px;
    margin-right:15px;
    height: 1px;
  }
  .sure{
    padding:10px 15px;
    margin-top:10px;
    .btn{
      height:60px;
      line-height: 60px;
      background: #D4B56D;
      text-align: center;
      color:#fff;
      font-size:17px;
    }
    .bchange{
      background-color: #333;
    }
  }
  .buy-nums{
    padding:12px 15px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    align-items:center;
    .text{
      color:#333;
      font-size: 15px;
    }
    .num{
      display: flex;
      display: -webkit-flex;
      justify-content: flex-end;
      align-items: center;
      .info{
        width:33px;
        height:30px;
        background: #FAFAFA;
        color: #c9c9c9;
        text-align: center;
        line-height: 30px;
      }
      .minus{
        font-size: 20px;
      }
      .add{
        font-size: 8px;
      }
      .num-show{
        width:38px;
        height:30px;
        background: #fafafa;
        text-align: center;
        line-height: 30px;
        color:#333;
        font-size:15px;
        margin-left:2px;
        margin-right:2px;
      }
    }
  }
  }

</style>
