import Vue from 'vue'
// import axios from 'axios'
import Vuex from 'vuex'
import app from './modules/app'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    //tabbar狀態
    tabactive: 0,
    cartNums:{
      type:Number,
      default:0
    },

  },
  mutations: {
    setTabActive: (state, active) => {
      state.tabactive = active
    },
    cartchangenum:(state,num) =>{
      Vue.prototype.$Axios.post("v1/cart/index").then(ele=>{
        if(ele.status==200){
          // console.log(ele.data);
          state.cartNums.default=ele.data.length
        }
      });
    }

  },
  actions:{
    // cartchangeNum(context){
    //   axios.post("http://192.168.1.151:9005/v1/cart/index").then(ele=>{
    //     if(ele.status==200){
    //       console.log(ele.data.data.length);
    //       context.commit('cartchangenum',ele.data.data.length)
    //     }
    //   });
    //
    // }
    cartchangeNum(context){
          context.commit('cartchangenum')
    }
  },

  modules: {
    app
  },
  getters: {
    // sidebar: state => state.app.sidebar,
    // visitedViews: state => state.app.visitedViews,
    // token: state => state.app.token,
    // avatar: state => state.user.avatar,
    // name: state => state.user.name,
    // introduction: state => state.user.introduction,
    // status: state => state.user.status,
    // roles: state => state.user.roles,
    // setting: state => state.user.setting,
    // permission_routers: state => state.permission.routers,
    // addRouters: state => state.permission.addRouters
    testnum(state){
      return state.cartNums.default
    }
  }
})

export default store
