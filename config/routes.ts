export default [
  {
    path: '/',
    name: '主页',
    component: './index/index',
    icon: 'smile',
  },
  {
    // 动态路由
    path: '/interfaceInfo/:id',
    name: '接口文档',
    component: './InterfaceInfo',
    // 不在菜单页显示
    hideInMenu: true,
  },
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      { name: '注册', path: '/user/register', component: './User/Register' },
    ],
  },

  // { path: '/welcome', name: '欢迎', icon: 'smile', component: './Index' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'table',
    access: 'canAdmin',
    routes: [
      {
        name: '接口管理',
        icon: 'table',
        path: '/admin/interface_info',
        component: './Admin/InterfaceInfo',
      },
      {
        name: '数据分析',
        icon: 'analysis',
        path: '/admin/chart',
        component: './Admin/chart',
      },
    ],
  },

  // { name: '接口管理', icon: 'table', path: '/list', component: './TableList' },
  // { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
