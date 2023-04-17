<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from 'vant'

import { useLoginStore } from '@/stores'
import BaseCode from '@/components/base-code.vue'
import { mobileRules, codeRules } from '@/utils/rules'

/** 短信登录相关逻辑逻辑 */
const loginForm = reactive({
  mobile: '',
  code: ''
})
const loginFormRef = ref<FormInstance>()
const loginStore = useLoginStore()
async function loginCode() {
  // 1. 表单校验
  await loginFormRef.value?.validate()
  // 2. 发送网络请求，登录并路由跳转
  const { mobile, code } = loginForm
  loginStore.loginCodeAction(mobile, code)
}

defineExpose({
  loginCode
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
        v-model="loginForm.code"
        name="code"
        placeholder="请输入验证码"
        maxlength="24"
        :rules="codeRules"
      >
        <template #button>
          <BaseCode :mobile="loginForm.mobile" type="login" />
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
