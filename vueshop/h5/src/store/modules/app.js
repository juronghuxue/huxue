// import Cookies from 'js-cookie'
const app = {
  state: {
    tabbarShowSt: true,
    //用户凭证
    token: null,
    //游客id
    userid: '',
  },
  mutations: {
  	setTabberSt: (state, status) => {
      state.tabbarShowSt = status
    }
  },
  actions: {
  }
}

export default app
