<script setup lang="ts"></script>

<template>
  <div class="home-head">
    <h1>优医</h1>
    <div class="search">
      <BaseIcon name="home-search" />
      <span>搜一搜：疾病/症状/医生/健康知识</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-head {
  position: relative;
  padding: 0 15px;
  > h1 {
    padding: 20px 0 20px 5px;
    font-weight: normal;
    font-size: 18px;
    color: #fff;
  }
  .search {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 40px;
    font-size: 16px;
    color: var(--dark-color);
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 15px 22px -7px #e0ecfa;
    > span {
      margin-left: 5px;
      font-size: 13px;
    }
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    content: '';
    height: 90px;
    background: linear-gradient(180deg, rgba(62, 206, 197, 0.85), #26bcc6);
    border-bottom-left-radius: 150px 20px;
    border-bottom-right-radius: 150px 20px;
    z-index: -1;
  }
}
</style>
