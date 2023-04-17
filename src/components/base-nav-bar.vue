<script setup lang="ts">
import { useRouter } from 'vue-router'

interface IProps {
  title?: string
  rightText?: string
  back?: () => void
}
const props = defineProps<IProps>()
const emit = defineEmits<{
  (e: 'clickRight'): void
}>()

const router = useRouter()
const handleClickLeft = () => {
  if (props.back) return props.back()
  if (history.state.back) return router.back()
  router.push('/')
}
const handleClickRight = () => {
  emit('clickRight')
}
</script>

<template>
  <van-nav-bar
    :title="title"
    :right-text="rightText"
    left-arrow
    border
    fixed
    placeholder
    safe-area-inset-top
    @click-left="handleClickLeft"
    @click-right="handleClickRight"
  />
</template>

<style lang="scss" scoped>
:deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--text1-color);
    }
    &__text {
      font-size: 15px;
    }
  }
}
</style>
