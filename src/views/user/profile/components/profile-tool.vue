<script setup lang="ts">
import BaseIcon from '@/components/base-icon.vue'
import tools from '@/assets/data/profile-tools.json'
</script>

<template>
  <div class="profile-tool">
    <h3>快捷工具</h3>
    <van-cell-group>
      <van-cell :title="item.text" is-link :to="item.path" v-for="item in tools" :key="item.text">
        <template #icon>
          <BaseIcon :name="item.icon" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<style lang="scss" scoped>
.profile-tool {
  margin-top: 15px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  > h3 {
    padding-left: 16px;
    height: 44px;
    font-size: 16px;
    line-height: 44px;
  }
  .van-cell--clickable {
    align-items: center;
    font-size: 17px;
    :deep(.van-cell__title) {
      margin-left: 10px;
      > span {
        font-size: 14px;
      }
    }
  }
}
</style>
