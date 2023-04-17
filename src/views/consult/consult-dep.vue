<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import { useConsultStore } from '@/stores'

const active = ref(0)

/** 获取所有科室 */
const consultStore = useConsultStore()
const { alldepList } = storeToRefs(consultStore)
consultStore.getAllDepAction()

/** 获取二级科室 */
const subDepList = computed(() => alldepList.value[active.value]?.child)

const currentIndex = ref(0)
const handleItemClick = (id: string, index: number) => {
  currentIndex.value = index
  consultStore.setDep(id)
}
</script>

<template>
  <div class="consult-dep">
    <BaseNavBar title="选择科室" />
    <div class="wrapper">
      <van-sidebar v-model="active">
        <van-sidebar-item
          :title="item.name"
          v-for="item in alldepList"
          :key="item.id"
          @click="() => (currentIndex = 0)"
        />
      </van-sidebar>
      <div class="sub-dep">
        <router-link
          class="sub-dep-item"
          :class="{ active: index === currentIndex }"
          to="/consult/illness"
          v-for="(item, index) in subDepList"
          :key="item.id"
          @click="handleItemClick(item.id, index)"
        >
          {{ item.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.consult-dep {
  .wrapper {
    display: flex;
    height: calc(100vh - 46px);
    .van-sidebar {
      width: 115px;
      .van-sidebar-item--select:before {
        display: none;
      }
    }

    .sub-dep {
      flex: 1;
      height: 100%;
      overflow-y: auto;
      &-item {
        display: block;
        padding: 14px 30px;
        color: var(--dark-color);
        &.active {
          color: var(--primary-color);
        }
      }
    }
  }
}
</style>
