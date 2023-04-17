import request from '@/service/request'
import type { Image } from '@/types/consult'
import type { IPatientList, IPatient, FollowType, IUserInfo } from '@/types/user'

/**
 * @description 获取用户信息
 * @returns
 */
export const getUserInfoApi = () => request<IUserInfo>('/patient/myUser', 'get')

/**
 * @description 关注操作
 * @param id 关注id
 * @param type  关注类型
 * @returns
 */
export const postFollowApi = (id: string, type: FollowType) =>
  request('/like', 'POST', { id, type })

/**
 * @description 上传文件/图片
 * @param file  上传的文件
 * @returns
 */
export const postUploadApi = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return request<Image>('/upload', 'post', formData)
}

/**
 * @description 获取患者信息列表
 * @returns
 */
export const getPatientListApi = () => request<IPatientList>('/patient/mylist')

/**
 * @description 编辑患者信息
 * @param data 患者信息参数
 * @returns
 */
export const updatePatientApi = (data: IPatient) =>
  request<{ id: string }>('patient/update', 'put', data)

/**
 * @description 新增患者信息
 * @param data 患者信息参数
 * @returns
 */
export const addPatientApi = (data: IPatient) =>
  request<{ id: string }>('/patient/add', 'POST', data)

/**
 * @description 删除患者信息
 * @param id 患者信息id
 * @returns
 */
export const deletePatientApi = (id: string) =>
  request<{ id: string }>(`/patient/del/${id}`, 'DELETE')

/**
 * @description 获取患者详情
 * @param id 患者ID
 * @returns
 */
export const getPatientInfoApi = (id: string) => request<IPatient>(`/patient/info/${id}`)
