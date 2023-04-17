<script setup lang="ts">
import { ref } from 'vue'
import { showToast } from 'vant'

import { useConsultStore } from '@/stores'
import { formatPrice } from '@/utils/format'
import { PayMethod } from '@/enum'

const { showPay, price, orderId } = defineProps<{
  orderId: string
  showPay: boolean
  price?: string | number
  beforeClonse?: () => void
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'update:showPay', val: boolean): void
}>()

// 支付方式 0 ==> 微信支付  1 ==> 支付宝支付
const paymentType = ref<PayMethod>(PayMethod.Alipay)

/** 确认支付 */
const consultStore = useConsultStore()
const hendlePayClick = () => {
  if (paymentType.value === PayMethod.Wechat) return showToast('暂不支持微信支付')
  consultStore.getConslutPayUrlAction({
    paymentMethod: paymentType.value,
    orderId,
    payCallback: import.meta.env.VITE_CALLBACK + '/room'
  })
}
</script>

<template>
  <van-action-sheet
    :show="showPay"
    @update:show="emit('update:showPay', $event)"
    title="选择支付方式"
    :closeable="false"
    :before-close="beforeClonse"
  >
    <div class="pay-type">
      <p class="amount">{{ formatPrice(price) }}</p>
      <van-cell-group>
        <van-cell title="微信支付" @click="paymentType = PayMethod.Wechat">
          <template #icon>
            <BaseIcon name="consult-wechat" />
          </template>
          <template #extra>
            <van-checkbox icon-size="16" :checked="paymentType === PayMethod.Wechat" />
          </template>
        </van-cell>
        <van-cell title="支付宝支付" @click="paymentType = PayMethod.Alipay">
          <template #icon>
            <BaseIcon name="consult-alipay" />
          </template>
          <template #extra>
            <van-checkbox icon-size="16" :checked="paymentType === PayMethod.Alipay" />
          </template>
        </van-cell>
      </van-cell-group>
      <div class="btn">
        <van-button block round type="primary" @click="hendlePayClick">立即支付</van-button>
      </div>
    </div>
  </van-action-sheet>
</template>

<style lang="scss" scoped>
.pay-type {
  .amount {
    padding: 20px;
    font-weight: 700;
    font-size: 16px;
    color: var(--text1-color);
    text-align: center;
  }
  .van-cell {
    align-items: center;
    svg {
      margin-right: 10px;
      font-size: 18px;
    }
  }
  .btn {
    padding: 15px;
  }
}
</style>
