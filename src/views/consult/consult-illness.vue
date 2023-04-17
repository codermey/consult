<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { showConfirmDialog } from 'vant'

import { useConsultStore } from '@/stores'
import { postUploadApi } from '@/service/api/user'
import { illnessTimes, consultFlags } from '@/constants'
import type { ConsultTime } from '@/enum'
import type { IllnessType, Image } from '@/types/consult'
import type { UploaderAfterRead, UploaderFileListItem } from 'vant/lib/uploader/types'

/** 表单数据 */
const illnessForm = ref<IllnessType>({
  illnessDesc: '',
  illnessTime: undefined as unknown as ConsultTime,
  consultFlag: undefined as unknown as 0 | 1,
  pictures: []
})

/** 上传的图片列表 */
const fileList = ref<Image[]>()

/** 上传图片 */
const afterRead: UploaderAfterRead = async (item) => {
  // 排除多图上传数组的情况
  if (Array.isArray(item)) return
  if (!item.file) return
  // 开始上传 => 单图上传
  // 通过 status 属性可以标识上传状态，uploading 表示上传中，failed 表示上传失败，done 表示上传完成
  item.status = 'uploading'
  item.message = '上传中...'
  try {
    const res = await postUploadApi(item.file)
    item.status = 'done'
    item.message = undefined
    item.url = res.data.url
    illnessForm.value.pictures.push(res.data)
  } catch (error) {
    item.status = 'failed'
    item.message = '上传失败'
  }
}
/** 删除图片 */
const handleImageDelete = (item: UploaderFileListItem) => {
  illnessForm.value.pictures = illnessForm.value.pictures.filter((val) => val.url !== item.url)
}

/** button 按钮激活，只要当所有数据都填写完成才激活 */
const disabled = computed(() => {
  return (
    !illnessForm.value.illnessTime ||
    !illnessForm.value.illnessDesc ||
    illnessForm.value.consultFlag === undefined
  )
})

const consultStore = useConsultStore()
/** 点击下一步，跳转到患者选择页面*/
const router = useRouter()
const handleFormSubmit = () => {
  consultStore.setIllness(illnessForm.value)
  router.push(`/user/patient?select=${true}`)
}

/** 数据回显  */
onMounted(async () => {
  if (!consultStore.consult.illnessDesc) return
  try {
    await showConfirmDialog({
      title: '温馨提示',
      message: '是否恢复您之前填写的病情信息呢？',
      closeOnPopstate: false,
      confirmButtonColor: 'var(--primary-color)'
    })
    /** 确认后将之前填写的数据重新赋值给病情描述表单 */
    const { illnessDesc, illnessTime, consultFlag, pictures } = consultStore.consult
    illnessForm.value = { illnessDesc, illnessTime, consultFlag, pictures }
    fileList.value = pictures
  } catch (error) {
    /** 点击取消将病情描述数据清空 */
    consultStore.setIllness(illnessForm.value)
  }
})
</script>

<template>
  <div class="consult-illness">
    <BaseNavBar title="图文问诊" />
    <div class="illness-tip van-hairline--bottom">
      <BaseIcon name="consult-avatar-doctor" class="img" />
      <div class="info">
        <p class="title">在线医生</p>
        <p class="tip">请描述你的疾病或症状、是否用药、就诊经历，需要我听过什么样的帮助</p>
        <p class="safe">
          <BaseIcon name="consult-safe" />
          <span>内容仅医生可见</span>
        </p>
      </div>
    </div>
    <div class="illness-form">
      <van-field
        type="textarea"
        v-model="illnessForm.illnessDesc"
        :rows="3"
        placeholder="请详细描述您的病情，病情描述不能为空"
      />
      <div class="item">
        <p>本次患病多久了？</p>
        <BaseRadio :options="illnessTimes" v-model="illnessForm.illnessTime" />
      </div>
      <div class="item">
        <p>此次病情是否去医院就诊过？</p>
        <BaseRadio :options="consultFlags" v-model="illnessForm.consultFlag" />
      </div>
      <div class="illness-img">
        <van-uploader
          v-model="fileList"
          max-count="9"
          :max-size="5 * 1024 * 1024"
          upload-icon="photo-o"
          upload-text="上传图片"
          :after-read="afterRead"
          @delete="handleImageDelete"
        >
          <template #preview-delete>
            <BaseIcon name="consult-delete" class="preview-delete" />
          </template>
        </van-uploader>
        <p class="tip" v-if="!fileList?.length">上传内容仅医生可见,最多9张图,最大5MB</p>
      </div>
      <van-button block round type="primary" :disabled="disabled" @click="handleFormSubmit"
        >下一步</van-button
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.consult-illness {
  .illness-tip {
    display: flex;
    padding: 15px;
    font-size: 52px;
    .img {
      margin-top: 10px;
    }
    .info {
      flex: 1;
      padding-left: 12px;
      .title {
        margin-bottom: 5px;
        font-size: 16px;
        line-height: 20px;
      }
      .tip {
        margin-bottom: 10px;
        padding: 12px;
        font-size: 13px;
        color: var(--text3-color);
        line-height: 1.4;
        background-color: var(--bg-color);
      }
      .safe {
        display: flex;
        align-items: center;
        font-size: 10px;
        color: var(--text3-color);
        > span {
          margin-left: 2px;
        }
      }
    }
  }
  .illness-form {
    padding: 15px;
    .van-cell {
      padding: 0;
    }
    .item {
      margin-bottom: 10px;
      > P {
        padding: 15px 0;
        color: var(--text3-color);
        line-height: 20px;
      }
    }
    .illness-img {
      display: flex;
      align-items: center;
      margin-bottom: 40px;
      padding-top: 16px;
      .preview-delete {
        position: absolute;
        top: 0;
        right: -4px;
        transform: translateY(-30%);
      }
      .tip {
        font-size: 12px;
        color: var(--tip-color);
      }
    }
  }
}
</style>
