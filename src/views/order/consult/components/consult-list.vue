<script setup lang="ts">
import { ref } from 'vue'

import ConsultItem from './consult-item.vue'
import { getConsultOrderListApi } from '@/service/api/order'
import type { ConsultType } from '@/enum'
import type { ConsultOrderItem } from '@/types/order'

const { type } = defineProps<{
  type: ConsultType
}>()

const current = ref(0)
const pageTotal = ref(10)
const consultOrderList = ref<ConsultOrderItem[]>([])

const loading = ref(false)
const finished = ref(false)

init()

/** 监听子组件订单的删除 */
const handleOrderDelete = (id: string) => {
  const index = consultOrderList.value.findIndex((val) => val.id === id)
  consultOrderList.value.splice(index, 1)
}

async function init() {
  current.value++
  const res = await getConsultOrderListApi({ current: current.value, pageSize: 10, type })
  consultOrderList.value.push(...res.data.rows)
  pageTotal.value = res.data.pageTotal
  loading.value = false
  if (current.value >= res.data.pageTotal) finished.value = true
}
</script>

<template>
  <van-list
    class="consult-list"
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="() => init()"
  >
    <ConsultItem
      v-for="item in consultOrderList"
      :key="item.id"
      :item-data="item"
      @delete="handleOrderDelete"
    />
  </van-list>
</template>

<style lang="scss" scoped>
.consult-list {
  padding: 10px 15px;
  min-height: calc(100vh - 90px);
}
</style>
