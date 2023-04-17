import { deleteOrderApi } from '@/service/api/order'
import type { ConsultOrderItem } from '@/types/order'
import { showFailToast, showSuccessToast } from 'vant'
import { ref } from 'vue'

function useDeleteOrder(callback: (id: string) => void) {
  const deleteLoading = ref(false)
  const deleteOrder = async (item: ConsultOrderItem) => {
    deleteLoading.value = true
    try {
      await deleteOrderApi(item.id)
      showSuccessToast('删除成功')
      callback && callback(item.id)
    } catch (error) {
      showFailToast('删除失败')
    } finally {
      deleteLoading.value = true
    }
  }
  return { deleteLoading, deleteOrder }
}

export default useDeleteOrder
