<template>
  <div class="opinion">
    <!-- 頭部導航 -->
    <headers title="意見反饋" back></headers>
    <div class="type">
      <div v-for="(item,index) in opiniondata" :key="index" @click="selectType(item)">
        <i class="tick" v-if="item.pitchon == 1">
          <img src="../../assets/personal_center_images/tick@2x.png" alt="">
        </i>
        <i class="iconfont icon-ic_feedback_icona_no" v-if="item.pitchon == 0"></i>
        <span>{{item.content}}</span>
      </div>
    </div>
    <div class="us-opinion">
      <textarea name="" id="" cols="30" rows="10" style="resize:none" placeholder="請描述您的問題" v-model="content"></textarea>
    </div>
    <div class="phone">
      <input type="text" placeholder="手機號碼" v-model="phone">
    </div>
    <div class="submit">
      <span :class="{'active': verifyPhone}" @click="submitOpinion">提交</span>
    </div>
  </div>
</template>
<script>
import headers from "@/components/header";
export default {
  name: "opinion",
  created() {},
  mounted() {},
  data() {
    return {
      opiniondata: [
        {
          content: "訂單問題",
          id: 1,
          pitchon: 0
        },
        {
          content: "體驗問題",
          id: 2,
          pitchon: 0
        }
      ],
      //反饋類型
      optype: "",
      //用戶電話號碼
      phone: "",
      //反饋內容
      content: ""
    };
  },
  watch: {},
  computed: {
    //驗證用戶名是否合法
    verifyPhone() {
      //電話號碼正則
      let rexp = /^(09)\d{8}$/;
      if (rexp.test(this.phone)) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    //選擇反饋類型
    selectType(item) {
      this.optype = item.content;
      this.opiniondata.forEach(ele => {
        ele.pitchon = 0;
      });
      item.pitchon = !item.pitchon;
      this.optype = item.id;
    },
    //提交反饋
    submitOpinion() {
      if (this.verifyPhone) {
        let params = {};
        params.type = this.optype;
        params.content = this.content;
        params.phone = this.phone;
        console.log(params)
        this.$Axios.post("v1/site/feedback", params).then(res => {
          if (res.status == 200) {
            console.log(res);
          }
        });
      }
    }
  },
  components: {
    headers
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/mixin.scss";
.opinion {
  width: 100%;
  background-color: #f5f5f5;

  .type {
    width: 100%;
    margin-top: 10px;
    display: -webkit-flex;
    display: flex;

    div {
      width: 50%;
      height: 50px;
      @include flex-center;
      background-color: #fff;
      color: #333;
      font-size: 15px;

      i {
        font-size: 16px;
        margin-right: 6px;
      }

      .tick {
        width: 16px;
        height: 16px;
        img {
          width: 100%;
        }
      }
    }
  }

  .us-opinion {
    width: 100%;
    padding: 20px 25px;
    background-color: #fff;

    textarea::-webkit-input-placeholder {
      /* WebKit browsers */

      color: #aaaaaa;
    }

    textarea:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */

      color: #aaaaaa;
    }

    textarea::-moz-placeholder {
      /* Mozilla Firefox 19+ */

      color: #aaaaaa;
    }

    textarea:-ms-input-placeholder {
      /* Internet Explorer 10+ */

      color: #aaaaaa;
    }

    textarea {
      width: 100%;
      border: none;
    }
  }

  .phone {
    width: 100%;
    height: 44px;
    padding: 15px 25px;
    background-color: #fff;
    margin-top: 10px;

    input {
      width: 100%;
    }
    /*修改提示文字的颜色*/

    input::-webkit-input-placeholder {
      /* WebKit browsers */

      color: #aaaaaa;
    }

    input:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */

      color: #aaaaaa;
    }

    input::-moz-placeholder {
      /* Mozilla Firefox 19+ */

      color: #aaaaaa;
    }

    input:-ms-input-placeholder {
      /* Internet Explorer 10+ */

      color: #aaaaaa;
    }
  }

  .submit {
    width: 100%;
    padding: 15px;
    margin-top: 10px;

    span {
      width: 100%;
      height: 39px;
      background-color: #efefef;
      color: #fff;
      @include flex-center;
    }

    .active {
      background-color: #dab35f;
    }
  }
}
</style>
