import axios from 'axios'
import { showToast } from 'vant'
import type { AxiosError, Method } from 'axios'

import router from '@/router'
import { BASE_URL, TIME_OUT } from '../config'
import { useLoginStore } from '@/stores'
import { localCache } from '@/utils/cache'
import { CURRENT_ROUTE_PATH } from '@/constants'

/** 创建axios实例 */
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

/** 请求拦截器 */
instance.interceptors.request.use(
  (config) => {
    /** 请求携带token */
    const loginStore = useLoginStore()
    if (loginStore.user?.token && config.headers) {
      config.headers['Authorization'] = `Bearer ${loginStore.user.token}`
    }
    return config
  },
  (err: AxiosError) => {
    return Promise.reject(err)
  }
)

/** 响应拦截器 */
instance.interceptors.response.use(
  (res) => {
    /** 后台约定响应成功， code !== 10000 业务请求失败 */
    if (res.data.code !== 10000) {
      showToast(res.data.message)
      return Promise.reject(res.data)
    }
    return res.data
  },
  (err: AxiosError) => {
    if (err.response?.status === 401) {
      // 缓存接口失效页面的路由地址，下次登录完成回跳使用
      localCache.setCache(CURRENT_ROUTE_PATH, router.currentRoute.value.fullPath)
      // 跳回登录页
      const loginStore = useLoginStore()
      loginStore.logoutAction()
    }
    return Promise.reject(err)
  }
)

/** 请求响应数据类型 */
interface IRes<T> {
  code: number
  message: string
  data: T
}

/** 请求工具库的封装 */
const request = <T = any>(url: string, method: Method = 'GET', data?: object) => {
  return instance.request<T, IRes<T>>({
    url,
    method,
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: data
  })
}

export default request
