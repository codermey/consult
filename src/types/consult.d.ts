import type { ConsultType, ConsultTime, PayMethod } from '../enum'

/** 科室 */
export interface ISubDep {
  /** 科室ID */
  id: string
  /** 科室名称 */
  name: string
}

/** 一级科室 */
export interface ITopDep extends ISubDep {
  child: ISecondDep[]
}

/** 二级科室 */
export interface ISecondDep extends ISubDep {
  /** 科室图片 */
  avatar: string
}

/** 图片列表 */
export type Image = {
  /** 图片ID */
  id: string
  /** 图片地址 */
  url: string
}

/** 问诊记录 => 极速问诊参数 */
export interface IConsult {
  /** 问诊记录ID */
  id: string
  /** 问诊类型 */
  type: ConsultType
  /** 快速问诊类型，0 普通 1 三甲 */
  illnessType: 0 | 1
  /** 科室ID */
  depId: string
  /** 病情描述 */
  illnessDesc: string
  /** 患病时间：1一周内 2一月内 3半年内 4半年以上 */
  illnessTime: ConsultTime
  /** 是否问诊过：0未问诊 1问诊过 */
  consultFlag: 0 | 1
  /** 病例信息-图片集合 */
  pictures: Image[]
  /** 患者id */
  patientId?: string
  /** 优惠卷id */
  couponId: string
}

/** 图文问诊 => 病情描述 */
export type IllnessType = Pick<IConsult, 'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'>

/** 问诊订单预支付请求参数 */
export type ConsultOrderPreParams = Pick<IConsult, 'type' | 'illnessType'>

/** 问诊订单预支付信息 */
export type ConsultOrderPreData = {
  /** 积分抵扣 */
  pointDeduction: number
  /** 优惠券抵扣 */
  couponDeduction: number
  /** 优惠券ID */
  couponId: string
  /** 需付款 */
  payment: number
  /** 实付款 */
  actualPayment: number
}

/** 问诊订单支付请求参数 */
export interface IPayUrlParams {
  /** 支付方式 */
  paymentMethod: PayMethod
  /** 订单ID */
  orderId: string
  /** 支付完成后的回跳地址 */
  payCallback: string
}
