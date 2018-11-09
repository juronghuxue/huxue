import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'
import store from '@/store'
import user from './user'
import types from './types'
import business from './business_router'
import { getToken } from '../util/auth'
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)


let router = new Router({
  // scrollBehavior: () => ({y: 0}),
  // mode: 'history',
  mode: 'history',
  routes: [
    ...types,
    ...user,
    ...business,
    {path: '*', component: _import('errorPage/404'), hidden: true},
    {path: '/401', component: _import('errorPage/401'), hidden: true},
    {
      path: '/',
      component: Layout,
      redirect: 'home',
      name: '首页',
      hidden: true,
      children: [
        {path: 'home', component: _import('home/index')},
        {path: 'cart', component: _import('home/cart')},
        {path: 'lists', component: _import('home/lists')},
        {path: 'usertest', component: _import('home/usertest')}
      ]
    },
  ],
  hashbang: false,
  history: true,
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
      if(getToken){
        store.state.app.token = getToken()
      }
      if (store.state.app.token != '' && store.state.app.token != null) {  // 通过vuex state获取当前的token是否存在
          next();
      }
      else {
          next({
              path: '/user/user-login',
              query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
      }
  }
  else {
      next();
  }
})

export default router
