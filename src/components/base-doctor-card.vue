<script setup lang="ts">
import useFollow from '@/hooks/useFollow'
import type { IDoctorInfo } from '@/types/home'

defineProps<{
  itemData: IDoctorInfo
}>()

const { loading, onFollow } = useFollow('knowledge')
</script>

<template>
  <div class="doctor-card">
    <van-image width="15.47vw" height="15.47vw" fit="cover" round :src="itemData.avatar" />
    <p class="name">{{ itemData.name }}</p>
    <p class="van-ellipsis">{{ itemData.hospitalName }} {{ itemData.depName }}</p>
    <p>{{ itemData.positionalTitles }}</p>
    <van-button round :loading="loading" type="primary" size="small" @click="onFollow(itemData)">
      {{ itemData.likeFlag === 1 ? '已关注' : '+ 关注' }}
    </van-button>
  </div>
</template>

<style lang="scss" scoped>
.doctor-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 15px;
  padding: 15px;
  width: 135px;
  background-color: #fff;
  border-radius: 20px;
  .van-image {
    margin-bottom: 8px;
  }
  > P {
    width: 105px;
    font-size: 11px;
    color: var(--tip-color);
    text-align: center;
    line-height: 1.4;
  }
  .name {
    margin-bottom: 5px;
    font-size: 13px;
    color: var(--text1-color);
    line-height: 1.5;
  }
  .van-button {
    margin-top: 8px;
    width: 72px;
    height: 28px;
  }
}
</style>
