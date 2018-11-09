import fetch from '@/util/fetch'
import store from '@/store'
import {getToken, setToken, removeToken} from '../../util/auth'
import { Toast } from "vant";



//用戶註冊
export function postUserRegister (userregister) {
  let params = {}
  if (userregister.type == 'email') {
    params = {
      type: userregister.type,
      email: userregister.useremail,
      password: userregister.password,
      passwordConfirm: userregister.affirmpassword,
    }
  }else {
    // params = {
    //   type: userregister.type,
    //   phone: userregister.phone,
    //   code: userregister.code,
    //   password: userregister.phonepsd,
    //   passwordConfirm: userregister.affirm,
    // }
  }
  return fetch({
    url: 'v1/site/register',
    method: 'post',
    data: params,
  }).then(res => {
    if(res.status == 200) {
       this.$router.push('/user/user-login')
    }else {
      Toast(res.data.msg)
    }
  })
    .catch(error => {
      console.log(error)
    })
}


// 用户登录
export function postUserLogin (userlogin) {
  let params = {}
  params = {
    username: userlogin.useremail,
    password: userlogin.password,
  }
  return fetch({
    url: 'v1/site/login',
    method: 'post',
    data: params,
  }
).then(res =>{
  if(res.status == 200) {
    let token = res.data['access-token']
    store.state.app.token = token
    setToken(token)
    if (this.$route.query.redirect) {
      this.$router.push(this.$route.query.redirect)
    }else {
      this.$router.push('/home')
    }
  }
})
}


//退出登錄
export function logOut() {
  return fetch({
    url: 'v1/site/logout',
    method: 'post',
  }).then(res =>{
    if(res.status == 200) {
      store.state.app.token = null
      removeToken()
      this.$router.push('/user/user-login')
    }
  })
}



//第一次请求
export function firstRequest () {
  return fetch({
    url: 'v1/site/index',
    method: 'post',
  })
}

