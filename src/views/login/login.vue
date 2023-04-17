<script setup lang="ts">
import BaseNavBar from '@/components/base-nav-bar.vue'
import LoginPanel from './components/login-panel.vue'
</script>

<template>
  <div class="login">
    <BaseNavBar title="登录" right-text="注册" />
    <LoginPanel />
  </div>
</template>

<style lang="scss" scoped></style>
