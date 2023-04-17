<script setup lang="ts">
import useFollow from '@/hooks/useFollow'
import type { IRow } from '@/types/home'

defineProps<{
  itemData: IRow
}>()

const { loading, onFollow } = useFollow('knowledge')
</script>

<template>
  <div class="article-item">
    <div class="head">
      <van-image round width="10.13vw" height="10.13vw" fit="cover" :src="itemData.creatorAvatar" />
      <div class="info">
        <p class="name">{{ itemData.creatorName }}</p>
        <p class="desc van-ellipsis">{{ itemData.creatorDep }}</p>
      </div>
      <van-button
        plain
        round
        :loading="loading"
        type="primary"
        size="small"
        @click="onFollow(itemData)"
      >
        {{ itemData.likeFlag === 1 ? '已关注' : '+ 关注' }}
      </van-button>
    </div>
    <div class="body">
      <h3 class="van-ellipsis">{{ itemData.title }}</h3>
      <p class="tag">
        <span v-for="item in itemData.topics" :key="item"># {{ item }}</span>
      </p>
      <p class="intro van-multi-ellipsis--l2">{{ itemData.content }}</p>
      <div class="images">
        <van-image
          width="28.27vw"
          height="28.27vw"
          fit="cover"
          radius="3.2vw"
          :src="item"
          v-for="item in itemData.coverUrl"
          :key="item"
        />
      </div>
      <div class="logs">
        <span>{{ itemData.collectionNumber }} 收藏</span>
        <span>{{ itemData.commentNumber }} 评论</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.article-item {
  padding: 20px 0 16px;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .info {
      padding-right: 15px;
      width: 215px;
      .name {
        color: var(--text2-color);
        line-height: 19px;
      }
      .desc {
        font-size: 12px;
        color: var(--tip-color);
        line-height: 16px;
      }
    }
    .van-button {
      padding: 0 12px;
      width: 72px;
      height: 28px;
    }
  }
  .body {
    margin-top: 8px;
    > h3 {
      font-weight: normal;
      font-size: 16px;
    }
    .tag {
      margin-top: 6px;
      > span {
        color: var(--primary-color);
        margin-right: 20px;
        font-size: 12px;
      }
    }
    .intro {
      margin-top: 7px;
      color: var(--text3-color);
      line-height: 2;
    }
    .images {
      display: flex;
      margin-top: 7px;
      .van-image {
        margin-right: 12px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .logs {
      margin-top: 10px;
      font-size: 12px;
      color: var(--tip-color);
      > span {
        display: inline-block;
        margin-right: 16px;
      }
    }
  }
}
</style>
