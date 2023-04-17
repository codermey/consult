<script setup lang="ts">
import { RouterLink } from 'vue-router'

import useWindowSize from '@/hooks/useWindowSize'
import type { IDoctorInfo } from '@/types/home'

defineProps<{
  list: IDoctorInfo[]
}>()

const { width } = useWindowSize(150)
</script>

<template>
  <div class="home-follow-doctor">
    <div class="head">
      <p>推荐关注</p>
      <router-link to="/">
        <span>查看更多</span>
        <van-icon name="arrow" color="var(--tip-color)" />
      </router-link>
    </div>
    <van-swipe :width="width" :loop="false" :show-indicators="false">
      <van-swipe-item v-for="item in list" :key="item.id">
        <BaseDoctorCard :itemData="item" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<style lang="scss" scoped>
.home-follow-doctor {
  height: 250px;
  background-color: var(--bg-color);
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    height: 45px;
    font-size: 13px;
    span {
      color: var(--tip-color);
    }
  }
}
</style>
