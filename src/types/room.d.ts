import type { Image, IConsult } from './consult'
import type { IPatient } from './user'
import type { GenderType, PrescriptionStatus, MsgType } from '@/enum'

/** 药品 */
export type Medical = {
  /** 药品ID */
  id: string
  /** 药品名称 */
  name: string
  /** 金额 */
  amount: string
  /** 药品图片 */
  avatar: string
  /** 规格信息 */
  specs: string
  /** 用法用量 */
  usageDosag: string
  /** 数量 */
  quantity: string
  /** 是否处方，0 不是 1 是 */
  prescriptionFlag: 0 | 1
}

/** 处方 */
export type Prescription = {
  /** 处方ID */
  id: string
  /** 药品订单ID */
  orderId: string
  /** 创建时间 */
  createTime: string
  /** 患者名称 */
  name: string
  /** 问诊记录ID */
  recordId: string
  /** 性别 0 女 1 男 */
  gender: GenderType
  /** 性别文字 */
  genderValue: string
  /** 年龄 */
  age: number
  /** 诊断信息 */
  diagnosis: string
  /** 处方状态 */
  status: PrescriptionStatus
  /** 药品订单 */
  medicines: Medical[]
}

/** 评价医生 */
export type EvaluateDoc = {
  /** 评价ID */
  id?: string
  /** 评分 */
  score?: number
  /** 内容 */
  content?: string
  /** 创建时间 */
  createTime?: string
  /** 创建人 */
  creator?: string
}

/** 消息类型：聊天-接收对话信息api */
export type Message = {
  /** 消息ID */
  id: string
  /** 消息类型 */
  msgType: MsgType
  /** 发信人 */
  from?: string
  /** 发信人头像 */
  fromAvatar?: string
  /** 收信人 */
  to?: string
  /** 收信人头像 */
  toAvatar?: string
  /** 创建时间 */
  createTime: string
  /** 具体消息内容 */
  msg: {
    /** 文字类型 */
    content?: string
    /** 图片类型 */
    picture?: Image
    /** 问诊记录，患者信息 */
    consultRecord?: IConsult & {
      patientInfo: IPatient
    }
    /** 处方信息 */
    prescription?: Prescription
    /** 评价信息 */
    evaluateDoc?: EvaluateDoc
  }
}

/** 消息分组：聊天-查询历史聊天记录api */
export type TimeMessages = {
  /** 分组消息最早时间 */
  createTime: string
  /** 消息数组 */
  items: Message[]
  /** 订单ID */
  orderId: string
  /** 会话ID */
  sid: string
}
