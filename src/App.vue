<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="['consult-dep']">
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>
