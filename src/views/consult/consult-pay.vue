<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink, onBeforeRouteLeave } from 'vue-router'

import { formatPrice } from '@/utils/format'
import { useConsultStore, useUserStore } from '@/stores'
import { showConfirmDialog, showToast } from 'vant'
import router from '@/router'

/** 从store中获取预支付页面数据 */
const consultStore = useConsultStore()
const { prePayData, consult, orderID } = storeToRefs(consultStore)
consultStore.getPreOrderAction()

/** 获取患者详情数据 */
const userStore = useUserStore()
const { patientData } = storeToRefs(userStore)
userStore.getPatientInfoAction(consult.value.patientId as string).catch(() => {
  showToast('请重新填写问诊信息')
  router.push('/home')
})

/** 点击提交支付逻辑 */
// 是否勾选支付协议
const checked = ref(false)
// 支付弹层
const showPayType = ref(false)

const loading = ref(false)
const onSubmit = async () => {
  if (!checked.value) return showToast('请阅读并勾选支付协议')
  loading.value = true
  try {
    // 创建订单
    await consultStore.createConslutOrderAction()
    // 清除所有问诊数据
    consultStore.clear()
    // 打开弹层
    showPayType.value = true
  } finally {
    loading.value = false
  }
}

/** 创建订单后禁止回退（点击浏览器回退按钮） */
onBeforeRouteLeave(() => {
  if (orderID.value) return false
})

/** 创建订单后禁止关闭弹层 */
const onBeforeClonse = async () => {
  try {
    await showConfirmDialog({
      title: '关闭支付',
      message: '取消支付将无法获得医生回复，医生接诊名额有限，是否确认关闭？',
      cancelButtonText: '仍要关闭',
      confirmButtonText: '继续支付',
      confirmButtonColor: 'var(--primary-color)'
    })
    return false
  } catch (error) {
    orderID.value = ''
    router.push('/user/consult')
    return true
  }
}

/** 总价格 */
const payment = computed(() => {
  let price = 0
  if (prePayData.value?.payment) price = prePayData.value?.payment * 100
  return price
})
</script>

<template>
  <div class="consult-pay">
    <BaseNavBar title="支付" />
    <div class="pay-body">
      <div class="pay-info">
        <p class="title">图文问诊 {{ prePayData?.payment ?? 0 }} 元</p>
        <BaseIcon name="consult-avatar-doctor" />
        <div class="desc">
          <span>极速问诊</span>
          <span>自动分配医生</span>
        </div>
      </div>
      <van-cell-group>
        <van-cell title="优惠券" :value="formatPrice(prePayData?.couponDeduction)" />
        <van-cell title="积分抵扣" :value="formatPrice(prePayData?.pointDeduction)" />
        <van-cell
          title="实付款"
          :value="formatPrice(prePayData?.actualPayment)"
          class="pay-price"
        />
      </van-cell-group>
      <div class="pay-space"></div>
      <van-cell-group>
        <van-cell
          title="患者信息"
          :value="`${patientData?.name ?? '***'} | ${patientData?.genderValue ?? '***'} | ${
            patientData?.age ?? '***'
          }岁`"
        />
        <van-cell title="病情描述" :label="consult.illnessDesc" />
      </van-cell-group>
      <div class="pay-schema">
        <van-checkbox v-model="checked">我已同意</van-checkbox>
        <router-link to="/" class="link"> 支付协议 </router-link>
      </div>
    </div>
    <!-- 提交支付 -->
    <van-submit-bar
      :price="payment"
      :loading="loading"
      button-type="primary"
      text-align="left"
      button-text="立即支付"
      @submit="onSubmit"
    />
    <!-- 支付弹层 -->
    <BasePay
      v-model:show-pay="showPayType"
      :orderId="orderID"
      :price="prePayData?.payment"
      :beforeClonse="onBeforeClonse"
    />
  </div>
</template>

<style lang="scss" scoped>
.consult-pay {
  .pay-body {
    .pay-info {
      display: flex;
      flex-wrap: wrap;
      padding: 15px;
      font-size: 38px;
      .title {
        margin-bottom: 10px;
        width: 100%;
        font-size: 16px;
      }
      .desc {
        flex: 1;
        margin-left: 10px;
        span {
          display: block;
        }
        span:nth-child(1) {
          font-size: 16px;
          line-height: 20px;
        }
        span:nth-child(2) {
          font-size: 14px;
          line-height: 20px;
          color: var(--tag-color);
        }
      }
    }

    .pay-price {
      :deep(.van-cell__value) {
        font-size: 16px;
        color: var(--price-color);
      }
    }

    .pay-space {
      height: 12px;
      background-color: var(--bg-color);
    }
    .pay-schema {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 56px;
      .link {
        margin-left: 5px;
        color: var(--primary-color);
      }
    }
  }
}
</style>
