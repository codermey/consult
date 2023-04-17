import type { RouteRecordRaw } from 'vue-router'

const routes: readonly RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/',
    component: () => import('@/views/layout/layout.vue'),
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/home.vue'),
        meta: {
          title: '首页'
        }
      },
      {
        path: '/article',
        component: () => import('@/views/article/article.vue'),
        meta: {
          title: '健康百科'
        }
      },
      {
        path: '/notify',
        component: () => import('@/views/notify/notify.vue'),
        meta: {
          title: '消息中心'
        }
      },
      {
        path: '/profile',
        component: () => import('@/views/user/profile/profile.vue'),
        meta: {
          title: '我的'
        }
      }
    ]
  },
  {
    path: '/user/patient',
    component: () => import('@/views/user/patient/patient.vue'),
    meta: {
      title: '家庭档案'
    }
  },
  {
    path: '/user/consult',
    component: () => import('@/views/order/consult/consult-record.vue'),
    meta: {
      title: '问诊记录'
    }
  },
  {
    path: '/user/consult/:id',
    component: () => import('@/views/order/consult/consult-detail.vue'),
    meta: {
      title: '问诊详情'
    }
  },
  {
    path: '/consult/fast',
    component: () => import('@/views/consult/consult-fast.vue'),
    meta: {
      title: '快速问诊'
    }
  },
  {
    path: '/consult/dep',
    component: () => import('@/views/consult/consult-dep.vue'),
    meta: {
      title: '选择科室'
    }
  },
  {
    path: '/consult/illness',
    component: () => import('@/views/consult/consult-illness.vue'),
    meta: {
      title: '病情描述'
    }
  },
  {
    path: '/consult/pay',
    component: () => import('@/views/consult/consult-pay.vue'),
    meta: {
      title: '问诊支付'
    }
  },
  {
    path: '/room',
    component: () => import('@/views/room/room.vue'),
    meta: {
      title: '问诊室'
    }
  },
  {
    path: '/test',
    component: () => import('@/views/test/index.vue'),
    meta: {
      title: '测试'
    }
  }
]

export default routes
