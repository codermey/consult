<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BaseIcon from './base-icon.vue'
import type { RouteLocationRaw } from 'vue-router'

interface IOption {
  span: string | number
  text: string
  desc?: string
  icon: string
  path?: RouteLocationRaw
}

interface IProps {
  options: IOption[]
  fontSize?: string
  iconSize?: string
}
withDefaults(defineProps<IProps>(), {
  fontSize: '3.74vw',
  iconSize: '12.8vw'
})

const emit = defineEmits<{
  (e: 'itemClick', data: IOption): void
}>()
</script>

<template>
  <van-row>
    <van-col
      :span="item.span"
      v-for="(item, index) in options"
      :key="index"
      @click="() => emit('itemClick', item)"
    >
      <RouterLink class="item" :to="item.path ? item.path : $route.fullPath">
        <BaseIcon :name="item.icon" />
        <p class="title">{{ item.text }}</p>
        <p class="desc" v-if="item.desc">{{ item.desc }}</p>
      </RouterLink>
    </van-col>
  </van-row>
</template>

<style lang="scss" scoped>
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  font-size: v-bind(iconSize);
  .title {
    margin-top: 5px;
    font-weight: 500;
    line-height: 19px;
    font-size: v-bind(fontSize);
  }
  .desc {
    margin-top: 2px;
    font-size: 11px;
    color: var(--tag-color);
    line-height: 15px;
  }
}
</style>
