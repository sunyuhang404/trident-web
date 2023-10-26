import { RouteRecordRaw } from 'vue-router';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect: {
      path: '/land'
    },
    component: () => import('@/modules/page.vue'),
    children: [
      {
        path: '/project',
        name: 'PROJECT',
        component: () => import('@/modules/Project/pages/Project.vue'),
        meta: {
          title: '项目',
          auth: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    redirect: {
      path: '/login/sso'
    },
    children: [
      {
        path: '/login/sso',
        name: 'SSOLogin',
        component: () => import('@/modules/Login/pages/SSOLogin.vue')
      },
      {
        path: '/login/dev',
        name: 'DevLogin',
        component: () => import('@/modules/Login/pages/DevLogin.vue')
      }
    ]
  },
  {
    path: '/token-transfer',
    name: 'TOKEN_TRANSFER',
    component: () => import('@/modules/Login/pages/TokenTransfer.vue'),
    meta: {
      title: '跳转页',
      auth: false
    }
  },
  {
    path: '/invite',
    name: 'INVITE',
    component: () => import('@/modules/Invite/pages/Invite.vue'),
    meta: {
      title: '邀请',
      auth: true
    }
  }
];
