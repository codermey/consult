<script setup lang="ts">
import { RouterView } from 'vue-router'
import BaseIcon from '@/components/base-icon.vue'
import tabbarData from '@/assets/data/tabbar.json'
</script>

<template>
  <!-- 二级路由 -->
  <router-view v-slot="{ Component }">
    <!-- 缓存home页面 -->
    <keep-alive include="home">
      <component :is="Component"></component>
    </keep-alive>
  </router-view>

  <van-tabbar route safe-area-inset-bottom>
    <van-tabbar-item :to="item.path" v-for="item in tabbarData" :key="item.text">
      <span>{{ item.text }}</span>
      <template #icon="{ active }">
        <BaseIcon :name="`home-${active ? item.active : item.default}`" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>
<style lang="scss">
.van-tabbar-item__icon {
  font-size: 18px;
}
</style>
