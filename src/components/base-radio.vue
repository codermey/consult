<script setup lang="ts">
interface IProps {
  options: { label: string; value: string | number }[]
  modelValue?: number
}

defineProps<IProps>()
defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()
</script>

<template>
  <div class="base-radio">
    <button
      v-for="item in options"
      :key="item.label"
      :class="{ active: modelValue === item.value }"
      @click="() => $emit('update:modelValue', item.value)"
    >
      {{ item.label }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.base-radio {
  button {
    margin-right: 10px;
    padding: 0 14px;
    min-width: 60px;
    height: 32px;
    line-height: 30px;
    color: var(--text2-color);
    background-color: var(--bg-color);
    border: 1px solid var(--bg-color);
    border-radius: 4px;
    &.active {
      background-color: var(--plain-color);
      border-color: var(--primary-color);
    }
  }
}
</style>
