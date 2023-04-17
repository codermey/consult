<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { showSuccessToast, showToast } from 'vant'

import { getCodeApi } from '@/service/api/login'

const { mobile, type } = defineProps<{
  mobile: string
  type: 'login' | 'register'
}>()

/** 发送验证码逻辑 */
const time = ref(-1)
let timer: number
const handleCodeClick = async () => {
  if (!mobile) return showToast('请输入手机号')
  if (time.value >= 0) return
  try {
    await getCodeApi(mobile, type)
    showSuccessToast('发送成功')
  } catch (error) {
    Promise.reject(error)
  }
  time.value = 59
  timer = setInterval(() => {
    time.value--
    if (time.value < 0) clearInterval(timer)
  }, 1000)
}

/** 清除定时器 */
onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <span
    :style="{ color: time < 0 ? 'var(--primary-color)' : '#16c2a380' }"
    @click="handleCodeClick"
    >{{ time < 0 ? '发送验证码' : `${time}s后再次发送` }}</span
  >
</template>
