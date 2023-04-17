import request from '@/service/request'
import type { IConsultOrderListParams, IConsultOrderListRes, ConsultOrderItem } from '@/types/order'

/**
 * @description 问诊订单单项信息
 * @param orderId 订单ID
 * @returns
 */
export const getConsultOrderDetail = (orderId: string) =>
  request<ConsultOrderItem>('/patient/consult/order/detail', 'GET', { orderId })

/**
 * @description 问诊订单列表
 * @param params
 * @returns
 */
export const getConsultOrderListApi = (params: IConsultOrderListParams) =>
  request<IConsultOrderListRes>('/patient/consult/order/list', 'GET', params)

/**
 * @description 取消订单
 * @param id 订单ID
 * @returns
 */
export const cancelOrderApi = (id: string) => request(`/patient/order/cancel/${id}`, 'PUT')

/**
 * @description 删除订单
 * @param id 订单ID
 * @returns
 */
export const deleteOrderApi = (id: string) => request(`/patient/order/${id}`, 'DELETE')
