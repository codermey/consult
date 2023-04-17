<script setup lang="ts">
import { onMounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

window._AMapSecurityConfig = {
  securityJsCode: '8b3bf4a3bb3b1090a3da5fc3fc47a931'
}

const initMap = async () => {
  const AMap = await AMapLoader.load({
    key: 'cb13fed3ea6f0b25f0c5de796dbc20f1', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.Driving'] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
  const map = new AMap.Map('map', {
    zoom: 5, //初始化地图级别
    mapStyle: 'amap://styles/whitesmoke'
  })

  const driving = new AMap.Driving({
    map: map,
    showTraffic: false,
    hideMarkers: true
  })

  // 轨迹起点
  const startLngLat = [113.42775362698366, 23.129152403638752] //  [114.42659, 30.454012]
  // 轨迹终点
  const endLngLat = [121.611504, 31.035032]

  const marker = new AMap.Marker({
    position: [121.611504, 31.035032],
    offset: new AMap.Pixel(-10, -10),
    icon: '//vdata.amap.com/icons/b18/1/2.png', // 添加 Icon 图标 URL
    map: map,
    title: 'codermey'
  })

  driving.search(
    startLngLat,
    endLngLat,
    {
      waypoints: [
        [114.42659, 30.454012],
        [118.633415, 31.93182]
      ]
    },
    (status: string, result: object) => {
      // 未出错时，result即是对应的路线规划方案
      console.log(status, result)
    }
  )
}
onMounted(() => {
  initMap()
})
</script>

<template>
  <div class="order-logistics-page">
    <div id="map">
      <div class="title">
        <van-icon name="arrow-left" @click="$router.back()" />
        <span>配送中</span>
        <van-icon name="service" />
      </div>
      <div class="current">
        <p class="status">订单派送中 预计明天送达</p>
        <p class="predict">
          <span>申通快递</span>
          <span>7511266366963366</span>
        </p>
      </div>
    </div>
    <div class="logistics">
      <p class="title">物流详情</p>
      <van-steps direction="vertical" :active="0">
        <van-step>
          <p class="status">派送中</p>
          <p class="content">您的订单正在派送中【深圳市】科技园派送员宋平正在为您派件</p>
          <p class="time">今天天 17:25</p>
        </van-step>
        <van-step v-for="i in 5" :key="i">
          <p class="status">运输中</p>
          <p class="content">在广东深圳公司进行发出扫描</p>
          <p class="time">昨天 10:25</p>
        </van-step>
        <van-step>
          <p class="status">已发货</p>
          <p class="content">卖家已发货</p>
          <p class="time">2022-08-20 10:25</p>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.order-logistics-page {
  --van-step-icon-size: 18px;
  --van-step-circle-size: 10px;
}
#map {
  height: 450px;
  background-color: var(--cp-bg);
  overflow: hidden;
  position: relative;
  .title {
    background-color: #fff;
    height: 46px;
    width: 355px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    font-size: 16px;
    position: absolute;
    left: 10px;
    top: 10px;
    box-sizing: border-box;
    box-shadow: 0px 0px 22px 0px rgba(229, 229, 229, 0.5);
    z-index: 999;
    > span {
      flex: 1;
      text-align: center;
    }
    .van-icon {
      font-size: 18px;
      color: #666;
      &:last-child {
        color: var(--cp-primary);
      }
    }
  }
  .current {
    height: 80px;
    border-radius: 4px;
    background-color: #fff;
    height: 80px;
    width: 355px;
    box-sizing: border-box;
    padding: 15px;
    position: absolute;
    left: 10px;
    bottom: 10px;
    box-shadow: 0px 0px 22px 0px rgba(229, 229, 229, 0.5);
    z-index: 999;
    .status {
      font-size: 15px;
      line-height: 26px;
    }
    .predict {
      color: var(--cp-tip);
      font-size: 13px;
      margin-top: 5px;
      > span {
        padding-right: 10px;
      }
    }
  }
}
.logistics {
  padding: 0 10px 20px;
  .title {
    font-size: 16px;
    padding: 15px 5px 5px;
  }
  .van-steps {
    :deep(.van-step) {
      &::after {
        display: none;
      }
    }
    .status {
      font-size: 15px;
      color: var(--cp-text3);
      margin-bottom: 4px;
    }
    .content {
      font-size: 13px;
      color: var(--cp-tip);
      margin-bottom: 4px;
    }
    .time {
      font-size: 13px;
      color: var(--cp-tag);
    }
  }
}
</style>
