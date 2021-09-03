<template>
  <view class="amount-house">
    <view class="image-title">
      <text class="title">原始结构尺寸图</text>
      <text class="time">2021-08-19 20:20:00</text>
    </view>
    <view class="image-list">
      <image></image>
      <image></image>
      <image></image>
    </view>
    <view class="image-title">
      <text class="title">量房图片</text>
      <text class="time">2021-08-19 20:20:00</text>
    </view>
    <view class="image-list">
      <image></image>
    </view>
  </view>
</template>

<script>
  export default {
    name:"amount-house",
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">
.amount-house{
  padding: 40rpx 32rpx;
  .image-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40rpx;
    .title{
      font-size: 28rpx;
      font-weight: 500;
      color: #333;
    }
    .time{
      color: #999;
      font-size: 24rpx;
      font-weight: 400;
    }
  }
  .image-list{
    margin-bottom: 16rpx;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    image{
      width: 328rpx;
      height: 216rpx;
      opacity: 1;
      background: #ffffff;
      border: 1px solid #f5f6f6;
      border-radius: 12rpx;
      margin-top: 32rpx;
    }
  }
}
</style>
