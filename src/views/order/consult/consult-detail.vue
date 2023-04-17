<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useConsultStore } from '@/stores'
import { formatPrice } from '@/utils/format'

/** 获取问诊订单详情 */
const consultStore = useConsultStore()
const { orderItemInfo } = storeToRefs(consultStore)
consultStore.getOrderDetailsAction()
</script>

<template>
  <div class="consult-detail">
    <BaseNavBar title="问诊详情" />
    <div class="detail-head">
      <div class="text">
        <h3>{{ orderItemInfo?.typeValue }} {{ orderItemInfo?.payment }} 元</h3>
        <span class="sta green">{{ orderItemInfo?.statusValue }}</span>
        <p class="tip">{{ orderItemInfo?.docInfo }}</p>
      </div>
      <div class="card">
        <img class="avatar" :src="orderItemInfo?.docInfo?.avatar" alt="" />
        <p class="doc">
          <span>极速问诊</span>
          <span>自动分配医生</span>
        </p>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="detail-patient">
      <van-cell-group :border="false">
        <van-cell
          title="患者信息"
          :value="`${orderItemInfo?.patientInfo.name}  | ${orderItemInfo?.patientInfo.genderValue} | ${orderItemInfo?.patientInfo.age}岁 `"
        />
        <van-cell title="患病时长" :value="orderItemInfo?.illnessTime" />
        <van-cell title="就诊情况" value="未就诊过" />
        <van-cell title="病情描述" :label="orderItemInfo?.illnessDesc" />
      </van-cell-group>
    </div>
    <div class="detail-order">
      <h3>订单信息</h3>
      <van-cell-group :border="false">
        <van-cell title="订单编号">
          <template #value>
            <span class="copy">复制</span>
            {{ orderItemInfo?.orderNo }}
          </template>
        </van-cell>
        <van-cell title="创建时间" :value="orderItemInfo?.createTime" />
        <van-cell title="应付款" :value="formatPrice(orderItemInfo?.payment)" />
        <van-cell title="优惠券" :value="formatPrice(orderItemInfo?.couponDeduction)" />
        <van-cell title="积分抵扣" :value="formatPrice(orderItemInfo?.pointDeduction)" />
        <van-cell title="实付款" :value="formatPrice(orderItemInfo?.actualPayment)" class="price" />
      </van-cell-group>
    </div>
    <!-- <div class="detail-time">
      请在 <van-count-down :time="10000 * 1000" /> 内完成支付，超时订单将取消
    </div> -->
    <div class="detail-action van-hairline--top">
      <div class="price">
        <span>需付款</span>
        <span>{{ formatPrice(orderItemInfo?.actualPayment) }}</span>
      </div>
      <van-button type="default" round>取消问诊</van-button>
      <van-button type="primary" round>继续支付</van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.consult-detail {
  padding: 0 0 110px 0;
}
.detail-head {
  height: 140px;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 135px;
    background: linear-gradient(180deg, rgba(44, 181, 165, 0), rgba(44, 181, 165, 0.2));
    border-bottom-left-radius: 150px 20px;
    border-bottom-right-radius: 150px 20px;
  }
  padding: 15px;
  .text {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px 3px;
    .sta {
      color: var(--tag-color);
      font-weight: 500;
      font-size: 16px;
      &.green {
        color: var(--primary-color);
      }
      &.orange {
        color: #f2994a;
      }
    }
    .tip {
      width: 100%;
      color: var(--text3-color);
      margin-top: 5px;
    }
  }
  .card {
    height: 74px;
    background-color: #fff;
    border-radius: 8px;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 15px;
    box-shadow: 0px 0px 22px 0px rgba(229, 229, 229, 0.5);
    .avatar {
      width: 38px;
      height: 38px;
    }
    .doc {
      flex: 1;
      padding-left: 15px;
      > span {
        display: block;
        font-size: 16px;
        &:last-child {
          font-size: 13px;
          color: var(--text3-color);
        }
      }
    }
    .van-icon {
      color: var(--cp-tip);
    }
  }
}
.detail-patient {
  &::after {
    content: '';
    display: block;
    height: 12px;
    background-color: var(--cp-bg);
  }
}
.detail-order {
  > h3 {
    padding: 10px 18px;
    font-weight: normal;
  }
  .copy {
    padding: 2px 10px;
    border: 1px solid var(--primary-color);
    background-color: var(--plain-color);
    color: var(--primary-color);
    font-size: 12px;
    border-radius: 12px;
    margin-right: 10px;
  }
  :deep(.van-cell__title) {
    width: 70px;
    flex: none;
  }
  .price :deep(.van-cell__value) {
    font-size: 16px;
    color: var(--cp-price);
  }
}
.detail-action {
  height: 65px;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  background-color: #fff;
  justify-content: flex-end;
  padding: 0 15px;
  box-sizing: border-box;
  .price {
    flex: 1;
    > span:last-child {
      font-size: 18px;
      color: var(--cp-price);
      padding-left: 5px;
    }
  }
  .van-button {
    margin-left: 10px;
    padding-left: 17px;
    padding-right: 17px;
  }
  :deep(.van-button--default) {
    background-color: var(--cp-bg);
    color: var(--cp-text3);
  }
}
.van-cell {
  padding-left: 18px;
  padding-right: 18px;
}
.detail-time {
  position: fixed;
  left: 0;
  bottom: 65px;
  width: 100%;
  height: 44px;
  background-color: #fff7eb;
  text-align: center;
  line-height: 44px;
  font-size: 13px;
  color: #f2994a;
  .van-count-down {
    display: inline;
    color: #f2994a;
  }
}
</style>
