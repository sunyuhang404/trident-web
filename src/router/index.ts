import { createRouter, createWebHistory } from 'vue-router';
import Cookies from 'js-cookie';
import { routes } from '@/router/routes';

const router = createRouter({
  history: createWebHistory(process.env.VITE_BASE_ROUTE),
  scrollBehavior() {
    return { top: 0, left: 0 };
  },
  routes
});

const ignorePaths = ['/login/dev', '/login/sso'];

router.beforeEach(async (to, from, next) => {
  document.title = `${to.meta.title || '欢迎使用'} | 完美世界 PAT2`;

  const token = Cookies.get(process.env.VITE_COOKIE_KEY);
  console.log(to);

  // next();

  // 已登录
  if (token && token !== undefined) {
    if (to.query.redirect) {
      next({
        path: to.query.redirect as string
      });
    } else {
      next();
    }
  } else {
    // 未登录
    if (ignorePaths.indexOf(to.path) > -1 || to.query.code) {
      next();
    } else {
      next({
        path: '/login/sso',
        query: {
          redirect: to.fullPath
        }
      });
    }
  }
});

export default router;
