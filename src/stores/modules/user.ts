import { ref } from 'vue'
import { defineStore } from 'pinia'
import { showSuccessToast } from 'vant'

import {
  addPatientApi,
  deletePatientApi,
  getPatientListApi,
  updatePatientApi,
  getPatientInfoApi,
  getUserInfoApi
} from '@/service/api/user'
import type { IPatient, IPatientList, IUserInfo } from '@/types/user'

export const useUserStore = defineStore('user', () => {
  /** 用户信息 */
  const userInfo = ref({} as IUserInfo)

  /**
   * @description 获取用户个人信息
   */
  const getUserInfoAction = async () => {
    const res = await getUserInfoApi()
    console.log(res.data)
    userInfo.value = res.data
  }

  /** 患者信息列表 */
  const patientList = ref<IPatientList>([])
  /**
   * @description 获取患者信息列表
   */
  const getPatientListAction = async () => {
    const res = await getPatientListApi()
    patientList.value = res.data
  }

  /**
   * @description 更新患者信息
   * @param patient 患者信息
   */
  const updatePatientAction = async (patient: IPatient) => {
    await updatePatientApi(patient)
    showSuccessToast('编辑成功')
    // 编辑成功后刷新患者信息列表，并关闭弹出层
    getPatientListAction()
  }

  /**
   * @description 新增患者信息
   * @param patient 患者信息
   */
  const addPatientAction = async (patient: IPatient) => {
    await addPatientApi(patient)
    showSuccessToast('新增成功')
    // 新增成功后刷新患者信息列表，并关闭弹出层
    getPatientListAction()
  }

  /**
   * @description 删除患者信息
   * @param id 患者信息id
   */
  const deletePatientAction = async (id: string) => {
    await deletePatientApi(id)
    showSuccessToast('删除成功')
    // 删除成功成功后刷新患者信息列表，并关闭弹出层
    getPatientListAction()
  }

  /** 患者详情信息 */
  const patientData = ref<IPatient>()
  const getPatientInfoAction = async (id: string) => {
    const res = await getPatientInfoApi(id)
    patientData.value = res.data
  }

  return {
    patientList,
    patientData,
    userInfo,
    getUserInfoAction,
    getPatientListAction,
    updatePatientAction,
    addPatientAction,
    deletePatientAction,
    getPatientInfoAction
  }
})
