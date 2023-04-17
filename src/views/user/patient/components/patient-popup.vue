<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { showToast, showConfirmDialog } from 'vant'
import Validator from 'id-validator'
import type { FormInstance } from 'vant'

import BaseNavBar from '@/components/base-nav-bar.vue'
import BaseRadio from '@/components/base-radio.vue'
import { useUserStore } from '@/stores'
import { idCardRules } from '@/utils/rules'
import type { IPatient } from '@/types/user'
import { GenderType } from '@/enum'

interface IProps {
  show: boolean
  itemData: IPatient
}

const props = withDefaults(defineProps<IProps>(), {
  show: false
})
const emit = defineEmits<{
  (e: 'update:show', show: boolean): void
}>()

/** 患者信息 */
const patientInfo = ref({} as IPatient)

/** 通过计算属性，计算是否设置为默认患者 */
const defaultFlag = computed({
  get: () => (patientInfo.value.defaultFlag ? true : false),
  set: (newValue) => {
    patientInfo.value.defaultFlag = newValue ? 1 : 0
  }
})
/** 通过判断patientInfo中是否存在id属性判断新增患者还是编辑患者 */
const isEdit = computed(() => (patientInfo.value.id ? true : false))

/** 监听患者信息数据的改变，并将最新值赋给 patientInfo */
watch(
  () => props.itemData,
  (newValue) => {
    patientInfo.value = { ...newValue }
  }
)

const formRef = ref<FormInstance>()

/** 新增/编辑 患者信息逻辑 */
const userStore = useUserStore()
const savePatient = async () => {
  // 1. 表单验证
  await formRef.value?.validate()
  // 2. 身份证校验
  const validator = new Validator()
  if (!validator.isValid(patientInfo.value.idCard)) return showToast('身份证格式错误')
  // 3. 判断性别是否正确
  const { sex } = validator.getInfo(patientInfo.value.idCard)
  if (sex !== patientInfo.value.gender) return showToast('性别和身份证不符')
  // 4. 判断是新增患者还是编辑患者，发送对应网络请求
  if (patientInfo.value.id) {
    await userStore.updatePatientAction(patientInfo.value)
  } else {
    await userStore.addPatientAction(patientInfo.value)
  }
  emit('update:show', false)
}

/** 删除患者信息逻辑 */
const onSubmit = async () => {
  try {
    // 1. 表单验证
    await formRef.value?.validate()
    await showConfirmDialog({
      title: '温馨提示',
      message: `您确认要删除 ${patientInfo.value.name} 患者信息吗？`
    })
    // 2. 发送网络请求，删除患者信息
    await userStore.deletePatientAction(patientInfo.value.id as string)
    emit('update:show', false)
  } catch (error) {
    console.log(error)
  }
}

/** BaseRadio组件的配置项 */
const options = [
  { label: '男', value: GenderType.Man },
  { label: '女', value: GenderType.Woman }
]
</script>

<template>
  <van-popup :show="show" position="right" :style="{ width: '100%', height: '100%' }">
    <BaseNavBar
      :title="isEdit ? '编辑患者' : '新增患者'"
      right-text="保存"
      :back="() => $emit('update:show', false)"
      @click-right="savePatient"
    />
    <van-form ref="formRef">
      <van-field
        v-model="patientInfo.name"
        name="name"
        label="真实姓名"
        placeholder="请输入真实姓名"
        :rules="[{ required: true, message: '请输入真实姓名' }]"
      />
      <van-field
        v-model="patientInfo.idCard"
        name="idCard"
        label="身份证号码"
        placeholder="请输入身份证号码"
        maxlength="18"
        :rules="idCardRules"
      />
      <van-field class="radio-btn" label="性别">
        <template #input>
          <BaseRadio v-model="patientInfo.gender" :options="options" />
        </template>
      </van-field>
      <van-field label="默认就诊人">
        <template #input>
          <van-checkbox v-model="defaultFlag" icon-size="4.8vw"></van-checkbox>
        </template>
      </van-field>
      <div class="btn" v-if="isEdit">
        <van-button round block plain type="danger" @click="onSubmit"> 删除 </van-button>
      </div>
    </van-form>
  </van-popup>
</template>

<style lang="scss" scoped>
:deep(.radio-btn) {
  align-items: center;
}
.btn {
  position: fixed;
  bottom: 10px;
  padding: 0 10px;
  width: 100vw;
  height: 40px;
  .van-button {
    height: 40px;
  }
}
</style>
