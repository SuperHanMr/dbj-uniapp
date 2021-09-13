<template>
  <view class="service-dismantle">
    <view class="item">
      <view class="item-top">
        <text class="name">工艺项名称</text>
        <text class="time">2021-08-19 20:20:00</text>
      </view>
      <view class="image-list">
        <image></image>
        <image></image>
        <image></image>
      </view>
    </view>
  </view>
</template>

<script>
</script>

<style lang="scss" scoped>
  .service-dismantle{
    margin: 40rpx 32rpx;
    .item{
      
    }
    .item-top{
      display: flex;
      justify-content: space-between;
      margin-bottom: 26rpx;
      .name{
        color: #333333;
        font-size: 28rpx;
      }
      .time{
        font-size: 24rpx;
        color: #999;
      }
    }
    .image-list{
      display: flex;
      justify-content: space-evenly;
      image{
        width: 220rpx;
        height: 220rpx;
        border-radius: 8rpx;
        background-color: #fff;
      }
    }
  }
</style>
