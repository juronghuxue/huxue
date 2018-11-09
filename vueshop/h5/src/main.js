// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// import './scss/base/index.scss'
import "./styles/fonticon.scss";
import 'vue-awesome/icons'
// import Icon from 'vue-awesome/components/Icon'
import App from './App'
// import FastClick from 'fastclick'
import router from './router'
import store from './store'
import * as filters from './filters'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueClipboards from 'vue-clipboards'
import fetch from '@/util/fetch'


import {
  Toast,
  Icon,
  Field,
  Popup,
  Uploader,
  Dialog,
  Switch,
  DatetimePicker,
  List,
  Cell,
  CellGroup,
  Tab,
  Tabs,
  Rate,
  Step,
  Steps,
  SwipeCell,
} from "vant";
Vue.use(Toast)
Vue.use(Icon)
Vue.use(Field)

Vue.use(VueClipboards)
Vue.use(Popup)
Vue.use(Uploader)
Vue.use(Dialog)
Vue.use(Switch)
Vue.use(DatetimePicker)
Vue.use(List)
Vue.use(Cell)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(CellGroup)
Vue.use(Rate)
Vue.use(Step)
Vue.use(Steps)
Vue.use(SwipeCell)
Vue.config.productionTip = false
// 完整引入MintUI
Vue.use(MintUI)
Vue.use(VueAwesomeSwiper)
// 引入vue-awesome
// Vue.component('icon', Icon)
// FastClick.attach(document.body)
router.beforeEach((to, from, next) => {
  if (!navigator.onLine) {
    MintUI.Toast({
      message: '网络连接失败，请检查后再试！',
      duration: 1000
    })
  }
  if (to.path === '/home' || to.path === '/lists' || to.path === '/cart' || to.path === '/personal/personal-center') {
    store.state.app.tabbarShowSt = true
    switch (to.path) {
      case '/home':
        store.state.tabactive = 0;
      break;
      case '/lists':
        store.state.tabactive = 1;
      break;
      case '/cart':
        store.state.tabactive = 2;
      break;
      case '/personal/personal-center':
        store.state.tabactive = 3;
      break;
    }
  } else {
    store.state.app.tabbarShowSt = false
  }
  next()
})

// 引入全局filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
//全局窗口變化時改變根字體大小
window.onresize = setHtmlFontSize;

function setHtmlFontSize() {
  const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  const htmlDom = document.getElementsByTagName('html')[0];
  htmlDom.style.fontSize = htmlWidth * 2 / 10 + 'px';
}
setHtmlFontSize()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到。
  template: '<App/>',
  components: {
    App
  }
})
