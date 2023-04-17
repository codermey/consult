import { ref } from 'vue'
import { defineStore } from 'pinia'
import { showSuccessToast } from 'vant'

import router from '@/router'
import { localCache } from '@/utils/cache'
import { CURRENT_ROUTE_PATH } from '@/constants'
import { postCodeLoginApi, postPasLoginApi } from '@/service/api/login'
import type { ILoginResult } from '@/types/login'

export const useLoginStore = defineStore(
  'login',
  () => {
    /** 用户信息 */
    const user = ref<ILoginResult>()

    /**
     * @description 密码登录
     * @param mobile 手机号
     * @param password 密码
     */
    const loginPasAction = async (mobile: string, password: string) => {
      const res = await postPasLoginApi(mobile, password)
      user.value = res.data
      showSuccessToast('登录成功')
      router.replace(localCache.getCache(CURRENT_ROUTE_PATH) || '/profile')
    }

    /**
     * 短信登录
     * @param mobile 手机号
     * @param code 验证码
     */
    const loginCodeAction = async (mobile: string, code: string) => {
      const res = await postCodeLoginApi(mobile, code)
      user.value = res.data
      showSuccessToast('登录成功')
      router.replace(localCache.getCache(CURRENT_ROUTE_PATH) || '/profile')
    }

    /**
     * @description 退出登录
     */
    const logoutAction = () => {
      user.value = undefined
      router.replace('/login')
    }

    return { user, loginPasAction, loginCodeAction, logoutAction }
  },
  {
    persist: {
      key: 'loginStore',
      paths: ['user']
    }
  }
)
