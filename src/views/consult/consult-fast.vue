<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useConsultStore } from '@/stores'

const consultStore = useConsultStore()
</script>

<template>
  <div class="consult-fast">
    <BaseNavBar title="快速问诊" right-text="问诊记录" />
    <div class="fast-logo">
      <img src="@/assets/icons/consult-fast.png" alt="" />
      <p class="text">
        <span>20s</span>
        快速匹配专业医生
      </p>
    </div>
    <div class="fast-type">
      <router-link class="item" to="/consult/dep" @click="() => consultStore.setIllnessType(1)">
        <BaseIcon name="consult-doctor" />
        <div class="info">
          <p>三甲图文问诊</p>
          <p>三甲主治及以上级别医生</p>
        </div>
        <van-icon name="arrow" size="3.74vw" color="var(--tip-color)" />
      </router-link>
      <router-link class="item" to="/consult/dep" @click="() => consultStore.setIllnessType(0)">
        <BaseIcon name="consult-message" />
        <div class="info">
          <p>普通图文问诊</p>
          <p>二甲主治及以上级别医生</p>
        </div>
        <van-icon name="arrow" size="3.74vw" color="var(--tip-color)" />
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.consult-fast {
  .fast {
    &-logo {
      padding: 30px 0;
      text-align: center;
      > img {
        width: 240px;
        height: 206px;
      }
      > p {
        margin-top: 15px;
        font-size: 16px;
        > span {
          color: var(--primary-color);
        }
      }
    }
    &-type {
      padding: 15px;
      .item {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        padding: 16px;
        font-size: 40px;
        border: 0.5px solid var(--line-color);
        border-radius: 4px;
        .info {
          flex: 1;
          margin-left: 12px;
          p:nth-child(1) {
            margin-bottom: 4px;
            font-size: 16px;
            color: var(--text1-color);
            line-height: 20px;
          }
          p:nth-child(2) {
            font-size: 13px;
            color: var(--tag-color);
            line-height: 16px;
          }
        }
      }
    }
  }
}
</style>
