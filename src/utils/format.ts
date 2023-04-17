import dayjs from 'dayjs'
import { consultFlags, illnessTimes } from '@/constants'
import type { ConsultTime } from '@/enum'

/**
 * @description 格式化价格
 * @param price 价格
 * @returns
 */
export function formatPrice(price: string | number | undefined) {
  if (price === undefined) return '￥' + '0.00'
  return '￥' + Number(price).toFixed(2)
}

/**
 * @description 格式化患病时间,将后台返回的数字转换成文字
 * @param time 患病时间
 * @returns
 */
export function formatIllnessTime(time: ConsultTime) {
  return illnessTimes.find((val) => val.value === time)?.label
}

/**
 * @description 格式化是否就诊过,将后台返回的数字转换成文字
 * @param flag 是否就诊过 0:就诊 1:没有就诊
 * @returns
 */
export function formatConsultFlag(flag: 0 | 1) {
  return consultFlags.find((val) => val.value === flag)?.label
}

/**
 * @description 格式化时间
 * @param time 时间
 * @param format 需要转化的格式
 * @returns
 */
export function formatTime(time?: string, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(time).format(format)
}
