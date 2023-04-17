<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import { formatPrice } from '@/utils/format'
import { cancelOrderApi } from '@/service/api/order'
import { OrderType } from '@/enum'
import type { ConsultOrderItem } from '@/types/order'
import { showFailToast, showSuccessToast, type PopoverAction } from 'vant'
import { useConsultStore } from '@/stores'
import useDeleteOrder from '@/hooks/useDeleteOrder'

const { itemData } = defineProps<{
  itemData: ConsultOrderItem
}>()
const emit = defineEmits<{
  (e: 'delete', id: string): void
}>()

const showPopover = ref(false)
const actions = computed(() => [
  { text: '查看处方', disabled: !itemData.prescriptionId }, // 没有开处方不能查看
  { text: '删除订单' }
])

/** 取消订单 */
const cancelLoading = ref(false)
const handleOrderCancel = async (item: ConsultOrderItem) => {
  cancelLoading.value = true
  try {
    await cancelOrderApi(item.id)
    // 更改订单状态
    item.status = OrderType.ConsultCancel
    item.statusValue = '已取消'
    showSuccessToast('取消成功')
  } catch (error) {
    showFailToast('网络异常，稍后重试')
  } finally {
    cancelLoading.value = false
  }
}

/** 删除订单 */
const { deleteLoading, deleteOrder } = useDeleteOrder((id) => emit('delete', id))

/** 更多操作 */
const consultStore = useConsultStore()
const onSelect = (action: PopoverAction, index: number) => {
  if (index === 1) deleteOrder(itemData)
  if (index === 0) consultStore.showPrescriptionAction(itemData.prescriptionId)
}

/** 跳转问诊详情页面 */
const router = useRouter()
const navigateDetial = () => {
  consultStore.orderID = itemData.id
  router.push(`/user/consult/${itemData.id}`)
}
</script>

<template>
  <div class="order-card" @click="navigateDetial">
    <div class="head van-hairline--bottom">
      <van-image width="5.34vw" height="5.34vw" round :src="itemData.docInfo?.avatar" />
      <p>{{ itemData.docInfo?.name || '暂未分配医生' }}</p>
      <span
        :class="{
          green: itemData.status === OrderType.ConsultChat,
          orange: itemData.status === OrderType.ConsultPay
        }"
      >
        {{ itemData.statusValue }}
      </span>
    </div>
    <div class="row">
      <div class="col">
        <div class="left">病情描述</div>
        <div class="right">{{ itemData.illnessDesc }}</div>
      </div>
      <div class="col">
        <div class="left">价格</div>
        <div class="right">{{ formatPrice(itemData.payment) }}</div>
      </div>
      <div class="col">
        <div class="left">创建时间</div>
        <div class="right tip">{{ itemData.createTime }}</div>
      </div>
    </div>
    <!-- 1. 待支付：取消问诊+去支付 -->
    <div class="footer" v-if="itemData.status === OrderType.ConsultPay">
      <van-button
        round
        plain
        size="small"
        :loading="cancelLoading"
        @click="handleOrderCancel(itemData)"
      >
        取消问诊
      </van-button>
      <van-button round plain type="primary" size="small">去支付</van-button>
    </div>
    <!-- 2. 待接诊：取消问诊+继续沟通 -->
    <div class="footer" v-else-if="itemData.status === OrderType.ConsultWait">
      <van-button
        round
        plain
        size="small"
        :loading="cancelLoading"
        @click="handleOrderCancel(itemData)"
      >
        取消问诊
      </van-button>
      <van-button round plain type="primary" size="small" :to="`/room?orderId?${itemData.id}`">
        继续沟通
      </van-button>
    </div>
    <!-- 3. 咨询中：查看处方（如果处方开了）+继续沟通 -->
    <div class="footer" v-else-if="itemData.status === OrderType.ConsultChat">
      <van-button
        :disabled="!!itemData.prescriptionId"
        round
        plain
        size="small"
        @click="consultStore.showPrescriptionAction(itemData.prescriptionId)"
      >
        查看处方
      </van-button>
      <van-button round plain type="primary" size="small" :to="`/room?orderId?${itemData.id}`">
        继续沟通
      </van-button>
    </div>
    <!-- 4. 已完成：更多（查看处方，如果开了，删除订单）+问诊记录+（未评价?写评价:查看评价） -->
    <div class="footer" v-if="itemData.status === OrderType.ConsultComplete">
      <div class="more">
        <van-popover
          placement="top-start"
          v-model:show="showPopover"
          :actions="actions"
          @select="onSelect"
        >
          <template #reference> 更多 </template>
        </van-popover>
      </div>
      <van-button plain size="small" round :to="`/room?orderId=${itemData.id}`">
        问诊记录
      </van-button>
      <van-button v-if="!itemData.evaluateId" type="primary" plain size="small" round>
        去评价
      </van-button>
      <van-button v-else plain size="small" round> 查看评价 </van-button>
    </div>
    <!-- 5. 已取消：删除订单+咨询其他医生 -->
    <div class="footer" v-if="itemData.status === OrderType.ConsultCancel">
      <van-button plain size="small" :loading="deleteLoading" round @click="deleteOrder(itemData)">
        删除订单
      </van-button>
      <van-button type="primary" plain size="small" round to="/"> 咨询其他医生 </van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.order-card {
  margin-bottom: 10px;
  border-radius: 4px;
  background-color: #fff;
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    height: 50px;
    > p {
      flex: 1;
      padding-left: 10px;
      font-size: 15px;
    }
    > span {
      font-size: 14px;
      color: var(--tag-color);
    }
    .green {
      color: var(--primary-color);
    }
    .orange {
      color: var(--wang-color);
    }
  }
  .row {
    padding: 15px 15px 8px;
    .col {
      display: flex;
      margin-bottom: 7px;
      .left {
        width: 62px;
        font-size: 13px;
        color: var(--tip-color);
      }
      .right {
        flex: 1;
        line-height: 18px;
        word-break: break-all;

        &.tip {
          color: var(--tip-color);
        }
      }
    }
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 15px 15px;
    .van-button {
      margin-left: 10px;
      padding: 0 16px;
      height: 32px;
    }
    .van-button--default {
      color: var(--text3-color) !important;
    }
    .more {
      color: var(--tag-color);
      flex: 1;
      font-size: 13px;
    }
  }
}
</style>
