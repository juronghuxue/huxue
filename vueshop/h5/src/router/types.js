  import Layout from '../views/layout/Layout'
const _import = require('./_import_' + process.env.NODE_ENV)
export default [{
    path: '/types',
    component: Layout,
    redirect: 'types',
    name: '分類',
    hidden: true,
    children: [{
        path: 'search',
        component: _import('pages/types/search')
      },
    ]
  },
]
