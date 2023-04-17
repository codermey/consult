import { createRouter, createWebHistory } from 'vue-router'
import { useLoginStore } from '@/stores'

import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

/** 路由白名单 */
const whitePaths = ['/login', '/home', '/article']
router.beforeEach((to) => {
  document.title = to.meta.title ? `${document.title}-${to.meta.title}` : document.title
  const loginStore = useLoginStore()
  /** 没有token并且跳转路由路径不在白名单之内，回跳登录页面 */
  if (!loginStore.user?.token && !whitePaths.includes(to.path)) return '/login'
})
export default router
