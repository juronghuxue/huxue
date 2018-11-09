<template>
  <div class="personal_data">
    <!-- 頭部導航 -->
    <headers title="修改個人資訊" back></headers>
    <div class="portrait">
      <span class="name">頭像</span>
      <span class="img">
        <van-uploader :after-read="onRead">
          <div>
            <img :src="userinfo.portrait" alt="">
          </div>
        </van-uploader>
        <i class="iconfont icon-ic_details_see_norma"></i>
      </span>
    </div>
    <div class="user-account">
      <div class="id">
        <span>使用者賬號</span>
        <span>{{userinfo.email}}</span>
      </div>
      <div class="password" @click="toChangePassowrd">
        <span>修改賬戶密碼</span>
        <span>
          <i class="iconfont icon-ic_details_see_norma"></i>
        </span>
      </div>
    </div>
    <div class="user-info">
      <div class="nickname" @click="modifyName">
        <span>暱稱</span>
        <span>
          <i>{{userinfo.name}}</i>
          <i class="iconfont icon-ic_details_see_norma"></i>
        </span>
      </div>
      <div class="sex" @click="modifySex">
        <span>性別</span>
        <span>
          <i>{{userinfo.sex}}</i>
          <i class="iconfont icon-ic_details_see_norma"></i>
        </span>
      </div>
      <div class="birthday" @click="popupDate">
        <span>生日</span>
        <span>
          <i>{{userinfo.date}}</i>
          <i class="iconfont icon-ic_details_see_norma"></i>
        </span>
      </div>
    </div>
    <van-popup v-model="show">
      <van-datetime-picker v-model="currentDate" type="date"confirm-button-text="確認" cancel-button-text="取消" :min-date="mindate" @cancel="cancelDate" @confirm="confirmDate" @change="changemDate" />
    </van-popup>
  </div>
</template>
<script>
import headers from "@/components/header";
import { Uploader, DatetimePicker, Popup } from "vant";
// import { setUser, getUser, removeUser } from "../../util/auth.js";
import { parseTime } from "../../util/index.js";
export default {
  name: "personal_data",
  created() {},
  mounted() {
    this.getInfo();
  },
  data() {
    return {
      userinfo: {
        name: "未設定",
        sex: "未設定",
        portrait: "",
        date: "",
        email: ""
      },
      currentDate: new Date(),
      show: false,
      mindate: new Date(1960, 1, 1)
    };
  },
  watch: {},
  computed: {},
  methods: {
    //獲取圖片對象
    onRead(file) {
      this.userinfo.portrait = file.content;
      this.$Axios.post("v1/user/edit-avatar", {avatar: this.userinfo.portrait}).then(res => {
        if (res.status == 200) {
        }
      });
    },
    //修改名稱
    modifyName() {
      this.$router.push("modify-nickname");
    },
    //修改性別
    modifySex() {
      this.$router.push({
        path: "modify-sex",
      });
    },
    //獲取初始化用戶設置
    getInfo() {
      this.$Axios.post("v1/user/profile").then(res => {
        if (res.status == 200) {
          console.log(res.data)
          if (res.data.length != 0) {
            let data = res.data;
            this.userinfo.portrait = 'http://192.168.1.151:9002'+ data.avatar_url;
            this.userinfo.name = data.nickname;
            this.userinfo.date = data.birthday;
            this.userinfo.email = data.email;
            if(data.sex ==1){
              this.userinfo.sex = '男';
            }else{
              this.userinfo.sex = '女';
            }
          } 
        }
      });
    },
    //跳轉到修改密碼
    toChangePassowrd() {
       this.$router.push("/user/change-password");
    },
    //彈出日期選擇器
    popupDate() {
      this.show = true;
    },
    //取消日期選擇
    cancelDate() {
      this.show = false;
    },
    //確認日期選擇
    confirmDate(value) {
      this.userinfo.date = parseTime(value, "{y}-{m}-{d}");
      this.$Axios.post("v1/user/edit-birthday", {birthday: this.userinfo.date}).then(res => {
        if (res.status == 200) {
            this.show = false;
        }
      });
    },
    //改變日期選擇
    changemDate(picker) {
      // console.log(picker.getValues())
    }
  },
  components: {
    headers
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/mixin.scss";

.van-popup {
  width: 80%;
  border-radius: 5px;
}
.personal_data {
  width: 100%;
  background-color: #f5f5f5;

  .portrait {
    width: 100%;
    height: 70px;
    background-color: #fff;
    margin-top: 11px;
    padding: 0 15px;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .name {
      color: #333333;
      font-size: 14px;
    }

    .img {
      display: -webkit-flex;
      display: flex;
      align-items: center;
      justify-content: space-between;

      div {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background-color: aquamarine;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      i {
        margin-left: 10px;
        color: #aaaaaa;
        font-size: 13px;
      }
    }
  }

  .user-account {
    width: 100%;
    background-color: #fff;
    margin-top: 10px;

    .id {
      width: 100%;
      height: 49px;
      padding: 0 15px;
      display: -webkit-flex;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .password {
      width: 100%;
      height: 49px;
      padding: 0 15px;
      display: -webkit-flex;
      display: flex;
      align-items: center;
      justify-content: space-between;

      i {
        margin-left: 10px;
        color: #aaaaaa;
        font-size: 13px;
      }
    }
  }

  .user-info {
    width: 100%;
    background-color: #fff;
    margin-top: 10px;

    .nickname {
      width: 100%;
      height: 49px;
      padding: 0 15px;
      display: -webkit-flex;
      display: flex;
      align-items: center;
      justify-content: space-between;

      i {
        margin-left: 10px;
        color: #aaaaaa;
        font-size: 13px;
      }
    }

    .sex {
      width: 100%;
      height: 49px;
      padding: 0 15px;
      display: -webkit-flex;
      display: flex;
      align-items: center;
      justify-content: space-between;

      i {
        margin-left: 10px;
        color: #aaaaaa;
        font-size: 13px;
      }
    }

    .birthday {
      width: 100%;
      height: 49px;
      padding: 0 15px;
      display: -webkit-flex;
      display: flex;
      align-items: center;
      justify-content: space-between;

      i {
        margin-left: 10px;
        color: #aaaaaa;
        font-size: 13px;
      }
    }
  }
}
</style>
