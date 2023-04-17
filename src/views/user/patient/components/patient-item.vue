<script setup lang="ts">
import BaseIcon from '@/components/base-icon.vue'
import { GenderType } from '@/enum'
import type { IPatient } from '@/types/user'

defineProps<{
  itemData: IPatient
  active?: boolean
}>()
const emit = defineEmits<{
  (e: 'iconClick', event: Event): void
}>()
</script>

<template>
  <div class="patient-item" :class="{ active: active }">
    <div class="left">
      <span class="name">{{ itemData.name }}</span>
      <div class="info">
        <span class="gender">{{ itemData.gender === GenderType.Man ? '男' : '女' }}</span>
        <span class="age">{{ itemData.age }}岁</span>
      </div>
    </div>
    <div class="center">
      <span class="card">
        {{ itemData.idCard.replace(/^(.{6})(?:\d+)(.{4})$/, '\$1******\$2') }}
      </span>
      <span class="tag" v-if="itemData.defaultFlag">默认</span>
    </div>
    <div class="right" :class="{ active: active }">
      <BaseIcon name="user-edit" @click="(event) => emit('iconClick', event)" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.patient-item {
  display: flex;
  margin-bottom: 15px;
  padding: 15px;
  background-color: var(--bg-color);
  border-radius: 8px;
  border: 1px solid var(--bg-color);
  &.active {
    background-color: var(--plain-color);
    border: 1px solid var(--primary-color);
  }
  span {
    line-height: 30px;
  }
  .left {
    display: flex;
    flex-direction: column;
    width: 80px;
    .name {
      font-size: 16px;
    }
    .info {
      font-size: 14px;
      color: var(--tip-color);
      .gender {
        margin-right: 20px;
      }
    }
  }
  .center {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    .card {
      color: var(--text2-color);
    }
    .tag {
      width: 30px;
      height: 16px;
      text-align: center;
      line-height: 18px;
      font-size: 10px;
      color: #fff;
      background-color: var(--primary-color);
      border-radius: 2px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    margin-left: 35px;
    width: 20px;
    color: var(--tag-color);
    &.active {
      color: var(--primary-color);
    }
  }
}
</style>
