<script setup lang="ts">
import BaseRow from '@/components/base-row.vue'
import { useConsultStore } from '@/stores'
import { ConsultType } from '@/enum'

const options1 = [
  { span: '8', text: '问医生', desc: '按科室查询医生', icon: 'home-doctor' },
  {
    span: '8',
    text: '极速问诊',
    desc: '20s医生极速回复',
    icon: 'home-graphic',
    path: '/consult/fast'
  },
  { span: '8', text: '开药门诊', desc: '线上买药更方便', icon: 'home-prescribe' }
]

const options2 = [
  { span: '6', text: '药品订单', icon: 'home-order' },
  { span: '6', text: '健康档案', icon: 'home-docs' },
  { span: '6', text: '我的处方', icon: 'home-rp' },
  { span: '6', text: '疾病查询', icon: 'home-find' }
]

const consultStore = useConsultStore()
const handleItemClick = (data: any) => {
  if (data.path === '/consult/fast') consultStore.setType(ConsultType.Fast)
}
</script>

<template>
  <div class="home-nav">
    <BaseRow :options="options1" @item-click="handleItemClick" />
    <BaseRow :options="options2" font-size="3.47vw" icon-size="8.27vw" />
  </div>
</template>

<style lang="scss" scoped>
.home-nav {
  padding: 10px 15px 0;
}
</style>
