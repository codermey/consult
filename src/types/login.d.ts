/**
 * @description 登录页面类型声明文件
 * @author codermey
 */

/** login登录register注册changeMobile更换手机号forgetPassword找回密码,bindMobile绑定三方登录 */
export type CodeType = 'login' | 'register' | 'changeMobile' | 'forgetPassword' | 'bindMobile'

/** 登录成功返回用户信息 */
export interface ILoginResult {
  /** 用户token */
  token: string
  /** 用户头像 */
  avatar: string
  /** 登录手机号 */
  mobile: string
  /** 用户名 */
  account: string
  /** 用户ID */
  id: string
}
