/**
 * @description 表单校验规则
 */

import type { FieldRule } from 'vant/lib/field/types'

/** 手机号校验规则 */
export const mobileRules: FieldRule[] = [
  { required: true, message: '请输入手机号' },
  {
    pattern:
      /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/,
    message: '手机号格式不正确'
  }
]

/** 登录密码校验规则 */
export const passwordRules: FieldRule[] = [
  {
    required: true,
    message: '请输入密码'
  },
  {
    pattern: /^\w{8,24}$/,
    message: '密码需要8-24个字符'
  }
]

/** 验证码校验规则 */
export const codeRules: FieldRule[] = [
  { required: true, message: '请输入验证码' },
  {
    pattern: /^\d{6}$/,
    message: '验证码格式不正确'
  }
]

/** 身份证号码校验规则 */
export const idCardRules: FieldRule[] = [
  { required: true, message: '请输入身份证号码' },
  {
    pattern:
      /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/,
    message: '身份证格式不正确'
  }
]
