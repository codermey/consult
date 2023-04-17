import { ref } from 'vue'
import { defineStore } from 'pinia'

import { getDoctorListApi } from '@/service/api/home'
import type { IDoctorInfo } from '@/types/home'

export const useHomeStore = defineStore('home', () => {
  const doctorList = ref<IDoctorInfo[]>([])

  const getDoctorListAction = async () => {
    const res = await getDoctorListApi()
    doctorList.value = res.data.rows
  }

  return { doctorList, getDoctorListAction }
})
