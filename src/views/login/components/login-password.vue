<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from 'vant'

import BaseIcon from '@/components/base-icon.vue'
import { useLoginStore } from '@/stores'
import { mobileRules, passwordRules } from '@/utils/rules'

// 是否显示密码
const showPassword = ref(false)

/** 密码登录相关逻辑逻辑 */
const loginForm = reactive({
  mobile: '',
  password: ''
})
const loginFormRef = ref<FormInstance>()
const loginStore = useLoginStore()
async function loginPassword() {
  // 1. 表单校验
  await loginFormRef.value?.validate()
  // 2. 发送网络请求，登录并路由跳转
  const { mobile, password } = loginForm
  loginStore.loginPasAction(mobile, password)
}

defineExpose({
  loginPassword
})
</script>

<template>
  <div class="login-password">
    <van-form ref="loginFormRef">
      <van-field
        v-model="loginForm.mobile"
        name="mobile"
        type="tel"
        placeholder="请输入手机号"
        maxlength="11"
        :rules="mobileRules"
      />
      <van-field
        v-model="loginForm.password"
        name="password"
        :type="showPassword ? 'text' : 'password'"
        placeholder="请输入密码"
        maxlength="24"
        :rules="passwordRules"
        @click-right-icon="showPassword = !showPassword"
      >
        <template #right-icon>
          <BaseIcon :name="`login-eye-${showPassword ? 'on' : 'off'}`" />
        </template>
      </van-field>
    </van-form>
  </div>
</template>

<style lang="scss" scoped>
.van-form {
  padding: 0 14px;
}
</style>
