<script setup lang="ts"></script>

<template>
  <div class="home-banner">
    <van-swipe indicator-color="white">
      <van-swipe-item v-for="item in 3" :key="item">
        <img src="@/assets/icons/ad.png" alt="" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<style lang="scss" scoped>
.home-banner {
  padding: 10px 15px;
  height: 120px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
