<script setup lang="ts">
import { postUploadApi } from '@/service/api/user'
import type { Image } from '@/types/consult'
import { showLoadingToast } from 'vant'
import type { UploaderAfterRead } from 'vant/lib/uploader/types'
import { ref } from 'vue'

defineProps<{
  disabled: boolean
}>()
const emit = defineEmits<{
  (e: 'sendText', text: string): void
  (e: 'sendImage', image: Image): void
}>()

const value = ref('')

/** 上传图片 */
const afterRead: UploaderAfterRead = async (item) => {
  // 排除多图上传
  if (Array.isArray(item)) return
  if (!item.file) return
  const toast = showLoadingToast({
    message: '正在上传',
    duration: 0
  })
  const res = await postUploadApi(item.file)
  toast.close()
  emit('sendImage', res.data)
}

/** 发送消息,按下回车 */
const onKeyupEnter = (text: string) => {
  emit('sendText', text)
  value.value = ''
}
</script>

<template>
  <div class="room-action">
    <van-field
      v-model="value"
      type="text"
      :border="false"
      autocomplete="off"
      placeholder="问医生"
      :disabled="disabled"
      @keyup.enter="onKeyupEnter(value)"
    />
    <van-uploader :disabled="disabled" :preview-image="false" :after-read="afterRead">
      <template #default>
        <BaseIcon name="consult-upload" />
      </template>
    </van-uploader>
  </div>
</template>

<style lang="scss" scoped>
.room-action {
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  padding: 0 16px;
  width: 100%;
  height: 60px;
  background-color: #fff;
  .van-field {
    margin-right: 10px;
    padding: 8px 15px;
    background-color: var(--bg-color);
    border-radius: 40px;
  }
  .van-uploader {
    margin-top: 5px;
    font-size: 24px;
  }
}
</style>
