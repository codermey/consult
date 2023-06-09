/**
 * @description 首页类型声明文件
 */
import type { Follow } from '@/enum'

/** 文章类型  recommend推荐，fatReduction减脂，food健康饮食，like关注医生页面文章 */
export type KnowledgeType = 'like' | 'recommend' | 'fatReduction' | 'food'

/** 文章信息 */
export interface IRow {
  /** 标题 */
  title: string
  /** 问诊ID */
  id: string
  /** 封面[] */
  coverUrl: string[]
  /** 标签[] */
  topics: string[]
  /** 收藏数 */
  collectionNumber: number
  /** 评论数 */
  commentNumber: number
  /** 医生名称 */
  creatorName: string
  /** 医生头像 */
  creatorAvatar: string
  /** 医生医院 */
  creatorHospatalName: string
  /** 医生科室 */
  creatorDep: string
  /** 医生职称 */
  creatorTitles: string
  /** 关注文章 */
  likeFlag: Follow // 是否关注 0未关注 1关注
  /** 内容 */
  content: string
  /** 医生ID */
  creatorId: string
}

/** 文章列表带分页 */
export interface IKnowledgeRes {
  pageTotal: number
  total: number
  rows: IRow[]
}

/** 医生信息 */
export interface IDoctorInfo {
  /** 医生ID */
  id: string
  /** 医生名称 */
  name: string
  /** 头像 */
  avatar: string
  /** 医院名称 */
  hospitalName: string
  /** 医院等级 */
  gradeName: string
  /** 科室 */
  depName: string
  /** 职称 */
  positionalTitles: string
  /** 是否关注，0 未关注 1 已关注 */
  likeFlag: Follow
  /** 接诊服务费 */
  serviceFee: number
  /** 接诊人数 */
  consultationNum: number
  /** 评分 */
  score: number
  /** 主攻方向 */
  major: string
}

/** 医生列表带分页 */
export interface IDoctorResult {
  pageTotal: number
  total: number
  rows: IDoctorInfo[]
}
