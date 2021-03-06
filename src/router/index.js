import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: '首页',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  }
]

export const asyncRoutes = [
  // 消息通知
  // {
  //   path: '/message',
  //   component: Layout,
  //   // redirect: '/dashboard',
  //   children: [
  //     {
  //       path: '/message',
  //       component: () => import('@/views/message/index'),
  //       name: '/message',
  //       meta: { title: '聚餐消息', icon: 'message', affix: true }
  //     }
  //   ]
  // },
  // 聚餐
  {
    path: '/party',
    component: Layout,
    redirect: '/party/create',
    meta: { title: '聚餐管理', icon: 'party' },
    children: [
      {
        path: '/party/create',
        component: () => import('@/views/party/create'),
        name: 'partyCreate',
        meta: { title: '新建聚餐', icon: 'partyAdd' }
      }, {
        path: '/party/list',
        component: () => import('@/views/party/list'),
        name: 'partyList',
        meta: { title: '聚餐列表', icon: 'list' }
      }, {
        path: '/party/edit',
        component: () => import('@/views/party/edit'),
        hidden: true,
        name: 'partyEdit',
        meta: { title: '编辑聚餐', icon: 'edit', activeMenu: '/party/list' }
      }
    ]
  },
  // 伙伴
  {
    path: '/partner',
    component: Layout,
    redirect: '/partner/add',
    meta: { title: '聚餐好友', icon: '2people' },
    children: [
      {
        path: '/partner/add',
        component: () => import('@/views/partner/add'),
        name: 'partnerAdd',
        meta: { title: '添加好友', icon: 'peopleAdd' }
      }, {
        path: '/partner/list',
        component: () => import('@/views/partner/list'),
        name: 'partnerList',
        meta: { title: '好友列表', icon: 'peoplelist' }
      }
    ]
  },
  // 主题
  {
    path: '/theme',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: '主题',
        meta: { title: '主题', icon: 'theme' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
