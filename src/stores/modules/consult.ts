import { ref } from 'vue'
import { defineStore } from 'pinia'
import { showImagePreview, showLoadingToast } from 'vant'

import {
  getAllDepApi,
  getConsultOrderPreApi,
  getPrescriptionPic,
  postConsultOrderApi,
  postConsultOrderPayUrl
} from '@/service/api/consult'

import { getConsultOrderDetail } from '@/service/api/order'
import type { ConsultOrderItem } from '@/types/order'
import type {
  IConsult,
  IllnessType,
  ITopDep,
  ConsultOrderPreData,
  IPayUrlParams
} from '@/types/consult'
import type { ConsultType } from '@/enum'

export const useConsultStore = defineStore(
  'consult',
  () => {
    /** 问诊科室 */
    // 1. 科室数据
    const alldepList = ref<ITopDep[]>([])
    // 2. 获取科室数据
    const getAllDepAction = async () => {
      const res = await getAllDepApi()
      alldepList.value = res.data
    }

    /** 问诊相关逻辑 */
    // 1. 问诊数据记录
    const consult = ref<IConsult>({} as IConsult)
    // 2.设置问诊类型
    const setType = (type: ConsultType) => (consult.value.type = type)
    // 3. 设置极速问诊级别
    const setIllnessType = (type: 0 | 1) => (consult.value.illnessType = type)
    // 4. 设置科室
    const setDep = (id: string) => (consult.value.depId = id)
    // 5. 设置病情描述
    const setIllness = (illness: IllnessType) => {
      consult.value.illnessDesc = illness.illnessDesc
      consult.value.illnessTime = illness.illnessTime
      consult.value.consultFlag = illness.consultFlag
      consult.value.pictures = illness.pictures
    }
    // 6. 设置患者
    const setPatient = (id: string) => (consult.value.patientId = id)
    // 7. 设置优惠券
    const setCunpon = (id: string) => (consult.value.couponId = id)
    // 8. 清空记录
    const clear = () => (consult.value = {} as IConsult)

    /** 问诊预支付页面相关逻辑 */
    // 1. 页面数据
    const prePayData = ref<ConsultOrderPreData>()
    // 2. 预支付页面数据请求
    const getPreOrderAction = async () => {
      const res = await getConsultOrderPreApi({
        type: consult.value.type,
        illnessType: consult.value.illnessType
      })
      prePayData.value = res.data
    }

    /** 问诊订单相关逻辑 */
    //  订单ID
    const orderID = ref('')
    /** 创建订单 */
    const createConslutOrderAction = async () => {
      const res = await postConsultOrderApi(consult.value)
      orderID.value = res.data.id
    }

    /** 问诊订单单项详情 */
    const orderItemInfo = ref<ConsultOrderItem>()
    const getOrderDetailsAction = async () => {
      const res = await getConsultOrderDetail(orderID.value)
      orderItemInfo.value = res.data
    }

    /** 支付相关逻辑,获取支付地址，并跳转到对应页面 */
    const getConslutPayUrlAction = async (data: IPayUrlParams) => {
      showLoadingToast('跳转支付')
      const res = await postConsultOrderPayUrl(data)
      // 跳转到支付平台
      window.location.href = res.data.payUrl
    }

    /**
     * @description 查看处方
     * @param id 处方ID
     */
    const showPrescriptionAction = async (id?: string) => {
      if (!id) return
      const res = await getPrescriptionPic(id)
      showImagePreview([res.data.url])
    }

    return {
      orderItemInfo,
      alldepList,
      consult,
      prePayData,
      orderID,
      getAllDepAction,
      setType,
      setIllnessType,
      setDep,
      setIllness,
      setPatient,
      setCunpon,
      clear,
      getPreOrderAction,
      createConslutOrderAction,
      getConslutPayUrlAction,
      showPrescriptionAction,
      getOrderDetailsAction
    }
  },
  {
    persist: {
      key: 'consult',
      paths: ['consult', 'orederID']
    }
  }
)
