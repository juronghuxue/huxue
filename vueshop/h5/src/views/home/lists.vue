<template>
  <div class="Category">
    <!-- 搜索框 -->
    <div class="search-outter" @click="toSearch">
      <div class="search-box">
        <i class="search-icon iconfont icon-ic_search_search_nor"></i>
        <!-- <input type="text" class="search-input" placeholder="搜索你的精緻生活"> -->
        <p class="search-p">搜索你的精緻生活</p>
      </div>
    </div>
    <!-- 分類頁主要板塊 -->
    <div class="category-outter">
      <!-- 導航欄 -->
      <nav class="navigation-bar">
        <ul>
          <li v-for="(item,index) in navigationData" :class="{'active':item.pitchon == 1}" @click="pitchonNav(item)">{{item.content}}</li>
        </ul>
      </nav>
      <!-- 分類內容 -->
      <div class="prd-category">
        <div class="category-title">&minus;{{categoryname}}類目&minus;</div>
        <ul>
          <li class="prd-target" v-for="(item,index) in exhibitionArr" @click="toSearch(item)">
            <i>
              <img :src="'https://www.saritier.com/'+item.img">
            </i>
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import "./style.scss";
export default {
  components: {},
  created() {},
  mounted() {
    this.getInitData()
  },
  data() {
    return {
      datas: [],
      //類目名稱
      categoryname: "新品",
      //導航欄數據
      navigationData: [
        {
          content: "新品",
          pitchon: 1,
          type: 2
        },
        {
          content: "首飾",
          pitchon: 0,
          type: 3
        },
        {
          content: "系列",
          pitchon: 0,
          type: 47
        },
        {
          content: "活動專區",
          pitchon: 0,
          type: 48
        }
      ],
      //展示數組
      exhibitionArr: []
    };
  },
  computed: {},
  methods: {
    //獲取初始化數據
    getInitData() {
       this.$Axios.post("v1/site/category", { type: 2}).then(res => {
        if (res.status == 200) {
          var a = res.data[0];
        }
      });
    },
    //選擇分類類型
    pitchonNav(item) {
      this.categoryname  = item.content
      this.navigationData.forEach(ele => {
        ele.pitchon = 0;
      });
      item.pitchon = !item.pitchon;
      this.$Axios.post("v1/site/category", { type: item.type}).then(res => {
        if (res.status == 200) {
        this.exhibitionArr = res.data[0].list
        }
      });
    },
    toSearch(item){
      console.log(item)
      this.$router.push({
        path: '/types/search',
        query: {
          name: item.name,
        }
      })
    },
  },
  components: {}
};
</script>
<style lang="scss" scoped>
@import "../../styles/mixin.scss";
.Category {
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .search-outter {
    padding: 0 15px;
    height: 44px;
    background-color: #f5f5f5;
    display: -webkit-flex;
    display: flex;
    align-items: center;

    .search-box {
      width: 100%;
      height: 32px;
      background-color: #f0f0f0;
      display: -webkit-flex;
      display: flex;
      align-items: center;

      .search-icon {
        font-size: 17px;
        margin-right: 9px;
      }

      .search-p {
        width: 70%;
        color: #aaaaaa;
        font-size: 12px;
        height: 32px;
        background-color: #f0f0f0;
        display: -webkit-flex;
        display: flex;
        align-items: center;
      }
    }
  }

  .category-outter {
    display: -webkit-flex;
    display: flex;
    width: 100%;
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 50px;

    .navigation-bar {
      width: 75px;
      height: 100%;
      background-color: #f5f5f5;

      ul {
        li {
          color: #333;
          font-size: 14px;
          width: 75px;
          height: 53px;
          @include flex-center;
        }
      }

      .active {
        background-color: #fff;
      }
    }

    .prd-category {
      width: 300px;
      height: 100%;

      .category-title {
        width: 100%;
        height: 60px;
        color: #333333;
        font-size: 15px;
        @include flex-center;
      }

      ul {
        display: -webkit-flex;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .prd-target {
          width: 100px;
          height: 105px;
          flex-direction: column;
          @include flex-center;

          i {
            display: inline-block;
            width: 75px;
            height: 75px;
            margin-bottom: 10px;

            img {
              width: 100%;
            }
          }

          span {
            color: #333;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
