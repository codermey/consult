<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, provide, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { io, type Socket } from 'socket.io-client'

import RoomStatus from './components/room-status.vue'
import RoomAction from './components/room-action.vue'
import RoomMassage from './components/room-message.vue'
import { useLoginStore, useConsultStore } from '@/stores'
import { formatTime } from '@/utils/format'
import { MsgType, OrderType } from '@/enum'
import type { Image } from '@/types/consult'
import type { Message, TimeMessages } from '@/types/room'

const route = useRoute()
const loginStore = useLoginStore()

// 消息列表
const messageList = ref<Message[]>([])
// 是否是第一次消息
const initialMsg = ref(true)

let socket: Socket
const initsocket = () => {
  // 1. 建立链接,创建socket.io实例
  socket = io('', {
    auth: {
      token: `Bearer ${loginStore.user?.token}`
    },
    query: {
      orderId: route.query.orderId
    }
  })

  socket.on('connect', () => {
    console.log('链接成功')
  })
  socket.on('error', () => {
    console.log('链接失败')
  })
  socket.on('disconnect', () => {
    console.log('链接断开')
  })

  /** 获取聊天记录，如果是第一次（默认消息） */
  socket.on('chatMsgList', ({ data }: { data: TimeMessages[] }) => {
    const result: Message[] = []
    data.forEach((item, index) => {
      // 记录每一段消息中最早的消息时间，获取聊天记录需要使用
      if (index === 0) time.value = item.createTime
      result.push({
        id: item.orderId,
        msgType: MsgType.Notify,
        createTime: item.createTime,
        msg: {
          content: item.createTime
        }
      })
      result.push(...item.items)
    })
    messageList.value.push(...result)
    isLoading.value = false
    if (!result.length) return
    if (initialMsg.value) {
      socket.emit('updateMsgStatus', result.at(-1)?.id)
      /** 第一次加载回到底部 */
      nextTick(() => {
        window.scrollTo(0, document.body.scrollHeight)
        initialMsg.value = false
      })
    }
  })

  /** 监听订单状态,状态改变重新获取订单详情信息 */
  socket.on('statusChange', () => {
    consultStore.getOrderDetailsAction()
  })

  /** 接受发送成功或者医生发送的消息 */
  socket.on('receiveChatMsg', (res) => {
    messageList.value.push(res)
    nextTick(() => {
      window.scrollTo(0, document.body.scrollHeight)
    })
  })
}

/** 获取订单详情 */
const consultStore = useConsultStore()
const { orderItemInfo } = storeToRefs(consultStore)
consultStore.getOrderDetailsAction()

/** 发送消息 */
const handleInputEnter = (text: string) => {
  socket.emit('sendChatMsg', {
    from: loginStore.user?.id,
    to: orderItemInfo.value?.docInfo?.id,
    msgType: MsgType.MsgText,
    msg: {
      content: text
    }
  })
}

/** 发送图片 */
const handleImgeUpload = (image: Image) => {
  socket.emit('sendChatMsg', {
    from: loginStore.user?.id,
    to: orderItemInfo.value?.docInfo?.id,
    msgType: MsgType.MsgImage,
    msg: { picture: image }
  })
}

/** 评价成功，修改评价消息状态和数据，切换卡片展示 */
const completeEva = (score: number) => {
  // 1. 找到评价信息数据
  const item = messageList.value.find((val) => val.msgType === MsgType.CardEvaForm)
  if (!item) return
  item.msg.evaluateDoc = { score }
  item.msgType = MsgType.CardEva
}

/** 下拉刷新 */
const isLoading = ref(false)
const time = ref(formatTime())
const onRefresh = () => {
  socket.emit('getChatMsgList', 20, time.value, orderItemInfo.value?.id)
}

provide('completeEva', completeEva)

onMounted(() => {
  // 组件挂载建立链接
  initsocket()
})
onUnmounted(() => {
  // 组件卸载断开链接
  socket.close()
})
</script>

<template>
  <div class="room">
    <BaseNavBar title="医生问诊室" />
    <!-- 聊天室状态 -->
    <RoomStatus :status="orderItemInfo?.status" :countdown="orderItemInfo?.countdown" />
    <!-- 消息列表 -->

    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <RoomMassage :list="messageList" />
    </van-pull-refresh>

    <!-- 发送消息 -->
    <RoomAction
      @send-image="handleImgeUpload"
      @send-text="handleInputEnter"
      :disabled="orderItemInfo?.status !== OrderType.ConsultChat"
    />
  </div>
</template>

<style lang="scss" scoped>
.room {
  background-color: var(--bg-color);
  .van-pull-refresh {
    padding: 44px 0 60px;
    min-height: calc(100vh - 106px);
  }
}
</style>
