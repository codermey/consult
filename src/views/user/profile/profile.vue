<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { showConfirmDialog } from 'vant'

import { useUserStore, useLoginStore } from '@/stores'
import ProfileHead from './components/profile-head.vue'
import ProfileOrder from './components/profile-order.vue'
import ProfileTool from './components/profile-tool.vue'

/** 获取用户信息 */
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
userStore.getUserInfoAction()

/** 退出登录逻辑 */
const loginStore = useLoginStore()
const logout = async () => {
  try {
    await showConfirmDialog({
      title: '温馨提示',
      message: '您确认要退出优医问诊吗？'
    })
    loginStore.logoutAction()
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="profile">
    <!-- 头部模块 -->
    <ProfileHead :userInfo="userInfo" />
    <!-- 药品订单模块 -->
    <ProfileOrder :orderInfo="userInfo!.orderInfo" />
    <!-- 快捷工具 -->
    <ProfileTool />
    <div class="log-out">
      <span @click="logout">退出登录</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  padding: 0 15px 65px;
  min-height: calc(100vh - 50px);
  background-color: var(--bg-color);
  .log-out {
    margin: 20px 0;
    text-align: center;
    color: var(--price-color);
  }
}
</style>
