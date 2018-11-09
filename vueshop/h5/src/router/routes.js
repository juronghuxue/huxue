import App from '../App'

export default [{
  path: '/',
  component: App,
  children: [
    {
    path: '',
     component: r => require.ensure([], () => r(require('../views/home')), 'home')
    },
    {
    path: '/pages/checkout',
     component: r => require.ensure([], () => r(require('../views/pages/checkout')), 'checkout')
    },
    {
      path: '/pages/types',
       component: r => require.ensure([], () => r(require('../views/pages/types')), 'types')
      },
    {
      path: '/login',
      component: r => require.ensure([], () => r(require('../views/login')), 'login')
    },
    {
      path: '/user',
      component: r => require.ensure([], () => r(require('../views/user')), 'user')
    },
    {
      path: '/personal',
      component: r => require.ensure([], () => r(require('../views/personal')), 'personal')
    },
    {
      path: '/address',
      component: r => require.ensure([], () => r(require('../views/address')), 'address')
    }
  ]
}]
