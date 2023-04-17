<script setup lang="ts">
import type { IUserInfo } from '@/types/user'

interface IProps {
  userInfo: IUserInfo
}
defineProps<IProps>()
</script>

<template>
  <div class="profile-head">
    <div class="user">
      <van-image width="18.67vw" height="18.67vw" fit="contain" round :src="userInfo.avatar" />
      <div class="name">
        <span>{{ userInfo.account }}</span>
        <van-icon name="edit" color="var(--primary-color)" size="4.27vw" />
      </div>
    </div>
    <van-row>
      <van-col span="6">
        <p>{{ userInfo.collectionNumber ?? 0 }}</p>
        <p>收藏</p>
      </van-col>
      <van-col span="6">
        <p>{{ userInfo.likeNumber ?? 0 }}</p>
        <p>关注</p>
      </van-col>
      <van-col span="6">
        <p>{{ userInfo.score ?? 0 }}</p>
        <p>积分</p>
      </van-col>
      <van-col span="6">
        <p>{{ userInfo.couponNumber ?? 0 }}</p>
        <p>优惠券</p>
      </van-col>
    </van-row>
  </div>
</template>

<style lang="scss" scoped>
.profile-head {
  margin: 0 -15px;
  height: 200px;
  background: linear-gradient(180deg, rgba(44, 181, 165, 0.46), rgba(44, 181, 165, 0));
  .user {
    display: flex;
    align-items: center;
    padding: 50px 15px 0;

    .name {
      display: flex;
      flex-direction: column;
      padding-left: 10px;
      > span {
        margin-bottom: 10px;
        font-size: 18px;
      }
    }
  }
  .van-row {
    padding-top: 15px;
    .van-col--6 {
      text-align: center;
      > p:nth-child(1) {
        font-weight: 500;
        font-size: 18px;
      }
      > p:nth-child(2) {
        padding-top: 5px;
        font-size: 12px;
        color: var(--dark-color);
      }
    }
  }
}
</style>
