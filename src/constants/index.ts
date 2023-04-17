import { ConsultTime } from '@/enum'

export const CURRENT_ROUTE_PATH = 'current_route_path'

/** 患病时间 */
export const illnessTimes = [
  { label: '一周内', value: ConsultTime.Week },
  { label: '一月内', value: ConsultTime.Month },
  { label: '半年内', value: ConsultTime.HalfYear },
  { label: '大于半年', value: ConsultTime.More }
]
/** 是否就诊过 */
export const consultFlags = [
  { label: '就诊过', value: 1 },
  { label: '没就诊过', value: 0 }
]
