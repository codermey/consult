import { ref } from 'vue'
import { showFailToast, showSuccessToast } from 'vant'

import { postFollowApi } from '@/service/api/user'
import { Follow } from '@/enum'
import type { FollowType } from '@/types/user'

/**
 * @description 关注操作
 * @param type 关注类型
 * @returns loading：button是否加载中，onFollow：关注操作函数
 */
function useFollow(type: FollowType) {
  const loading = ref(false)
  /**
   * @description 发送关注操作网络请求
   * @param data id:关注ID，likeFlag: 1==>已关注 0==>未关注
   */
  const onFollow = async (data: { id: string; likeFlag: Follow }) => {
    loading.value = true
    try {
      await postFollowApi(data.id, type)
      data.likeFlag = data.likeFlag === Follow.Followed ? Follow.UnFollow : Follow.Followed
      showSuccessToast(data.likeFlag === Follow.Followed ? '关注成功' : '取关成功')
    } catch (error) {
      showFailToast('网络异常,稍后重试')
    } finally {
      loading.value = false
    }
  }

  return { loading, onFollow }
}

export default useFollow
