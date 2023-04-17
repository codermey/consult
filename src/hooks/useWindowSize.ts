import { onMounted, onUnmounted, ref } from 'vue'
import { throttle } from 'lodash'

/**
 * @description 监听屏幕尺寸的变化，动态改变元素尺寸
 * @param elWidth 需要改变元素的宽度
 * @param targetWidth 设计稿的宽度
 * @returns
 */
function useWindowSize(elWidth: number, targetWidth = 375) {
  const width = ref(0)
  const listenerResize = throttle(() => {
    width.value = (elWidth / targetWidth) * window.innerWidth
  }, 100)

  onMounted(() => {
    listenerResize()
    window.addEventListener('resize', listenerResize)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', listenerResize)
  })

  return { width }
}

export default useWindowSize
