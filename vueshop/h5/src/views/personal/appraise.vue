<template>
  <div class="appraise">
    <div class="submit" v-if="show">
      <!-- 頭部導航 -->
      <headers title="商品評價" back editext="提交" @changeEdit="submitComment"></headers>
      <div class="p-comment" v-for="(item,index) in commentdata" :key="index">
        <div class="rate">
          <div class="left">
            <img src="../../assets/personal_center_images/0afb8bf3b1616caba49bfdd1adede0e6.jpg" alt="">
          </div>
          <div class="right">
            <p>商品評分</p>
            <van-rate v-model="item.rate" :size="20" :count="5" color="#F8A120" void-color="#E8E8E8" />
          </div>
        </div>
        <div class="upload">
          <textarea name="" id="" cols="30" rows="5" style="resize:none" placeholder="商品滿足你的期待嗎？說說它的優點和美中不足的地方吧" v-model="item.comment"></textarea>
          <div class="presentation">
            <span v-for="(secitem,secindex) in item.img">
              <img :src="secitem" alt="">
              <i class="b-close" @click="deldteP(item,secindex)">
                <img src="../../assets/personal_center_images/blackclose.png" alt="">
              </i>
            </span>
          </div>
          <van-uploader :after-read="upImg(item)" @oversize="onOver" :disabled="disabledShow" :max-size=4194304 >
            <div class="upload-img">
              <div class="img">
                <img src="../../assets/personal_center_images/uploadimg.png" alt="">
              </div>
            </div>
          </van-uploader>
          <div class="anonymity">
            <div class="tick-outter" @click="tickOrNot(item)">
              <span class="tick">
                <i v-if="item.anonymity == 0" class="iconfont icon-ic_site_icon_unselec"></i>
                <img v-if="item.anonymity == 1" src="../../assets/personal_center_images/tick@2x.png" alt="">
              </span>
              <span class="font">匿名評價</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="success" v-if="!show">
      <!-- 頭部導航 -->
      <headers title="評價成功" close></headers>
      <div class="thank-outter">
        <div class="success-icon">
          <div>
            <img src="../../assets/personal_center_images/goldentick.png" alt="">
          </div>
        </div>
        <div class="tips">
          <p>感謝您的用心評價!</p>
          <p>您的評價將會幫助更多人唷~</p>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import headers from "@/components/header";
import { Rate, Uploader, Toast } from "vant";
export default {
  name: "appraise",
  created() {},
  mounted() {
    this.getComment();
  },
  data() {
    return {
      value: 0,
      show: true,
      //展示圖片數組
      presentation: [],
      //控制圖片是否可以上傳
      disabledShow: false,
      //展示的商品評論
      commentdata: [],
      //提交給後台的數據
      updata: [],
    };
  },
  watch: {},
  computed: {},
  methods: {
    //獲取訂單評論
    getComment() {
      this.$Axios
        .post("v1/order/comment-orders", { id: this.$route.query.id })
        .then(res => {
          if (res.status == 200) {
            console.log(res.data.data);
            var data = res.data.data;
            data.forEach(ele => {
              ele.comment = "";
              ele.rate = 0;
              ele.anonymity = 1
              ele.img = [];
            });
            this.commentdata = data;
          }
        });
    },
    upImg(item){
      return function(file){
      console.log(file);
      item.img.push(file.content);
      if (item.img.length >= 5) {
        this.disabledShow = true;
      } else {
        this.disabledShow = false;
      }
      }
    },
    onOver(file) {
      console.log(file);
      Toast({
        mask: false,
        message: "上傳的圖片不能超過4m唷~",
        duration: 1000
      });
    },
    //刪除圖片
    deldteP(item, secindex) {
      item.img.splice(secindex, 1);
      if (item.img.length >= 5) {
        this.disabledShow = true;
      } else {
        this.disabledShow = false;
      }
    },
    //是否匿名評價
    tickOrNot(item) {
      item.anonymity = !item.anonymity;
    },
    //上傳評價
    submitComment() {
      console.log("13212313131")
      this.commentdata.forEach(ele =>{
            let obj = {}
            obj.productId = ele.product_id
            obj.star = ele.rate
            obj.dec = ele.comment
            obj.public = ele.anonymity
            obj.uploadImg = ele.img
            this.updata.push(obj)
          })
       let params = {}
       params.id =   this.$route.query.id
       params.data =  JSON.stringify(this.updata)
      this.$Axios.post("v1/order/comment", params).then(res => {
        if (res.status == 200) {
          this.show = false
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
.appraise {
  width: 100%;
  background-color: #f5f5f5;

  .submit {
    width: 100%;
    overflow: scroll;

    .p-comment {
      margin-bottom: 10px;
      .rate {
        width: 100%;
        height: 100px;
        border-top: 1px solid #e8e8e8;
        border-bottom: 1px solid #e8e8e8;
        background-color: #fff;
        padding: 0 15px;
        display: -webkit-flex;
        display: flex;
        align-items: center;

        .left {
          width: 80px;
          height: 80px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .right {
          height: 90px;
          margin-left: 15px;

          p {
            color: #333333;
            font-size: 15px;
            font-weight: 500;
            margin-bottom: 14px;
          }
        }
      }

      .upload {
        width: 100%;
        background-color: #fff;
        padding: 16px 20px;

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

        .presentation {
          width: 100%;
          display: -webkit-flex;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          span {
            position: relative;
            width: 78px;
            height: 78px;
            margin-right: 5px;
            margin-bottom: 5px;
            @include flex-center;
            img {
              width: 100%;
              height: 100%;
            }
          }

          .b-close {
            position: absolute;
            top: 0;
            right: 0;
            display: inline-block;
            width: 20px;
            height: 20px;
            z-index: 5;
            img {
              width: 100%;
            }
          }
        }

        .upload-img {
          width: 100%;
          .img {
            width: 78px;
            height: 78px;

            img {
              width: 100%;
            }
          }
        }
      }

      .anonymity {
        width: 100%;
        height: 44px;
        display: -webkit-flex;
        display: flex;
        align-items: center;

        .tick-outter {
          display: -webkit-flex;
          display: flex;
          align-items: center;
          .tick {
            width: 14px;
            height: 14px;
            display: inline-block;

            img {
              width: 100%;
            }

            i {
              font-size: 14px;
            }
          }
        }

        .font {
          margin-left: 10px;
        }
      }
    }
  }

  .success {
    width: 100%;
    background-color: #f5f5f5;

    .thank-outter {
      background-color: #fff;
      position: absolute;
      top: 44px;
      left: 0;
      right: 0;
      bottom: 0;
      .success-icon {
        width: 100%;
        margin-top: 50px;
        @include flex-center;
        div {
          width: 54px;
          height: 54px;

          img {
            width: 100%;
          }
        }
      }

      .tips {
        margin-top: 21px;
        @include flex-center;
        flex-direction: column;

        p {
          color: #333333;
          font: 14px;
        }
      }
    }
  }
}
</style>
