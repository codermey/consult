<script setup lang="ts">
import { ref } from 'vue'
import { showToast } from 'vant'

import LoginPassword from './login-password.vue'
import LoginCode from './login-code.vue'

// 登录方式（true：密码登录；false：短信验证码登录）
const isPasLogin = ref(true)
const isCheck = ref(false)

/** 监听登录按钮点击 */
const LoginPasswordRef = ref<InstanceType<typeof LoginPassword>>()
const LoginCodeRef = ref<InstanceType<typeof LoginCode>>()
const handleLoginClick = () => {
  if (!isCheck.value) return showToast('请勾选用户协议')
  isPasLogin.value ? LoginPasswordRef.value?.loginPassword() : LoginCodeRef.value?.loginCode()
}
</script>

<template>
  <div class="login-panel">
    <div class="header">
      <h3>{{ isPasLogin ? '密码登录' : '短信验证码登录' }}</h3>
      <div class="right" @click="isPasLogin = !isPasLogin">
        <span>{{ isPasLogin ? '短信验证码登录' : '密码登录' }}</span>
        <van-icon name="arrow" />
      </div>
    </div>
    <LoginPassword ref="LoginPasswordRef" v-if="isPasLogin" />
    <LoginCode ref="LoginCodeRef" v-else />
    <div class="row">
      <div class="cell">
        <van-checkbox v-model="isCheck">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cell btn">
        <van-button round block type="primary" @click="handleLoginClick"> 登录 </van-button>
      </div>
      <div class="cell">
        <span class="text">忘记密码？</span>
      </div>
    </div>
    <div class="other">
      <van-divider>第三方登录</van-divider>
      <div class="qq">
        <BaseIcon name="login-qq" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 30px 30px 50px;
  h3 {
    font-weight: normal;
    font-size: 24px;
  }
  .right {
    font-size: 15px;
    color: var(--text2-color);
  }
}

.row {
  padding: 0 14px;
  .cell {
    padding: 14px 16px;
    a {
      padding: 0 5px;
      color: var(--primary-color);
    }
    .text {
      color: var(--text1-color);
    }
  }
}

.other {
  margin-top: 60px;
  padding: 0 30px;
  .qq {
    display: flex;
    justify-content: center;
    font-size: 36px;
  }
}
</style>
