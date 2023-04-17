<script setup lang="ts">
import { ref } from 'vue'

import { ConsultType } from '@/enum'
import ConsultList from './components/consult-list.vue'

const active = ref(0)
</script>

<template>
  <div class="consult">
    <BaseNavBar title="问诊记录" />
    <van-tabs v-model:active="active" sticky>
      <van-tab title="极速问诊">
        <ConsultList :type="ConsultType.Fast" />
      </van-tab>
      <van-tab title="找医生">
        <ConsultList :type="ConsultType.Doctor" />
      </van-tab>
      <van-tab title="开药问诊">
        <ConsultList :type="ConsultType.Medication" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>
.consult {
  background-color: var(--bg-color);
  min-height: 100vh;
}
</style>
