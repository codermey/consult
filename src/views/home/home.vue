<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import HomeHead from './components/home-head.vue'
import HomeNav from './components/home-nav.vue'
import homeBanner from './components/home-banner.vue'
import HomeKnowledgeList from './components/home-knowledge-list.vue'
import HomeFollowDoctor from './components/home-follow-doctor.vue'
import { useHomeStore } from '@/stores'
import type { KnowledgeType } from '@/types/home'

const active = ref<KnowledgeType>('like')
const tabs = [
  { title: '关注', name: 'like' },
  { title: '推荐', name: 'recommend' },
  {
    title: '减脂',
    name: 'fatReduction'
  },
  {
    title: '饮食',
    name: 'food'
  }
]

/** 获取医生列表 */
const homeStore = useHomeStore()
const { doctorList } = storeToRefs(homeStore)
homeStore.getDoctorListAction()
</script>

<template>
  <div class="home">
    <!-- 头部 -->
    <HomeHead />
    <!-- 导航 -->
    <HomeNav />
    <!-- banner -->
    <homeBanner />
    <van-tabs v-model:active="active" shrink sticky swipeable line-width="5.3vw">
      <van-tab :title="item.title" :name="item.name" v-for="item in tabs" :key="item.name">
        <!-- 推荐关注医生 -->
        <HomeFollowDoctor v-if="item.name === 'like'" :list="doctorList" />
        <!-- 文章列表 -->
        <HomeKnowledgeList :type="(item.name as KnowledgeType)" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>
.home {
  padding-bottom: 50px;
  &-banner {
    padding: 10px 15px;
    height: 120px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
