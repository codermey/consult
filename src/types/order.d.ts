import type { IPatient } from './user'
import type { IDoctorInfo } from './home'
import type { ConsultType, OrderType } from '@/enum'
import type { IConsult } from './consult'

/** 药品订单详情 */
export type OrderDetail = {
  /** 药品订单ID */
  id: string
  /** 药品订单编号 */
  orderNo: string
  /** 订单类型 */
  type: number
  /** 创建时间 */
  createTime: string
  /** 处方ID */
  prescriptionId: string
  /** 订单状态 */
  status: OrderType
  /** 订单状态说明 */
  statusValue: string
  /** 药品清单 */
  medicines: Medical[]
  /** 支付倒计时时间 */
  countDown: number
  /** 收货地址 */
  addressInfo: Address
  /** 物流信息 */
  expressInfo: {
    /** 物流最新位置 */
    content: string
    /** 物流最新时间 */
    time: string
  }
  /** 支付时间 */
  payTime: string
  /** 支付方式 */
  paymentMethod?: 0 | 1
  /** 支付金额 */
  payment: number
  /** 积分抵扣 */
  pointDeduction: number
  /** 优惠券抵扣 */
  couponDeduction: number
  /** 邮费 */
  expressFee: number
  /** 实付金额 */
  actualPayment: number
  /** 问诊室ID */
  roomId: string
}

/** 问诊订单单项信息 */
export type ConsultOrderItem = IConsult & {
  /** 创建时间 */
  createTime: string
  /** 医生信息 */
  docInfo?: IDoctorInfo
  /** 患者信息 */
  patientInfo: IPatient
  /** 订单编号 */
  orderNo: string
  /** 订单状态 */
  status: OrderType
  /** 状态文字 */
  statusValue: string
  /** 类型问诊文字 */
  typeValue: string
  /** 倒计时时间 */
  countdown: number
  /** 处方ID */
  prescriptionId?: string
  /** 评价ID */
  evaluateId: number
  /** 应付款 */
  payment: number
  /** 优惠券抵扣 */
  couponDeduction: number
  /** 积分抵扣 */
  pointDeduction: number
  /** 实付款 */
  actualPayment: number
}

/** 问诊订单列表传参 */
export interface IConsultOrderListParams {
  /** 当前页 */
  current: number
  /** 每页数据量 */
  pageSize: number
  /** 问诊订单类型 */
  type: ConsultType
}

/** 问诊订单列表带分页 */
export interface IConsultOrderListRes {
  /** 总页数 */
  pageTotal: number
  /** 总条数 */
  total: number
  /** 问诊订单列表 */
  rows: ConsultOrderItem[]
}
