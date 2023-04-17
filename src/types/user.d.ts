/**
 * @description user模块类型声明文件
 * @author codermey
 */

import type { GenderType } from '../enum'
import type { ILoginResult } from './login'

/** 订单数量 */
export interface IOrderInfo {
  /** 待付款 */
  paidNumber: number
  /** 待发货 */
  receivedNumber: number
  /** 待收货 */
  shippedNumber: number
  /** 已完成 */
  finishedNumber: number
}

/** 问诊中信息类型 */
export interface IConsultationInfo {
  id: string
  name: string
  avatar: string
  depName: string
  positionalTitles: string
  hospitalName: string
  gradeName: string
  orderId: string
}

/** 用户信息 */
export interface IUserInfo extends Omit<ILoginResult, 'token'> {
  /** 关注 */
  likeNumber: number
  /** 收藏 */
  collectionNumber: number
  /** 积分 */
  score: number
  /** 优惠券 */
  couponNumber: number
  consultationInfo: IConsultationInfo[]
  /** 订单数量 */
  orderInfo: IOrderInfo
}

/** 关注操作请求参数类型 topic百科话题,knowledge百科文章,doc医生,disease疾病 */
export type FollowType = 'topic' | 'knowledge' | 'doc' | 'disease'

/** 家庭档案-患者信息 */
export interface IPatient {
  /** 患者ID */
  id?: string
  /** 患者名称 */
  name: string
  /** 身份证号 */
  idCard: string
  /** 是否是默认患者 0不是默认，1是默认 */
  defaultFlag: 0 | 1
  /** 性别 */
  gender: GenderType
  /** 性别文字 */
  genderValue?: string
  /** 年龄 */
  age?: number
}

/** 家庭档案-患者信息列表  */
export type IPatientList = IPatient[]
