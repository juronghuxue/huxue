import vue from 'vue'
import axios from 'axios'
import store from '@/store'
import {getToken, removeToken} from './auth'
import { Indicator, Toast } from 'mint-ui'
import {getLocalStorage,setLocalStorage} from './localStorage'
import Qs from 'qs'
import { Transform } from 'stream';


// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000, // 请求超时时间

  // onUploadProgress: function (progressEvent) {
  // },
  // onDownloadProgress: function (progressEvent) {
  // },

})

////发送请求之前，把参数格式化。
service.defaults.transformRequest = function(data){
	let params = new FormData();
	for(let key in data){
		params.append(key,data[key]);
	}
	return params;
}

// 添加一个请求拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (getLocalStorage('Access-Token')) config.headers['access-token'] = getLocalStorage('Access-Token')
  console.log(getLocalStorage('Access-Token'))

  if (getLocalStorage('userId')) config.headers['shop-uuid'] = getLocalStorage('userId')
  console.log(getLocalStorage('userId')+"hhhhh")

  return config
}, error => {

  // Do something with request error
  // console.log(error) // for debug
  Promise.reject(error)
})

// 添加一个响应拦截器
service.interceptors.response.use(
  response => {
    const shopuuid = response.headers['shop-uuid']
    console.log(getLocalStorage('userId'))
    if(!getLocalStorage('userId')){setLocalStorage('userId',shopuuid)}
    console.log(getLocalStorage('userId'))
    // Indicator.close()
    const res = response.data
    return res
  },
  error => {
    // console.log('err' + error)// for debug
    Indicator.close()
    if (error.response) {
      Toast({
        message: '网络连接失败' + error.response.status + '！，请刷新重试',
        duration: 1000
      })
      console.log('network' + error.response.status)
    } else {
      Toast({
        message: '网络连接失败，请刷新重试',
        duration: 1000
      })
    }
    return Promise.reject(error)
  }
)
vue.prototype.$Axios = service
export default service
