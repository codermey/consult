/**
 * @description 组件类型声明文件
 * @Author codermey
 */
import BaseNavBar from '@/components/base-nav-bar.vue'
import BaseCode from '@/components/base-code.vue'
import BaseIcon from '@/components/base-icon.vue'
import BaseRadio from '@/components/base-radio.vue'
import BaseRow from '@/components/base-row.vue'
import BaseKnowledgeCard from '@/components/base-knowledge-card.vue'
import BaseDoctorCard from '@/components/base-doctor-card.vue'
import BasePay from '@/components/base-pay.vue'

declare module 'vue' {
  interface GlobalComponents {
    BaseNavBar: typeof BaseNavBar
    BaseCode: typeof BaseCode
    BaseIcon: typeof BaseIcon
    BaseRadio: typeof BaseRadio
    BaseRow: typeof BaseRow
    BaseKnowledgeCard: typeof BaseKnowledgeCard
    BaseDoctorCard: typeof BaseDoctorCard
    BasePay: typeof BasePay
  }
}
