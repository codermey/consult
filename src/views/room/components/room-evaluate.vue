<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import { storeToRefs } from 'pinia'
import { showToast } from 'vant'

import { useConsultStore } from '@/stores'
import { postEvaluateDocApi } from '@/service/api/consult'
import type { EvaluateDoc } from '@/types/room'

defineProps<{
  evaluateDoc?: EvaluateDoc
}>()

const completeEva = inject<(score: number) => void>('completeEva')

/** 收集数据 */
const score = ref(0) // 评价星级
const content = ref('') // 评价内容
const anonymousFlag = ref(false) // 是否匿名评价
const loading = ref(false)
const disabled = computed(() => !score.value || !content.value)

/** 提交评价 */
const consultStore = useConsultStore()
const { orderItemInfo, orderID } = storeToRefs(consultStore)
const submitEvaluate = async () => {
  loading.value = true
  try {
    await postEvaluateDocApi({
      score: score.value, // 评价星级
      content: content.value, // 评价内容
      anonymousFlag: anonymousFlag.value ? 1 : 0, // 是否匿名提交 0：匿名；1：不匿名
      docId: orderItemInfo.value!.docInfo!.id, // 医生ID
      orderId: orderID.value // 订单ID
    })
    loading.value = false
    completeEva && completeEva(score.value)
  } catch (error) {
    showToast('系统繁忙，稍后重试')
  }
}
</script>

<template>
  <div class="evaluate-card" v-if="evaluateDoc">
    <p class="title">医生服务评价</p>
    <p class="desc">我们会更加努力提升服务质量</p>
    <van-rate
      :modelValue="evaluateDoc.score"
      size="7vw"
      gutter="3vw"
      color="#FADB14"
      void-icon="star"
      void-color="rgba(0,0,0,0.04)"
    />
  </div>
  <div class="evaluate-card" v-else>
    <p class="title">感谢您的评价</p>
    <p class="desc">本次在线问诊服务您还满意吗？</p>
    <van-rate
      size="7vw"
      gutter="3vw"
      color="#FADB14"
      void-icon="star"
      void-color="rgba(0,0,0,0.04)"
      v-model="score"
    />
    <van-field
      type="textarea"
      maxlength="150"
      show-word-limit
      rows="3"
      placeholder="请描述您对医生的评价或是在医生看诊过程中遇到的问题"
      v-model="content"
    >
    </van-field>
    <div class="footer">
      <van-checkbox v-model="anonymousFlag">匿名评价</van-checkbox>
      <van-button
        :disabled="disabled"
        :loading="loading"
        type="primary"
        size="small"
        round
        @click="submitEvaluate"
      >
        提交评价
      </van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.evaluate-card {
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  padding: 15px;
  .title {
    font-size: 15px;
    margin-bottom: 5px;
  }
  .desc {
    font-size: 12px;
    margin-bottom: 15px;
    color: var(--cp-tip);
  }
  .van-field {
    background-color: var(--cp-bg);
    margin: 15px 0;
    border-radius: 8px;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    :deep() {
      .van-checkbox {
        .van-icon {
          font-size: 12px;
        }
        &__label {
          font-size: 12px;
          color: var(--cp-tip);
        }
        height: 16px;
      }
      .van-button {
        padding: 0 16px;
        &.disabled {
          opacity: 1;
          background: #fafafa;
          color: #d9dbde;
          border: #fafafa;
        }
      }
    }
  }
}
</style>
