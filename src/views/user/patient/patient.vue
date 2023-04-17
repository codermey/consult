<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { showFailToast } from 'vant'
import { useRoute, useRouter } from 'vue-router'

import { GenderType } from '@/enum'
import BaseNavBar from '@/components/base-nav-bar.vue'
import PatientItem from './components/patient-item.vue'
import BaseIcon from '@/components/base-icon.vue'
import PatientPopup from './components/patient-popup.vue'
import { useUserStore, useConsultStore } from '@/stores'
import type { IPatient } from '@/types/user'

/** 发送请求，获取患者信息列表 */
const userStore = useUserStore()
const { patientList } = storeToRefs(userStore)
userStore.getPatientListAction().then(() => {
  if (!select.value) return
  selectPatientID.value = defaultSelect ? defaultSelect?.id : patientList.value[0]?.id
})

/** 编辑/新增 患者信息 */
// 1. 弹出层是否显示
const showPopup = ref(false)
// 2. 患者信息初始值
const initPatient: IPatient = {
  name: '',
  idCard: '',
  gender: GenderType.Man,
  defaultFlag: 0
}
const patientInfo = ref<IPatient>({ ...initPatient })
/** 编辑患者信息 */
const onEdit = (event: Event, item: IPatient) => {
  event.stopPropagation()
  const { id, gender, name, idCard, defaultFlag } = item
  patientInfo.value = { id, gender, name, idCard, defaultFlag }
  showPopup.value = true
}
/** 新增患者信息 */
const onAdd = () => {
  patientInfo.value = { ...initPatient }
  showPopup.value = true
}

/** 选择患者相关逻辑 */
const route = useRoute()
const select = computed(() => route.query.select)
const selectPatientID = ref<string | undefined>('')
// 默认选中的患者
const defaultSelect = patientList.value.find((val) => val.defaultFlag === 1)

const handleItemClick = (id: string | undefined) => {
  if (!select.value) return
  selectPatientID.value = id
}

/** 下一步，记录患者ID，并跳转待支付页面 */
const router = useRouter()
const consultStore = useConsultStore()
const onNext = () => {
  if (!selectPatientID.value) return showFailToast('请选择问诊患者')
  consultStore.setPatient(selectPatientID.value)
  router.push('/consult/pay')
}
</script>

<template>
  <div class="patient">
    <BaseNavBar :title="select ? '选择患者' : '家庭档案'" />
    <div class="patient-select" v-if="select">
      <h3>请选择患者信息</h3>
      <p>以便医生给出更准确的治疗，信息仅医生可见</p>
    </div>
    <div class="patient-list">
      <template v-for="item in patientList" :key="item.id">
        <PatientItem
          :itemData="item"
          :active="selectPatientID === item.id"
          @iconClick="(event) => onEdit(event, item)"
          @click="handleItemClick(item.id)"
        />
      </template>
      <div class="patient-add" v-if="patientList.length < 6" @click="onAdd()">
        <BaseIcon name="user-add" />
        <span>添加患者</span>
      </div>
      <div class="patient-tip">最多可添加 6 人</div>
    </div>
    <div class="btn" v-if="select">
      <van-button round block type="primary" @click="onNext">下一步 </van-button>
    </div>
  </div>
  <!-- 弹出层 -->
  <PatientPopup v-model:show="showPopup" :itemData="patientInfo" />
</template>

<style lang="scss" scoped>
.patient {
  &-select {
    padding: 15px;
    > h3 {
      margin-bottom: 5px;
      font-weight: normal;
      font-size: 16px;
      line-height: 21px;
    }
    > p {
      font-size: 14px;
      color: var(--text3-color);
      line-height: 19px;
    }
  }
  &-list {
    padding: 15px;
  }
  &-add {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 0;
    background-color: var(--bg-color);
    font-size: 24px;
    color: var(--primary-color);
    > span {
      font-size: 14px;
      line-height: 20px;
    }
  }
  &-tip {
    padding: 12px 0;
    color: var(--tag-color);
  }
  .btn {
    padding: 15px;
  }
}
</style>
