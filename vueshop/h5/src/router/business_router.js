import Layout from '../views/layout/Layout'
const _import = require('./_import_' + process.env.NODE_ENV)
export default[
    {
        path: '/product',
        component: Layout,
        // name: 'detail',
        hidden: true,
        // name:'product',
        children: [
          {
            path: '',name:"index",
            component: _import('pages/detail/index')
          },
          {
            path: 'comment',name:"comment",
            component: _import('pages/detail/comment')
          },
          {
            path: 'prodctattr',
            component: _import('pages/detail/prodctattr')
          },
          {
            path: 'footer',
            component: _import('pages/detail/footer')
          },
          {
            path: 'test',
            component: _import('pages/detail/test')
          },
        ]
      },
      {
        path: '/checkout',
        component: Layout,
        // redirect: 'checkout',
        // name: 'checkout',
        hidden: true,
        children: [
          {
            name: 'checkout',
            path: '',
            name:"checkout",
            component: _import('pages/checkout/index')
          },
          {
            path: 'payment',
            component: _import('pages/checkout/payment')
          },
          {
            path: 'paypal',
            component: _import('pages/checkout/paypal')
          },
          {
            path: 'visa',
            component: _import('pages/checkout/visa')
          },
          {
            path: 'paymentsuccess',
            component: _import('pages/checkout/paymentsuccess')
          }
        ]
      },
]
