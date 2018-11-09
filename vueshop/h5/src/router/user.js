import Layout from '../views/layout/Layout'
const _import = require('./_import_' + process.env.NODE_ENV)
export default [{
    path: '/user',
    component: Layout,
    redirect: 'user',
    name: '用户',
    hidden: true,
    children: [{
        path: 'user-login',
        component: _import('user/user_login')
      },
      {
        path: 'retrieve-password',
        component: _import('user/retrieve_password')
      },
      {
        path: 'forget-password',
        component: _import('user/forget_password')
      },
      {
        path: 'change-password',
        component: _import('user/change_password')
      },
    ]
  },
  {
    path: '/personal',
    component: Layout,
    redirect: 'personal',
    name: '個人中心',
    hidden: true,
    children: [{
        path: 'personal-center',
        component: _import('personal/personal_center'),
        // meta: {
        //   requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        // },
      },
      {
        path: 'v-orderinquiry',
        component: _import('personal/v_orderinquiry')
      },
      {
        path: 'shop-list',
        component: _import('personal/shop_list')
      },
      {
        path: 'order-details',
        component: _import('personal/order_details')
      },
      {
        path: 'appraise',
        component: _import('personal/appraise')
      },
      {
        path: 'logistics',
        component: _import('personal/logistics_information')
      },
      {
        path: 'setting',
        component: _import('personal/setting')
      },
      {
        path: 'personal-data',
        component: _import('personal/personal_data')
      },
      {
        path: 'modify-nickname',
        component: _import('personal/modify_nickname')
      },
      {
        path: 'modify-sex',
        component: _import('personal/modify_sex')
      },
      {
        path: 'discounts',
        component: _import('personal/discounts')
      },
      {
        path: 'about-delivery',
        component: _import('personal/about_delivery')
      },
      {
        path: 'salesreturn',
        component: _import('personal/salesreturn')
      },
      {
        path: 'pack-service',
        component: _import('personal/pack_service')
      },
      {
        path: 'about-us',
        component: _import('personal/about_us')
      },
      {
        path: 'opinion',
        component: _import('personal/opinion')
      },
      {
        path: 'contact-us',
        component: _import('personal/contact_us')
      },
      {
        path: 'wish-list',
        component: _import('personal/wish_list')
      },
      {
        path: 'browsing',
        component: _import('personal/browsing')
      },
      {
        path: 'visitor-order',
        component: _import('personal/visitor_order')
      },
    ]
  },
  {
    path: '/address',
    component: Layout,
    redirect: 'address',
    // name: '地址',
    hidden: true,
    children: [{
        path: 'add-address',
        component: _import('address/add_address')
      },
      {
        path: 'new-delivery-address',
        component: _import('address/new_delivery_address')
      },
      {
        path: 'delivery',
        component: _import('address/delivery')
      },
    ]
  },
]
