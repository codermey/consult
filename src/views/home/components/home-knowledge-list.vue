<script setup lang="ts">
import { ref } from 'vue'

import BaseKnowledgeCard from '@/components/base-knowledge-card.vue'
import { getHomeKnowledgeApi } from '@/service/api/home'
import type { IRow, KnowledgeType } from '@/types/home'

const { type } = defineProps<{
  type: KnowledgeType
}>()

const loading = ref(false)
const finished = ref(false)
const list = ref<IRow[]>([])
const currentPage = ref(0)
const pageTotal = ref(0)

init()
async function init() {
  currentPage.value++
  const res = await getHomeKnowledgeApi(type, currentPage.value)
  list.value.push(...res.data.rows)
  pageTotal.value = res.data.pageTotal
  loading.value = false
  if (currentPage.value >= pageTotal.value) finished.value = true
}
</script>

<template>
  <van-list
    class="knowledge-list"
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="() => init()"
  >
    <template v-for="item in list" :key="item.id">
      <BaseKnowledgeCard :item-data="item" />
    </template>
  </van-list>
</template>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
