import type { IDoctorResult, IKnowledgeRes, KnowledgeType } from '@/types/home'
import request from '../request'

/**
 * @description 百科文章列表
 * @param type recommend推荐，fatReduction减脂，food健康饮食，like关注医生页面文章
 * @param current 当前页
 * @param pageSize 每页数量
 * @returns
 */
export const getHomeKnowledgeApi = (type: KnowledgeType, current: number, pageSize = 10) =>
  request<IKnowledgeRes>(`/patient/home/knowledge`, 'GET', { type, current, pageSize })

/**
 * @description 获取医生列表
 * @param current
 * @param pageSize
 * @returns
 */
export const getDoctorListApi = (current = 1, pageSize = 10) =>
  request<IDoctorResult>('/home/page/doc', 'GET', { current, pageSize })
