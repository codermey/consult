<script setup lang="ts">
import BaseIcon from '@/components/base-icon.vue'
import type { IOrderInfo } from '@/types/user'

interface IProps {
  orderInfo: IOrderInfo
}

defineProps<IProps>()
</script>

<template>
  <div class="profile-order">
    <div class="head">
      <h3>药品订单</h3>
      <div class="icon-arrow">
        <span>全部订单</span>
        <BaseIcon name="user-arrow" />
      </div>
    </div>
    <van-row>
      <van-col span="6">
        <van-badge :content="orderInfo?.paidNumber" :show-zero="false">
          <BaseIcon name="user-paid" />
        </van-badge>
        <span>待付款</span>
      </van-col>
      <van-col span="6">
        <van-badge :content="orderInfo?.shippedNumber" :show-zero="false">
          <BaseIcon name="user-shipped" />
        </van-badge>
        <span>待发货</span>
      </van-col>
      <van-col span="6">
        <van-badge :content="orderInfo?.receivedNumber" :show-zero="false">
          <BaseIcon name="user-received" />
        </van-badge>
        <span>待收货</span>
      </van-col>
      <van-col span="6">
        <van-badge :content="orderInfo?.finishedNumber" :show-zero="false">
          <BaseIcon name="user-finished" />
        </van-badge>
        <span>已完成</span>
      </van-col>
    </van-row>
  </div>
</template>

<style lang="scss" scoped>
.profile-order {
  padding-bottom: 15px;
  background-color: #fff;
  border-radius: 8px;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    height: 50px;

    h3 {
      font-size: 16px;
    }
    .icon-arrow {
      display: flex;
      align-items: center;
      font-size: 16px;
      color: var(--tip-color);
      > span {
        font-size: 14px;
      }
    }
  }
  .van-row {
    .van-col--6 {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 28px;
      > span {
        padding-top: 4px;
        font-size: 12px;
      }
    }
  }
}
</style>
