import request from '../request'
import type {
  ITopDep,
  IConsult,
  ConsultOrderPreParams,
  ConsultOrderPreData,
  IPayUrlParams
} from '@/types/consult'

/**
 * @description 获取所有科室
 * @returns
 */
export const getAllDepApi = () => request<ITopDep[]>('/dep/all')

/**
 * @description 问诊预支付页面请求
 * @param params 问诊类型和问诊级别
 * @returns
 */
export const getConsultOrderPreApi = (params: ConsultOrderPreParams) =>
  request<ConsultOrderPreData>('/patient/consult/order/pre', 'GET', params)

/**
 * @description 创建问诊订单
 * @param data  极速问诊参数
 * @returns
 */
export const postConsultOrderApi = (data: IConsult) =>
  request<{ id: string }>('/patient/consult/order', 'POST', data)

/**
 * @description 获取支付地址
 * @param data  paymentMethod：支付方式（0 是微信  1 支付宝）
 *              orderId：订单ID  payCallback：支付完成回调地址
 * @returns
 */
export const postConsultOrderPayUrl = (data: IPayUrlParams) =>
  request<{ payUrl: string }>('/patient/consult/pay', 'POST', data)

/**
 * @description 查看处方
 * @param id 处方ID
 * @returns
 */
export const getPrescriptionPic = (id: string) =>
  request<{ url: string }>(`/patient/consult/prescription/${id}`)

/**
 * @description 评价医生
 * @param data
 * @returns
 */
export const postEvaluateDocApi = (data: {
  docId: string
  orderId: string
  score: number
  content: string
  anonymousFlag: 0 | 1
}) => request<{ id: string }>('/patient/order/evaluate', 'POST', data)
