import request from '@/service/request'
import type { ILoginResult, CodeType } from '@/types/login'

/**
 * @description 密码登录
 * @param mobile 手机号
 * @param password 密码
 * @returns
 */
export const postPasLoginApi = (mobile: string, password: string) =>
  request<ILoginResult>('/login/password', 'post', { mobile, password })

/**
 * @description 发送验证码
 * @param mobile 手机号
 * @param type 验证码类型
 * @returns
 */
export const getCodeApi = (mobile: string, type: CodeType) =>
  request<{ code: string }>('/code', 'get', { mobile, type })

/**
 * @description 短信登录
 * @param mobile 手机号
 * @param code 验证码
 * @returns
 */
export const postCodeLoginApi = (mobile: string, code: string) =>
  request<ILoginResult>('/login', 'post', { mobile, code })
