<script setup lang="ts">
import { showImagePreview, showToast } from 'vant'

import RoomEvaluate from './room-evaluate.vue'
import { useLoginStore, useConsultStore } from '@/stores'
import { formatConsultFlag, formatIllnessTime, formatTime } from '@/utils/format'
import { MsgType, PrescriptionStatus } from '@/enum'
import type { Message, Prescription } from '@/types/room'
import type { Image } from '@/types/consult'
import { useRouter } from 'vue-router'

defineProps<{
  list: Message[]
}>()

const loginStore = useLoginStore()
const consultStore = useConsultStore()

/** 查看图片 */
const handleCheckImg = (imgs?: Image[]) => {
  if (imgs && imgs.length > 0) {
    showImagePreview(imgs.map((val) => val.url))
  } else {
    showToast('没有上传图片')
  }
}

/** 图片加载完成后,滚动到底部 */
const handleImgLoad = () => {
  window.scrollTo(0, document.body.scrollHeight)
}

/** 购买药品 */
const router = useRouter()
const onBuy = (item?: Prescription) => {
  if (!item) return
  if (item.status === PrescriptionStatus.Invalid) return showToast('处方已过期')
  if (item.status === PrescriptionStatus.NotPayment)
    return router.push(`/medicine/pay?id=${item.id}`)
}
</script>

<template>
  <div class="room-message">
    <template v-for="{ msgType, msg, createTime, from, fromAvatar, id } in list" :key="id">
      <!-- 患者卡片 -->
      <div class="msg msg-illness" v-if="msgType === MsgType.CardPat">
        <div class="patient van-hairline--bottom">
          <p>
            {{ msg.consultRecord?.patientInfo.name }}
            {{ msg.consultRecord?.patientInfo.genderValue }}
            {{ msg.consultRecord?.patientInfo.age }}岁
          </p>
          <p>
            {{ formatIllnessTime(msg.consultRecord!.illnessTime) }} |
            {{ formatConsultFlag(msg.consultRecord!.consultFlag) }}
          </p>
        </div>
        <van-row>
          <van-col span="6">病情描述</van-col>
          <van-col span="18" class="msg-desc">{{ msg.consultRecord?.illnessDesc }}</van-col>
          <van-col span="6">图片</van-col>
          <van-col span="18" @click="handleCheckImg(msg.consultRecord?.pictures)">
            点击查看
          </van-col>
        </van-row>
      </div>
      <!-- 通知-通用 -->
      <div class="msg msg-tip" v-if="msgType === MsgType.Notify">
        <div class="content">
          <span>{{ msg.content }}</span>
        </div>
      </div>
      <!-- 通知-温馨提示 -->
      <div class="msg msg-tip" v-if="msgType === MsgType.NotifyTip">
        <div class="content">
          <span class="green">温馨提示：</span>
          <span>{{ msg.content }}</span>
        </div>
      </div>
      <!-- 通知-结束 -->
      <div class="msg msg-tip msg-tip-cancel" v-if="false">
        <div class="content">
          <span>余心怡</span>
        </div>
      </div>
      <!-- 发送文字: 患者发送消息 -->
      <div class="msg msg-to" v-if="msgType === MsgType.MsgText && loginStore.user?.id === from">
        <div class="content">
          <div class="time">{{ formatTime(createTime, 'HH:mm') }}</div>
          <div class="pao">{{ msg.content }}</div>
        </div>
        <van-image :src="fromAvatar" />
      </div>
      <!-- 发送图片 -->
      <div class="msg msg-to" v-if="msgType === MsgType.MsgImage && loginStore.user?.id === from">
        <div class="content">
          <div class="time">{{ formatTime(createTime, 'HH:mm') }}</div>
          <van-image
            fit="contain"
            :src="msg.picture?.url"
            @load="handleImgLoad"
            @click="handleCheckImg([msg.picture as Image])"
          />
        </div>
        <van-image :src="fromAvatar" />
      </div>
      <!-- 接收文字: 医生发送消息 -->
      <div class="msg msg-from" v-if="msgType === MsgType.MsgText && loginStore.user?.id !== from">
        <van-image :src="fromAvatar" />
        <div class="content">
          <div class="time">{{ formatTime(createTime, 'HH:mm') }}</div>
          <div class="pao">{{ msg.content }}</div>
        </div>
      </div>
      <!-- 接收图片 -->
      <div class="msg msg-from" v-if="msgType === MsgType.MsgImage && from !== loginStore.user?.id">
        <van-image :src="fromAvatar" />
        <div class="content">
          <div class="time">{{ formatTime(createTime, 'HH:mm') }}</div>
          <van-image
            fit="contain"
            :src="msg.picture?.url"
            @load="handleImgLoad"
            @click="handleCheckImg([msg.picture as Image])"
          />
        </div>
      </div>
      <!-- 处方卡片 -->
      <div class="msg msg-recipe" v-if="msgType === MsgType.CardPre">
        <div class="content">
          <div class="head van-hairline--bottom">
            <div class="head-tit">
              <h3>电子处方</h3>
              <p @click="consultStore.showPrescriptionAction(msg.prescription?.id)">
                原始处方 <van-icon name="arrow"></van-icon>
              </p>
            </div>
            <p>
              {{ msg.prescription?.name }}
              {{ msg.prescription?.genderValue }}
              {{ msg.prescription?.age }}岁
              {{ msg.prescription?.diagnosis }}
            </p>
            <p>开方时间：{{ msg.prescription?.createTime }}</p>
          </div>
          <div class="body">
            <div class="body-item" v-for="i in msg.prescription?.medicines" :key="i.id">
              <div class="durg">
                <p>{{ i.name }} {{ i.specs }}</p>
                <p>{{ i.usageDosag }}</p>
              </div>
              <div class="num">x{{ i.quantity }}</div>
            </div>
          </div>
          <div class="foot" @click="onBuy(msg.prescription)"><span>购买药品</span></div>
        </div>
      </div>
      <!-- 订单取消 -->
      <div class="msg msg-tip msg-tip-cancel" v-if="msgType === MsgType.NotifyCancel">
        <div class="content">
          <span>{{ msg.content }}</span>
        </div>
      </div>
      <!-- 评价卡片 -->
      <div
        class="msg msg-comment"
        v-if="msgType === MsgType.CardEva || msgType === MsgType.CardEvaForm"
      >
        <RoomEvaluate :evaluateDoc="msg.evaluateDoc"></RoomEvaluate>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.msg {
  display: flex;
  padding: 15px;
  .msg-desc {
    line-height: 16px;
  }
  // 医生消息+图片
  &-from {
    .content {
      max-width: 240px;
      min-width: 52px;
      .time {
        color: var(--tip-color);
        margin-bottom: 5px;
      }
      .pao {
        padding: 15px;
        background-color: #fff;
        color: var(--text3-color);
        font-size: 15px;
        border-radius: 8px;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          left: -13px;
          top: 10px;
          width: 13px;
          height: 16px;
          background: #fff;
          border-top-left-radius: 13px 3px;
        }
        &::after {
          content: '';
          position: absolute;
          left: -13px;
          top: 13px;
          width: 13px;
          height: 13px;
          background: var(--bg-color);
          border-top-right-radius: 13px 13px;
        }
      }
      .van-image {
        max-height: 160px;
        max-width: 160px;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid var(--line-color);
      }
    }
    > .van-image {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 13px;
    }
  }
  // 患者消息+图片
  &-to {
    justify-content: flex-end;
    .content {
      max-width: 240px;
      min-width: 52px;
      .time {
        color: var(--tip-color);
        margin-bottom: 5px;
        text-align: right;
      }
      .pao {
        padding: 15px;
        background-color: var(--primary-color);
        color: #fff;
        font-size: 15px;
        border-radius: 8px;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          right: -13px;
          top: 10px;
          width: 13px;
          height: 16px;
          background: var(--primary-color);
          border-top-right-radius: 13px 3px;
        }
        &::after {
          content: '';
          position: absolute;
          right: -13px;
          top: 13px;
          width: 13px;
          height: 13px;
          background: var(--bg-color);
          border-top-left-radius: 13px 13px;
        }
      }
      .van-image {
        max-height: 160px;
        max-width: 160px;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid var(--line-color);
      }
    }
    > .van-image {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      overflow: hidden;
      margin-left: 13px;
    }
  }
  &-tip {
    justify-content: center;
    font-size: 12px;
    .content {
      height: 34px;
      line-height: 34px;
      background-color: #fff;
      color: var(--tip-color);
      font-size: 12px;
      border-radius: 17px;
      padding: 0 16px;
      max-width: 100%;
      .green {
        color: var(--primary-color);
      }
    }
    &-cancel {
      .content {
        background-color: #ededed;
      }
    }
  }
  &-illness {
    display: block;
    background-color: #fff;
    margin: 15px;
    border-radius: 8px;
    font-size: 12px;
    .patient {
      padding-bottom: 15px;
      margin-bottom: 15px;
      > p {
        &:first-child {
          font-size: 16px;
        }
        &:last-child {
          margin-top: 5px;
          color: var(--tip-color);
        }
      }
    }
    .van-col {
      &:nth-child(-n + 2) {
        margin-bottom: 5px;
      }
      &:nth-child(2n) {
        color: var(--tip-color);
      }
    }
  }
  &-recipe {
    padding: 15px;
    .content {
      background-color: #fff;
      border-radius: 8px;
      color: var(--tip-color);
      font-size: 12px;
      flex: 1;
      .head {
        padding: 15px;
        .head-tit {
          display: flex;
          justify-content: space-between;
          > h3 {
            font-weight: normal;
            font-size: 16px;
            color: var(--text1-color);
          }
        }
        p {
          margin-top: 5px;
        }
      }
      .body {
        padding: 15px 15px 0 15px;
        &-item {
          display: flex;
          margin-bottom: 15px;
          .durg {
            line-height: 18px;
            flex: 1;
            > p {
              &:first-child {
                font-size: 14px;
                color: var(--text1-color);
                margin-bottom: 5px;
              }
            }
          }
          .num {
            color: var(--text1-color);
          }
        }
      }
      .foot {
        background-color: var(--plain-color);
        color: var(--primary-color);
        font-size: 16px;
        text-align: center;
        height: 42px;
        line-height: 42px;
      }
    }
  }
}
</style>
